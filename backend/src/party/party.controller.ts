import { Controller, Delete, Get, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { PartyService } from './party.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/users/decorators/roles.decorator';
import { Role } from 'src/users/schema/role.enum';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('parties')
export class PartyController {
  constructor(private readonly partyService: PartyService) { }

  @Roles(Role.USER)
  @Get('nearby')
  async getNearbyParties(@Query() { longitude, latitude, radius, date }: { longitude: number; latitude: number; radius: number; date?: string }) {
    return this.partyService.findNearbyParties(longitude, latitude, radius, date);
  }

  @Roles(Role.VENUE)
  @Get('venue/:id')
  async getPartiesByVenue(@Param('id') venueId: string, @Req() req) {
    const userId = (req.user as any).userId;
    return this.partyService.getPartiesByVenue(venueId, userId);
  }

  @Roles(Role.USER)
  @Get(':id')
  async getPartyById(@Param('id') id: string, @Req() req) {
    const userId = (req.user as any).userId;
    return this.partyService.getPartyById(id, userId);
  }

  @Roles(Role.USER)
  @Post(':id/request')
  async requestToJoin(@Param('id') partyId: string, @Req() req) {
    const userId = (req.user as any).userId;
    return this.partyService.requestToJoinParty(partyId, userId);
  }

  @Roles(Role.USER)
  @Delete(':id/request')
  async cancelRequestToJoin(@Param('id') partyId: string, @Req() req) {
    const userId = (req.user as any).userId;
    return this.partyService.cancelRequestToJoinParty(partyId, userId);
  }

  @Roles(Role.ADMIN)
  @Get(':id/requests')
  async getJoinRequests(@Param('id') partyId: string) {
    return this.partyService.getJoinRequests(partyId);
  }

  @Roles(Role.ADMIN)
  @Post(':id/accept/:userId')
  async acceptUser(@Param('id') partyId: string, @Param('userId') userId: string) {
    return this.partyService.acceptUserToParty(partyId, userId);
  }

  @Roles(Role.ADMIN)
  @Post(':id/reject/:userId')
  async rejectUser(@Param('id') partyId: string, @Param('userId') userId: string) {
    return this.partyService.rejectUserFromParty(partyId, userId);
  }

  @Roles(Role.USER)
  @Delete(':id/going')
  async removeFromGoing(@Param('id') partyId: string, @Req() req) {
    const userId = (req.user as any).userId;
    return this.partyService.removeUserFromParty(partyId, userId);
  }

}

