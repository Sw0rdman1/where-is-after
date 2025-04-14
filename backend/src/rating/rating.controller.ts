import { Controller, Post, Body, Param, Get, UseGuards, Request, Delete } from '@nestjs/common';
import { RatingService } from './rating.service';
import { Roles } from 'src/users/decorators/roles.decorator';
import { Role } from 'src/users/schema/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('ratings')
export class RatingController {
    constructor(private readonly ratingService: RatingService) { }

    @Roles(Role.USER)
    @Post()
    async rateVenue(@Body('venueId') venueId: string, @Body('score') score: number, @Request() req) {
        const userId = (req.user as any).userId;

        return this.ratingService.rateVenue(userId, venueId, score);
    }

    @Roles(Role.USER)
    @Delete(':venueId')
    async removeRating(@Param('venueId') venueId: string, @Request() req) {
        const userId = (req.user as any).userId;
        return this.ratingService.removeRating(userId, venueId);
    }
}
