import { PartialType } from '@nestjs/swagger';
import { CreateLoteDto } from './create-lote.dto';

export class UpdateLoteDto extends PartialType(CreateLoteDto) {}
