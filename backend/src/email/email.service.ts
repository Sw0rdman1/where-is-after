import { Injectable } from '@nestjs/common';
import * as Mailjet from 'node-mailjet';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class EmailService {
    private mailjet: Mailjet.Client;

    constructor() {
        this.mailjet = new Mailjet.Client({
            apiKey: process.env.MAILJET_API_KEY,
            apiSecret: process.env.MAILJET_SECRET_KEY,
        });
    }

    async sendVerificationCode(email: string, code: string): Promise<void> {
        const sender = process.env.MAILJET_SENDER;

        const request = this.mailjet.post('send', { version: 'v3.1' }).request({
            Messages: [
                {
                    From: { Email: sender, Name: 'Gde je after?' },
                    To: [{ Email: email }],
                    Subject: 'Email Verification Code',
                    TextPart: `Your verification code is: ${code}`,
                    HTMLPart: `<p>Your verification code is: <strong>${code}</strong></p>`,
                },
            ],
        });

        try {
            await request;
            console.log(`Verification email sent to ${email}`);
        } catch (error) {
            console.error('Error sending email:', error.response?.body || error);
            throw new Error('Failed to send email');
        }
    }
}
