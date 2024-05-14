import { PartialType } from '@nestjs/swagger';
import { CreateTemaItemDto } from './create-tema-item.dto';

export class UpdateTemaItemDto extends PartialType(CreateTemaItemDto) {}
