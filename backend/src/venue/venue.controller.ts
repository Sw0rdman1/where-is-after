import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
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
  async getVenueById(@Param('id') id: string, @Request() req) {
    const userId = (req.user as any).userId;

    return this.VenueService.getVenueById(id, userId);
  }

}
