import { PartialType } from '@nestjs/swagger';
import { CreateAcessoDto } from './create-acesso.dto';

export class UpdateAcessoDto extends PartialType(CreateAcessoDto) {}
