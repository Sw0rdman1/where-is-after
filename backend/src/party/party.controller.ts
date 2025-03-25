import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { PartyService } from './party.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/users/decorators/roles.decorator';
import { Role } from 'src/users/schema/role.enum';

@Controller('parties')
export class PartyController {
  constructor(private readonly partyService: PartyService) { }


  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.USER)
  @Get('nearby')
  async getNearbyParties(
    @Query('longitude') longitude: number,
    @Query('latitude') latitude: number,
    @Query('radius') radius: number,
    @Query('date') date?: string,
  ) {
    return this.partyService.findNearbyParties(longitude, latitude, radius, date);
  }
}
