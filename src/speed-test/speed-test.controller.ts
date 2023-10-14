import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SpeedTestService } from './speed-test.service';
import { CreateSpeedTestDto } from './dto/create-speed-test.dto';
import { UpdateSpeedTestDto } from './dto/update-speed-test.dto';

@Controller('speed-test')
export class SpeedTestController {
  constructor(private readonly speedTestService: SpeedTestService) {}

  @Post()
  create(@Body() createSpeedTestDto: CreateSpeedTestDto) {
    return this.speedTestService.create(createSpeedTestDto);
  }

  @Get()
  findAll() {
    return this.speedTestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.speedTestService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSpeedTestDto: UpdateSpeedTestDto) {
    return this.speedTestService.update(+id, updateSpeedTestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.speedTestService.remove(+id);
  }
}
