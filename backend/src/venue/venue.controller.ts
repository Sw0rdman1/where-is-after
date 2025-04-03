import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { VenueService } from './venue.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/users/decorators/roles.decorator';
import { Role } from 'src/users/schema/role.enum';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('venues')
export class VenueController {
  constructor(private readonly VenueService: VenueService) { }

  @Roles(Role.USER)
  @Get(':id')
  async getVenueById(@Param('id') id: string) {
    return this.VenueService.getVenueById(id);
  }

}
