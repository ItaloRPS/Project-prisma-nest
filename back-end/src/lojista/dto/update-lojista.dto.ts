import { PartialType } from '@nestjs/swagger';
import { CreateLojistaDto } from './create-lojista.dto';

export class UpdateLojistaDto extends PartialType(CreateLojistaDto) {}
