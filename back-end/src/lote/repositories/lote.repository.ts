/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLoteDto } from '../dto/create-lote.dto';
import { LoteEntity } from '../entities/lote.entity';
import { UpdateLoteDto } from '../dto/update-lote.dto';
import { Prisma } from '@prisma/client';
import { Console } from 'console';

@Injectable()
export class LoteRepository {
  constructor(private readonly prisma: PrismaService) {}

  // Método de criação de lote
  async create(createLoteDto: CreateLoteDto): Promise<LoteEntity> {
    return this.prisma.lote.create({
      data: createLoteDto,
    });
  }

  // Método de aprovação de lote
  async aprove(
    idlote: number,
    updateLoteDto: UpdateLoteDto,
    arrayAcesso,
    currentUser: string
  ): Promise<any> {
    // console.log(arrayAcesso);
    try {
      const arrayItem = [
        {
          descricao: 'Instagram',
          icone: 'Instagram',
        },
        {
          descricao: 'Whatsapp',
          icone: 'Whatsapp',
        },
        {
          descricao: 'Twitter',
          icone: 'Twitter',
        },
        {
          descricao: 'Facebook',
          icone: 'Facebook',
        },
        {
          descricao: 'Linkedin',
          icone: 'Linkedin',
        },
        {
          descricao: 'Url',
          icone: 'Url',
        },
        {
          descricao: 'Pix',
          icone: 'Pix',
        },
        {
          descricao: 'Fone',
          icone: 'Fone',
        },
        {
          descricao: 'Email',
          icone: 'Email',
        },
      ];

      const [aproveLote, temaCreate, ...acessosCriados] =
        await this.prisma.$transaction([
          // Atualização do lote
          this.prisma.lote.update({
            where: {
              idlote,
            },
            data: {
              liberado: updateLoteDto.liberado,
              dtativacao: new Date(),
            },
          }),

          this.prisma.tema.create({
            data: {
              idlote,
              created_at: new Date(),
              created_by: currentUser,
              temaitem: {
                create: arrayItem,
              },
            },
          }),

          // Criação de layouts encadeados
          ...arrayAcesso.map((acesso) =>
            this.prisma.acesso.create({
              data: {
                idlote,
                link: acesso.link,
                hash: acesso.hash,
                tema: {
                  create: {
                    created_at: new Date(),
                    created_by: currentUser,
                    temaitem: {
                      create: arrayItem,
                    },
                  },
                },
              },
            }),
          ),
        ]);

      return { aproveLote, temaCreate, acessosCriados };
    } catch (error) {
      // Lidar com erros de transação
      throw new Error('Erro ao aprovar lote: ' + error.message);
    }
  }


  async findAll(currentUser): Promise<LoteEntity[]> {
    try {    
      const { id, idempresa, perfil } = currentUser;
      let produto = []

      if (perfil.nome === 'Admin') {
        produto = await this.prisma.$queryRaw`select * from lote l inner join produto p on l.idproduto = p.idproduto `;

      } else if (perfil.nome === 'Lead') {
        produto = await this.prisma.$queryRaw`select l.*, a.hash
                                              from lote 
                                              inner join acesso a on l.idlote = a.idlote
                                              inner join lead le on a.idacesso = le.idacesso
                                              where le.idusuario = ${id}`;
        // console.log(produto);

      } else if (perfil.nome === 'Empresa') {
        const query = `select * from lote l inner join produto p on l.idproduto = p.idproduto where p.idempresa in(${idempresa.toString()})`
        produto = await this.prisma.$queryRaw(Prisma.raw(query))
        // console.log(produto);
      }

      return produto
    } catch (error) {
      console.error('Ocorreu um erro ao executar a busca dos produtos:', error);
    }
  }

  // Método para buscar um lote por ID
  async findOne(idlote: number): Promise<any> {
    return this.prisma.lote.findUnique({
      where: {
        idlote,
      },
      include: {
        produto: {},
        tema: {
          include: {
            temaitem: {},
          },
        },
        acesso: {
          include: {
            tema: {
              include: {
                temaitem: {},
              },
            },
          },
        },
      },
    });
  }

  async findOneHash(idlote: number, hash: string): Promise<any> {
    return this.prisma.lote.findUnique({
      where: {
        idlote,
      },
      include: {
        produto: {},
        tema: {
          include: {
            temaitem: {},
          },
        },
        acesso: {
          where: {
            hash
          },
          include: {
            tema: {
              include: {
                temaitem: {},
              },
            },
            lead:{}
          },
        },
      },
    });
  }

  async downloadLink(idlote: number): Promise<any> {
    try {
      const link = await this.prisma.lote.findUnique({
        where: {
          idlote,
        },
        include: {
          acesso: true
        }
      });
      if (!link) {
        throw new NotFoundException('Acesso não encontrado.');
      }
      return link;
    } catch (error) {
      // Tratar adequadamente o erro de busca por ID
      throw new Error('Erro ao buscar acesso por ID.');
    }
  }

  // Método para atualizar um lote
  async update(
    idlote: number,
    updateLoteDto: UpdateLoteDto,
  ): Promise<LoteEntity> {
    return this.prisma.lote.update({
      where: {
        idlote,
      },
      data: updateLoteDto,
    });
  }

  // Método para remover um lote
  async remove(idlote: number): Promise<LoteEntity> {
    return this.prisma.lote.delete({
      where: {
        idlote,
      },
    });
  }
}
