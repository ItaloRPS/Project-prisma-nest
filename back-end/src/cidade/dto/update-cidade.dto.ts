import { PartialType } from '@nestjs/swagger';
import { CreateCidadeDto } from './create-cidade.dto';

export class UpdateCidadeDto extends PartialType(CreateCidadeDto) {}
