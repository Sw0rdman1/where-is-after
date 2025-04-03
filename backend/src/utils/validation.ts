import { BadRequestException } from "@nestjs/common";
import mongoose from "mongoose";

export const validateMongoID = (id: string): void => {
    const isValidId = mongoose.Types.ObjectId.isValid(id);

    if (!isValidId) {
        throw new BadRequestException('Invalid party ID');
    }
}