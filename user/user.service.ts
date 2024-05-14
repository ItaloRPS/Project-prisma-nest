/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entities/user.entity';
import { NotFoundError } from 'src/common/errors/types/NotFoundError';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from './repositories/users.repository';

@Injectable()
export class UserService {
  constructor(private readonly repository: UsersRepository) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const saltRounds = 10; // Ajuste o custo do hash de acordo com seu ambiente

    try {
      const retornoEmail = await this.repository.findUnique(
        createUserDto.email,
      );
      if (createUserDto.password.length < 6) {
        throw new NotFoundError(`Password deve conter no mínimo 6 caracteres.`);
      } else if (retornoEmail) {
        throw new NotFoundError(`Email já cadastrado.`);
      } else {
        const hashedPassword = await bcrypt.hash(
          createUserDto.password,
          saltRounds,
        );
        const createdUser = await this.repository.create({
          ...createUserDto,
          password: hashedPassword,
        });

        // Não é uma prática segura retornar a senha, é melhor remover o campo antes de retornar o objeto
        return {
          ...createdUser,
          password: undefined,
          passwordResetToken: undefined,
          passwordResetExpires: undefined,
        };
      }
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async createUserLead(createUserLead): Promise<any> {
    // console.log('createUserLead.hash');
    // console.log(createUserLead.hash);
    try {
      if (!createUserLead.hash) {
        throw new NotFoundError(`O campo hash é obrigatório.`);
      }

      const saltRounds = 10; // Ajuste o custo do hash de acordo com seu ambiente
      // const retornoEmail = await this.repository.findUnique(
      //   createUserLead.email,
      // );

      if (createUserLead.password.length < 6) {
        throw new NotFoundError(`Password deve conter no mínimo 6 caracteres.`);
      // } else if (retornoEmail) {
      //   throw new NotFoundError(`Email já cadastrado.`);
      } else {
        const hashedPassword = await bcrypt.hash(
          createUserLead.password,
          saltRounds,
        );
        const createdUser = await this.repository.createUserLead({
          ...createUserLead,
          password: hashedPassword,
        });

        // Não é uma prática segura retornar a senha, é melhor remover o campo antes de retornar o objeto
        return createdUser;
      }
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async userEmpresa(vinculoEmpresa) {
    try {
      if (vinculoEmpresa?.idusuario && vinculoEmpresa?.idempresa) {
        const retornoId = await this.repository.findUniqueEmpresa(
          +vinculoEmpresa.idusuario,
          +vinculoEmpresa.idempresa,
        );

        if (retornoId.UserEmpresa.length > 0) {
          throw new NotFoundError(`Usuario já vinculado a empresa.`);
        } else {
          const retorno = await this.repository.userEmpresa(
            +vinculoEmpresa.idusuario,
            +vinculoEmpresa.idempresa,
          );

          // Não é uma prática segura retornar a senha, é melhor remover o campo antes de retornar o objeto
          return retorno;
        }
      } else {
        throw new NotFoundError(`Deve ser informado Usuario e Empresa.`);
      }
    } catch (error) {
      throw new Error(`${error}`);
    }
  }

  async findByEmail(email: string) {
    const user = await this.repository.findUnique(email);
    return user;
  }

  findAll() {
    return this.repository.findAll();
  }

  async findOne(id: number) {
    const user = await this.repository.findOne(id);
    if (!user) {
      throw new NotFoundError('Usuário não encontrado.');
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.repository.update(id, updateUserDto);
  }

  async remove(id: number) {
    return this.repository.remove(id);
  }

  async findUniqueToken(token: string){
    const user = await this.repository.findUniqueToken(token);
    if (!user) {
      throw new NotFoundError('Usuário não encontrado.');
    }
    return user
  }
}



