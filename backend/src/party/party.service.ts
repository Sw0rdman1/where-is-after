import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import { Party } from './schema/party.schema';
import { Venue } from 'src/venue/schema/venue.schema';
import * as moment from "moment";
import { validateMongoID } from 'src/utils/validation';
import { User } from 'src/users/schema/user.schema';
import { log } from 'console';

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

    async acceptUserToParty(partyId: string, userId: string): Promise<Party> {
        const party = await this.partyModel.findById(partyId);
        if (!party) throw new NotFoundException('Party not found');

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

        // Remove from requests
        party.joinRequests = party.joinRequests.filter(
            id => id.toString() !== userObjectId.toString()
        );

        // Add to rejected
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
