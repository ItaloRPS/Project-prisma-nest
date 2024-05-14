import { PartialType } from '@nestjs/swagger';
import { CreateTemaDto } from './create-tema.dto';

export class UpdateTemaDto extends PartialType(CreateTemaDto) {}
