import { randomInt } from "crypto";

export const generateVerificationCode = (): string => {
    return randomInt(100000, 999999).toString(); // 6-digit code
}