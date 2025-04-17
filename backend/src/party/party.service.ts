import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { Party } from './schema/party.schema';
import { Venue } from 'src/venue/schema/venue.schema';
import * as moment from "moment";
import { User } from 'src/users/schema/user.schema';
import { log } from 'console';
import { findById, validateMongoID } from 'src/utils/validation';
import { JoinRequest } from './schema/join.request.schema';

@Injectable()
export class PartyService {
    constructor(
        @InjectModel(Party.name) private readonly partyModel: Model<Party>,
        @InjectModel(Venue.name) private readonly venueModel: Model<Venue>,
        @InjectModel(User.name) private readonly userModel: Model<User>,
        @InjectModel(JoinRequest.name) private readonly joinRequestModel: Model<JoinRequest>,
    ) { }

    async findNearbyParties(longitude: number, latitude: number, radius: number, date: string | undefined) {

        const nearbyVenues = await this.venueModel.find({
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude],
                    },
                    $maxDistance: radius,
                },
            },
        });

        const venueIds = nearbyVenues.map(venue => venue._id);

        const partyDate = date
            ? moment.utc(date).startOf('day').toDate()
            : moment.utc().startOf('day').toDate();

        const endOfDay = new Date(partyDate.getTime() + 24 * 60 * 60 * 1000 - 1);

        return this.partyModel
            .find({
                venue: { $in: venueIds },
                startDate: {
                    $gte: partyDate,
                    $lt: endOfDay,
                },
            })
            .populate('venue')
            .exec();
    }

    async getPartiesByVenue(venueId: string, userId: string) {
        validateMongoID(venueId);

        const user = await this.userModel.findById(userId);
        if (!user) throw new NotFoundException('User not found');

        if (!user.venueOperator || user.venueOperator.toString() !== venueId) {
            throw new BadRequestException('You are not authorized to view this venue');
        }


        log('User is venue operator:', venueId);

        const parties = await this.partyModel
            .find({ venue: new mongoose.Types.ObjectId(venueId) })
            .populate('venue')
            .exec();

        if (!parties) throw new NotFoundException('No parties found for this venue');

        return parties;
    }

    async getPartyById(id: string, currentUserId: string) {
        validateMongoID(id);

        const party = await this.partyModel
            .findById(id)
            .populate('venue')
            .exec();

        if (!party) throw new NotFoundException('Party not found');

        // Check if user has an existing request
        const joinRequest = await this.joinRequestModel.findOne({
            user: currentUserId,
            party: id,
        });

        let userStatus: 'none' | 'pending' | 'accepted' | 'rejected' = 'none';
        if (joinRequest) {
            userStatus = joinRequest.status;
        }

        return {
            ...party.toObject(),
            userStatus,
        };
    }


    async requestToJoinParty(partyId: string, userId: string, peopleCount: number = 1): Promise<JoinRequest> {
        await findById(this.partyModel, partyId);

        const existing = await this.joinRequestModel.findOne({ user: userId, party: partyId });
        if (existing) {
            throw new BadRequestException('You have already submitted a request');
        }

        const newRequest = new this.joinRequestModel({
            user: userId,
            party: partyId,
            peopleCount,
            status: 'requested',
        });

        return await newRequest.save();
    }

    async cancelRequestToJoinParty(partyId: string, userId: string): Promise<void> {
        const request = await this.joinRequestModel.findOneAndDelete({ party: partyId, user: userId });
        if (!request) {
            throw new NotFoundException('Request not found');
        }
    }

    async getJoinRequests(partyId: string): Promise<JoinRequest[]> {
        await findById(this.partyModel, partyId);
        return this.joinRequestModel.find({ party: partyId })
            .populate('user', 'displayName profileImage email')
            .exec();
    }

    async acceptUserToParty(partyId: string, userId: string): Promise<JoinRequest> {
        const request = await this.joinRequestModel.findOne({ party: partyId, user: userId });
        if (!request) throw new NotFoundException('Join request not found');

        request.status = 'accepted';
        await request.save();

        await this.partyModel.findByIdAndUpdate(
            partyId,
            {
                $addToSet: { goingUsers: userId },
            },
            { new: true }
        );

        return request;
    }


    async rejectUserFromParty(partyId: string, userId: string): Promise<JoinRequest> {
        const request = await this.joinRequestModel.findOne({ party: partyId, user: userId });
        if (!request) throw new NotFoundException('Join request not found');

        request.status = 'rejected';
        return await request.save();
    }

    async removeUserFromParty(partyId: string, userId: string): Promise<Party> {
        const party = await this.partyModel.findById(partyId);
        if (!party) throw new NotFoundException('Party not found');

        party.goingUsers = party.goingUsers.filter(
            id => id.toString() !== userId,
        );

        return await party.save();
    }

}
