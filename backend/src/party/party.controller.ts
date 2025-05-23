import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { PartyService } from './party.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/users/decorators/roles.decorator';
import { Role } from 'src/users/schema/role.enum';
import { log } from 'console';

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



  // JOIN REQUESTS

  @Roles(Role.USER)
  @Post(':id/join-requests')
  async requestToJoin(@Param('id') partyId: string, @Req() req, @Body() body: { numberOfPeople: number }) {
    const userId = (req.user as any).userId;
    return this.partyService.requestToJoinParty(partyId, userId, body.numberOfPeople);
  }

  // DELETE /parties/:id/join-requests
  @Roles(Role.USER)
  @Delete(':id/join-requests')
  async cancelRequestToJoin(@Param('id') partyId: string, @Req() req) {
    const userId = (req.user as any).userId;
    return this.partyService.cancelRequestToJoinParty(partyId, userId);
  }

  // GET /parties/:id/join-requests
  @Roles(Role.VENUE)
  @Get(':id/join-requests')
  async getJoinRequests(@Param('id') partyId: string) {
    return this.partyService.getJoinRequests(partyId);
  }

  // PATCH /parties/:id/join-requests/:userId/accept
  @Roles(Role.VENUE)
  @Patch(':id/join-requests/:userId/accept')
  async acceptUser(@Param('id') partyId: string, @Param('userId') userId: string) {
    return this.partyService.acceptUserToParty(partyId, userId);
  }

  // PATCH /parties/:id/join-requests/:userId/reject
  @Roles(Role.VENUE)
  @Patch(':id/join-requests/:userId/reject')
  async rejectUser(@Param('id') partyId: string, @Param('userId') userId: string) {
    return this.partyService.rejectUserFromParty(partyId, userId);
  }

}

