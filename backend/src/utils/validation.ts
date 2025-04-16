import { BadRequestException } from "@nestjs/common";
import mongoose, { Document, Model } from 'mongoose';

export const validateMongoID = (id: string): void => {
    const isValidId = mongoose.Types.ObjectId.isValid(id);

    if (!isValidId) {
        throw new BadRequestException('Invalid mongo ID');
    }
}


export const findById = async <T extends Document>(model: Model<T>, id: string): Promise<T> => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new BadRequestException('Invalid mongo ID');
    }

    const document = await model.findById(id);

    if (!document) {
        throw new BadRequestException('Document not found');
    }

    return document;
};
