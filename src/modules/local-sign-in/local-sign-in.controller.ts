import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LocalSignInService } from './local-sign-in.service';
import { CreateLocalSignInDto } from './dto/create-local-sign-in.dto';
import { UpdateLocalSignInDto } from './dto/update-local-sign-in.dto';

@Controller('local-sign-in')
export class LocalSignInController {
  constructor(private readonly localSignInService: LocalSignInService) {}

  @Post()
  create(@Body() createLocalSignInDto: CreateLocalSignInDto) {
    return this.localSignInService.create(createLocalSignInDto);
  }

  @Get()
  findAll() {
    return this.localSignInService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.localSignInService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLocalSignInDto: UpdateLocalSignInDto) {
    return this.localSignInService.update(+id, updateLocalSignInDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.localSignInService.remove(+id);
  }
}
