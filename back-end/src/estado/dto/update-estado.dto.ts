import { PartialType } from '@nestjs/swagger';
import { CreateEstadoDto } from './create-estado.dto';

export class UpdateEstadoDto extends PartialType(CreateEstadoDto) {}
