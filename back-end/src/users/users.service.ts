import { Injectable } from '@nestjs/common';
import { NotFoundError } from 'src/common/erros/types/notfoundError';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';
import { UsersRepository } from './repositories/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersrepository: UsersRepository){}

  create(createUserDto: CreateUserDto) {
    return this.usersrepository.create(createUserDto);
  }

  findAll() {
    return this.usersrepository.findAll();
  }

  async findOne(id: number):Promise<UserEntity> {
    const user = await this.usersrepository.findOne(id)
    if(!user){
      throw new NotFoundError('usuario não encontrado, comédia')
    }
    return user
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersrepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.usersrepository.remove(id);
  }
}
