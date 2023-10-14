import { PartialType } from '@nestjs/mapped-types';
import { CreateSpeedTestDto } from './create-speed-test.dto';

export class UpdateSpeedTestDto extends PartialType(CreateSpeedTestDto) {}
