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
  @Get()
  async getNearbyParties(@Query() { longitude, latitude, radius, date }: { longitude: number; latitude: number; radius: number; date?: string }) {
    return this.partyService.findNearbyParties(longitude, latitude, radius, date);
  }

  @Roles(Role.USER)
  @Get(':id')
  async getPartyById(@Param('id') id: string, @Req() req) {
    const userId = (req.user as any).userId;
    return this.partyService.getPartyById(id, userId);
  }

  @Roles(Role.USER)
  @Post(':id/going')
  async markAsGoing(@Param('id') partyId: string, @Req() req) {
    const userId = (req.user as any).userId;
    return this.partyService.markUserAsGoing(partyId, userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/going')
  async removeFromGoing(@Param('id') partyId: string, @Req() req) {
    const userId = (req.user as any).userId;
    return this.partyService.removeUserFromParty(partyId, userId);
  }

}
