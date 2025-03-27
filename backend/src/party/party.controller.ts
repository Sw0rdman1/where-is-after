import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
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
  async getPartyById(@Param('id') id: string) {
    return this.partyService.getPartyById(id);
  }

}
