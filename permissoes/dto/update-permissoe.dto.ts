import { PartialType } from '@nestjs/swagger';
import { CreatePermissoeDto } from './create-permissoe.dto';

export class UpdatePermissoeDto extends PartialType(CreatePermissoeDto) {}
