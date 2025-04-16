import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { Party } from './schema/party.schema';
import { Venue } from 'src/venue/schema/venue.schema';
import * as moment from "moment";
import { User } from 'src/users/schema/user.schema';
import { log } from 'console';
import { findById, validateMongoID } from 'src/utils/validation';

@Injectable()
export class PartyService {
    constructor(
        @InjectModel(Party.name) private readonly partyModel: Model<Party>,
        @InjectModel(Venue.name) private readonly venueModel: Model<Venue>,
        @InjectModel(User.name) private readonly userModel: Model<User>,
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
            .populate({
                path: 'goingUsers',
                model: 'User',
                select: 'displayName profileImage',
            })
            .exec();

        if (!party) throw new NotFoundException('Party not found');

        let userStatus: 'none' | 'requested' | 'going' | 'rejected' = 'none';

        if (party.goingUsers.some(user => user._id.toString() === currentUserId)) {
            userStatus = 'going';
        } else if (party.joinRequests.some(id => id.toString() === currentUserId)) {
            userStatus = 'requested';
        } else if (party.rejectedUsers.some(id => id.toString() === currentUserId)) {
            userStatus = 'rejected';
        }

        log('User status:', userStatus);

        return {
            ...party.toObject(),
            userStatus,
        };
    }


    async requestToJoinParty(partyId: string, userId: string): Promise<Party> {

        const party = await this.partyModel.findById(partyId);
        if (!party) throw new NotFoundException('Party not found');

        const userObjectId = new Types.ObjectId(userId);

        if (
            party.goingUsers.includes(userObjectId) ||
            party.joinRequests.includes(userObjectId) ||
            party.rejectedUsers.includes(userObjectId)
        ) {
            throw new BadRequestException('You have already requested or been processed');
        }

        party.joinRequests.push(userObjectId);
        await party.save();

        return party;
    }

    async cancelRequestToJoinParty(partyId: string, userId: string): Promise<Party> {
        const party = await findById(this.partyModel, partyId);
        const userObjectId = new Types.ObjectId(userId);

        party.joinRequests = party.joinRequests.filter(
            id => id.toString() !== userObjectId.toString()
        );

        await party.save();
        return party;
    }

    async getJoinRequests(partyId: string): Promise<Party> {
        const party = await this.partyModel
            .findById(partyId)
            .populate('joinRequests', 'displayName profileImage')
            .exec();

        if (!party) throw new NotFoundException('Party not found');

        return party;
    }

    async acceptUserToParty(partyId: string, userId: string): Promise<Party> {
        const party = await findById(this.partyModel, partyId);
        const userObjectId = new Types.ObjectId(userId);

        party.joinRequests = party.joinRequests.filter(
            id => id.toString() !== userObjectId.toString()
        );

        if (!party.goingUsers.includes(userObjectId)) {
            party.goingUsers.push(userObjectId);
        }

        await party.save();
        return party;
    }

    async rejectUserFromParty(partyId: string, userId: string): Promise<Party> {
        const party = await this.partyModel.findById(partyId);
        if (!party) throw new NotFoundException('Party not found');

        const userObjectId = new Types.ObjectId(userId);

        party.joinRequests = party.joinRequests.filter(
            id => id.toString() !== userObjectId.toString()
        );

        if (!party.rejectedUsers.includes(userObjectId)) {
            party.rejectedUsers.push(userObjectId);
        }

        await party.save();
        return party;
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
