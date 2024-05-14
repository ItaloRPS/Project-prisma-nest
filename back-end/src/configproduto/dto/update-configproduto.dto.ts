import { PartialType } from '@nestjs/swagger';
import { CreateConfigprodutoDto } from './create-configproduto.dto';

export class UpdateConfigprodutoDto extends PartialType(CreateConfigprodutoDto) {}
