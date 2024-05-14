import { Injectable } from "@nestjs/common";
import {PrismaService} from 'src/prisma/prisma.service'
import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { UserEntity } from "../entities/user.entity";

@Injectable()
export class UsersRepository{
    constructor(private readonly prisma: PrismaService){}

   async create(createUserDto: CreateUserDto):Promise<UserEntity> {
    return await this.prisma.user.create({
        data:{
            email:createUserDto.email,
            name:createUserDto.name,
            admin:createUserDto.admin
        }
    })
      }
    
      async findAll():Promise<UserEntity[]>{
        return await this.prisma.user.findMany({
          include:{
            posts:{
              select:{
                author:true,
                createdAt:true,
              }
            }
          }
        })
      }
    
      async findOne(id: number) {
        return await this.prisma.user.findUnique({
            where:{
                id
            }
        })
      }
    
      async update(id: number, updateUserDto: UpdateUserDto):Promise<UserEntity> {
        return await this.prisma.user.update({
            where: {
                id,
            },
            data: updateUserDto,
          })
      }
    
      async remove(id: number):Promise<UserEntity> {
        return await this.prisma.user.delete({
            where: {
                id,
            },
          });
      }
}