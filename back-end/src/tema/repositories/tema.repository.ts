import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTemaDto } from '../dto/create-tema.dto';
import { TemaEntity } from '../entities/tema.entity';
import { UpdateTemaDto } from '../dto/update-tema.dto';

@Injectable()
export class TemaRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    createTemaDto: CreateTemaDto,
    currentUser: string,
  ): Promise<TemaEntity> {
    return this.prisma.tema.create({
      data: {
        ...createTemaDto,
        created_at: new Date(),
        created_by: currentUser,
      },
    });
  }

  async findAll(): Promise<TemaEntity[]> {
    return this.prisma.tema.findMany();
  }

  async findAlltemaDefault(currentUser): Promise<TemaEntity[]> {
    try {    
      const { id, idempresa, perfil } = currentUser;
      let tema = []
    
      if (perfil.nome === 'Admin' || perfil.nome === 'Empresa') {
        tema = await this.prisma.$queryRaw`select distinct t.idtema ,t.nome ,t.nomeTema 
                                          FROM 
                                          User u 
                                          inner join UserEmpresa ue 
                                           on u.id = ue.idusuario 
                                          inner join empresa e 
                                            on ue.idempresa = e.idempresa 
                                          inner join produto p 
                                            on e.idempresa = p.idempresa 
                                          inner join lote l 
                                            on p.idproduto = l.idproduto 
                                          inner join tema t 
                                            on l.idlote  = t.idlote  
                                            WHERE 
                                            t.reutilizar  = 'S'
                                            and u.id = ${id}`;
                                            

      } else if (perfil.nome === 'Lead') {
        tema = await this.prisma.$queryRaw`select distinct t.idtema ,t.nome ,t.nomeTema 
                                            FROM 
                                            User u 
                                            inner join lead l
                                              on u.id =l.idusuario 
                                            inner join acesso a 
                                              on l.idacesso  = a.idacesso 
                                            inner join tema t 
                                              on a.idacesso  = t.idacesso 
                                            WHERE 
                                              t.reutilizar  = 'S'
                                            and u.id = ${id}`;

      } 
      return tema
    } catch (error) {
      console.error('Ocorreu um erro ao executar a busca dos temas:', error);
    }
  }

  

  async findOne(idtema: number): Promise<TemaEntity | null> {
    return this.prisma.tema.findUnique({
      where: {
        idtema,
      },
      include: {
        temaitem: true,
      },
    });
  }

  async update(
    idtema: number,
    updateTemaDto: UpdateTemaDto,
    currentUser: string,
  ): Promise<TemaEntity | null> {
    return this.prisma.tema.update({
      where: {
        idtema,
      },
      data: {
        ...updateTemaDto,
        updated_at: new Date(),
        updated_by: currentUser,
      },
    });
  }

  async updateTemaItem(
    id: number,
    updateTemaDto: any,
    currentUser: string,
  ): Promise<TemaEntity | null> {
    const { temaitem, ...tema } = updateTemaDto;

    // console.log("id")
    // console.log(id)
    // console.log("updateTemaDto")
    // console.log(updateTemaDto)
    // console.log("idtema")
    // console.log(tema)
    // console.log("temaitem")
    // console.log(temaitem)


    tema.updated_at = new Date() 
    tema.updated_by = currentUser

    try {
      const updatedTema = await this.prisma.$transaction(async (prisma) => {
        const updatedTema = await prisma.tema.update({
          where: {
            idtema: temaitem[0].idtema,
          },
          data: tema,
        });

        if (temaitem && temaitem.length > 0) {
          const temaItemPromises = temaitem.map(async (item) => {
            const { idtemaitem, ...itemData } = item;

            // console.log("idtemaitem")
            // console.log(idtemaitem)

            // console.log("itemData")
            // console.log(itemData)

            if (idtemaitem) {
              return prisma.temaitem.updateMany({
                where: {
                  idtemaitem,
                },
                data: itemData,
              });
            } else {
              throw new Error('idtemaitem obrigatório para atualização.');
            }
          });

          const updatedItems = await Promise.all(temaItemPromises);

          // console.log("updatedItems")
          // console.log(updatedItems)

          const temaWithItems = await prisma.tema.findUnique({
            where: {
              idtema: temaitem[0].idtema,
            },
            include: {
              temaitem: true,
            },
          });

          // console.log("temaWithItems")
          // console.log(temaWithItems)

          if (temaWithItems) {
            // temaWithItems.temaitem = updatedItems;
            return temaWithItems;
          } else {
            throw new Error('Tema não encontrado para atualização.');
          }
        } else {
          throw new Error('Itens obrigatórios para atualização.');
        }
      });

      return updatedTema;
    } catch (error) {
      console.error('Erro ao atualizar o tema:', error);
      throw new Error(
        `Erro ao atualizar o tema, verifique os dados e tente novamente. ${error}`,
      );
    } finally {
      await this.prisma.$disconnect(); // Certifique-se de desconectar do banco de dados após a transação.
    }
  }

  async remove(idtema: number): Promise<TemaEntity | null> {
    return this.prisma.tema.delete({
      where: {
        idtema,
      },
    });
  }
}
