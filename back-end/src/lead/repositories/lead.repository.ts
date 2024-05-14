import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { LeadEntity } from '../entities/lead.entity';
import { CreateLeadDto } from '../dto/create-lead.dto';
import { UpdateLeadDto } from '../dto/update-lead.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class LeadRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(createLeadDto: CreateLeadDto): Promise<LeadEntity> {
    return this.prisma.lead.create({
      data: createLeadDto,
    });
  }

  
  async findAll(currentUser): Promise<LeadEntity[]> {
    try {    
      const { id, idempresa, perfil } = currentUser;
      let lead = []

      if (perfil.nome === 'Admin') {
            const query = `SELECT ${"`lead`"}.*
                              from
                              (select DISTINCT 
                                prd.nome as produto, 
                                lt.codigo as codigoLote,
                                le.idlead,
                                le.nome,
                                le.telefone,
                                le.dtnascimento,
                                le.email,
                                le.idpais,
                                le.idestado,
                                le.idcidade,
                                e.descricao as estato,
                                c.descricao as cidade,
                                le.idlojista,
                                u.name as lojista,
                                emp.idempresa
                                from empresa emp
                                inner join produto prd on emp.idempresa = prd.idempresa
                                inner join lote lt on prd.idproduto = lt.idproduto
                                inner join acesso ac on lt.idlote = ac.idlote
                                inner join ${"`lead`"} le on ac.idacesso = le.idacesso
                                inner join estado e on le.idestado  = e.idestado
                                inner join cidade c on le.idcidade  = c.idcidade
                                left  join lojista l on le.idlojista = l.idlojista
                                left join ${"`User`"} u on l.idUser = u.id)${"`lead`"}`;


         lead = await this.prisma.$queryRaw(Prisma.raw(query))

      } else if (perfil.nome === 'Lojista') {
        const query = `select DISTINCT 
                        prd.nome as produto, 
                        lt.codigo as codigoLote,
                        le.idlead,
                        le.nome,
                        le.telefone,
                        le.dtnascimento,
                        le.email,
                        le.idpais,
                        le.idestado,
                        le.idcidade,
                        le.idlojista,
                        u.name as lojista,
                        emp.idempresa
                      from empresa emp
                      inner join produto prd on emp.idempresa = prd.idempresa
                      inner join lote lt on prd.idproduto = lt.idproduto
                      inner join acesso ac on lt.idlote = ac.idlote
                      inner join ${"`lead`"} le on ac.idacesso = le.idacesso
                      inner join estado e on le.idestado  = e.idestado
                      inner join cidade c on le.idcidade  = c.idcidade
                      left  join lojista l on le.idlojista = l.idlojista
                      left join ${"`User`"} u on l.idUser = u.id
                      where le.idlojista = ${id}`
        
        lead = await this.prisma.$queryRaw(Prisma.raw(query))

      } else if (perfil.nome === 'Empresa') {
              const query = `SELECT ${"`lead`"}.*
                              from
                              (select DISTINCT 
                                  prd.nome as produto, 
                                  lt.codigo as codigoLote,
                                  le.idlead,
                                  le.nome,
                                  le.telefone,
                                  le.dtnascimento,
                                  le.email,
                                  le.idpais,
                                  le.idestado,
                                  le.idcidade,
                                  e.descricao as estato,
                                  c.descricao as cidade,
                                  le.idlojista,
                                  u.name as lojista,
                                  emp.idempresa
                                  from empresa emp
                                  inner join produto prd on emp.idempresa = prd.idempresa
                                  inner join lote lt on prd.idproduto = lt.idproduto
                                  inner join acesso ac on lt.idlote = ac.idlote
                                  inner join ${"`lead`"} le on ac.idacesso = le.idacesso
                                  inner join estado e on le.idestado  = e.idestado
                                  inner join cidade c on le.idcidade  = c.idcidade
                                  left  join lojista l on le.idlojista = l.idlojista
                                  left join ${"`User`"} u on l.idUser = u.id)${"`lead`"}
                                where idempresa in(${idempresa.toString()})`;

        lead = await this.prisma.$queryRaw(Prisma.raw(query))
      }

      return lead
    } catch (error) {
      console.error('Ocorreu um erro ao executar a busca dos leads:', error);
    }
  }



  async findOne(idlead: number) {
    const lead = await this.prisma.lead.findUnique({
      where: {
        idlead,
      },
    });

    if (!lead) {
      throw new NotFoundException(`Lead com o id ${idlead} não encontrado.`);
    }

    return lead;
  }

  async findOneEmail(email: string, hash: string): Promise<any> {
 
    try {
      const acesso = await this.prisma.acesso.findFirst({
        where: {
          hash,
        },
        include: {
          lead: {},
        },
      });
      console.log('acesso',acesso)
      if (!acesso) {
        throw new NotFoundException(
          `Acesso com o hash ${hash} não encontrado.`,
        );
      } else {
        if (acesso.lead.length > 0) {
          throw new NotFoundException(`Link já vinculado.`);
        } else {
          const lead = await this.prisma.lead.findFirst({
            where: {
              email,
            },
          });
          if (!lead) {
            throw new NotFoundException(
              `Cadastro com o email ${email} não encontrado.`,
            );
          } else {
            // Criar um objeto que contém tanto o lead quanto o acesso
            const resultado = {
              lead: lead,
            };
            resultado.lead.idacesso = acesso.idacesso;

            return resultado;
          }
        }
      }
    } catch (error) {
      // Tratamento de erro apropriado
      throw error; // Rejeita a Promessa com a exceção capturada
    }
  }

  async findOneCompanyDownload(empresa: number, currentUser) {
    try {    
      const { id, perfil } = currentUser;
 
      let lead = []
      if (perfil.nome === 'Lojista') {
          lead = await this.prisma.$queryRaw(Prisma.raw(`select DISTINCT
                                                          emp.nome as empresa,
                                                          prd.nome as produto, 
                                                            lt.codigo as lote, 
                                                            le.idlojista,
                                                            lj.name as lojista_name,
                                                            lj.email as lojista_email,
                                                            pais.descricao as lead_pais,
                                                            et.descricao as lead_estado,
                                                            cd.descricao as lead_cidade,
                                                            le.nome as lead_nome, 
                                                            le.telefone as lead_telefone, 
                                                            le.dtnascimento as lead_dtnascimento, 
                                                            le.email as lead_email   
                                                        from empresa emp
                                                        inner join produto prd on emp.idempresa = prd.idempresa
                                                        inner join lote lt on prd.idproduto = lt.idproduto
                                                        inner join acesso ac on lt.idlote = ac.idlote
                                                        inner join ${"`lead`"} le on ac.idacesso = le.idacesso
                                                        inner join pais on le.idpais = pais.idpais
                                                        inner join estado et on le.idestado = et.idestado
                                                        inner join cidade cd on le.idcidade = cd.idcidade
                                                        inner join User lj on le.idlojista = lj.id
                                                        where emp.idempresa = ${empresa}
                                                        and   le.idlojista  = ${id}`));
      } else {
          lead = await this.prisma.$queryRaw(Prisma.raw(`select DISTINCT 
                                                          emp.nome as empresa,
                                                          prd.nome as produto, 
                                                            lt.codigo as lote, 
                                                            le.idlojista,
                                                            lj.name as lojista_name,
                                                            lj.email as lojista_email,
                                                            pais.descricao as lead_pais,
                                                            et.descricao as lead_estado,
                                                            cd.descricao as lead_cidade,
                                                            le.nome as lead_nome, 
                                                            le.telefone as lead_telefone, 
                                                            le.dtnascimento as lead_dtnascimento, 
                                                            le.email as lead_email   
                                                        from empresa emp
                                                        inner join produto prd on emp.idempresa = prd.idempresa
                                                        inner join lote lt on prd.idproduto = lt.idproduto
                                                        inner join acesso ac on lt.idlote = ac.idlote
                                                        inner join ${"`lead`"} le on ac.idacesso = le.idacesso
                                                        inner join pais on le.idpais = pais.idpais
                                                        inner join estado et on le.idestado = et.idestado
                                                        inner join cidade cd on le.idcidade = cd.idcidade
                                                        left join User lj on le.idlojista = lj.id
                                                        where emp.idempresa = ${empresa}`));
      }

      return lead
    } catch (error) {
      console.error('Ocorreu um erro ao executar a busca dos leads:', error);
    }
  }

  async findOneCompany(empresa: number, currentUser) {
    try {    
      const { id, idempresa, perfil } = currentUser;
      let lead = []

      if (perfil.nome === 'Admin') {
        lead = await this.prisma.$queryRaw(Prisma.raw(`SELECT ld.*
                                                        from
                                                          (select DISTINCT 
                                                            prd.nome as produto,
                                                            lt.codigo as codigoLote, 
                                                            le.*,
                                                            e.descricao as estato,
                                                            c.descricao as cidade,
                                                            u.name as lojista,
                                                            emp.idempresa
                                                            from empresa emp
                                                            inner join produto prd on emp.idempresa = prd.idempresa
                                                            inner join lote lt on prd.idproduto = lt.idproduto
                                                            inner join acesso ac on lt.idlote = ac.idlote
                                                            inner join ${"`lead`"} le on ac.idacesso = le.idacesso
                                                          inner join estado e on le.idestado  = e.idestado
                                                          inner join cidade c on le.idcidade  = c.idcidade
                                                          left  join lojista l on le.idlojista = l.idlojista
                                                          left join ${"`User`"}u on l.idUser = u.id)ld
                                                          ${empresa == 0?'':(`where ld.idempresa = ${empresa}`)}

                                                      `));

      } else if (perfil.nome === 'Lojista') {
        lead = await this.prisma.$queryRaw(Prisma.raw(`SELECT ld.*,u.name as lojista
                                                      from
                                                        (select DISTINCT 
                                                          prd.nome as produto,
                                                          lt.codigo as codigoLote, 
                                                          le.*,
                                                          e.descricao as estato,
                                                          c.descricao as cidade,
                                                          emp.idempresa
                                                          from empresa emp
                                                          inner join produto prd on emp.idempresa = prd.idempresa
                                                          inner join lote lt on prd.idproduto = lt.idproduto
                                                          inner join acesso ac on lt.idlote = ac.idlote
                                                          inner join ${"`lead`"} le on ac.idacesso = le.idacesso
                                                          inner join estado e on le.idestado  = e.idestado
                                                          inner join cidade c on le.idcidade  = c.idcidade )ld
                                                        inner join cidade c  on ld.idcidade  = c.idcidade 
                                                        inner join lojista l on ld.idestado = l.idestado and (l.idcidade IS NULL or l.idcidade = ld.idcidade) and ld.idempresa = l.idempresa 
                                                        inner join ${"`User`"} u on l.idUser = u.id 
                                                      where l.iduser = ${id}
                                                      and ld.idempresa in(${idempresa.toString()})
                                                      and ld.idempresa = ${empresa}
                                                      `));

      } else if (perfil.nome === 'Empresa') {
        lead = await this.prisma.$queryRaw(Prisma.raw(`SELECT ld.*
                                                      from
                                                        (select DISTINCT 
                                                          prd.nome as produto,
                                                          lt.codigo as codigoLote, 
                                                          le.*,
                                                          e.descricao as estato,
                                                          c.descricao as cidade,
                                                          u.name as lojista,
                                                          emp.idempresa
                                                          from empresa emp
                                                          inner join produto prd on emp.idempresa = prd.idempresa
                                                          inner join lote lt on prd.idproduto = lt.idproduto
                                                          inner join acesso ac on lt.idlote = ac.idlote
                                                          inner join ${"`lead`"} le on ac.idacesso = le.idacesso
                                                        inner join estado e on le.idestado  = e.idestado
                                                        inner join cidade c on le.idcidade  = c.idcidade
                                                        left  join lojista l on le.idlojista = l.idlojista
                                                        left join ${"`User`"}u on l.idUser = u.id)ld
                                                  where idempresa in(${idempresa.toString()})
                                                  and ld.idempresa = ${empresa}`));
      }

      return lead
    } catch (error) {
      console.error('Ocorreu um erro ao executar a busca dos leads:', error);
    }
  }

  async findAllbyLote(idlote: number, idestado:number, idcidade:number) {
    const lead = await this.prisma.$queryRaw(
        Prisma.raw(` select 
        l.idlead,
        l.idusuario,
        l.nome,
        l.telefone,
        l.email,
        e.idestado,
        e.descricao as estado,
        c.idcidade,
        c.descricao  as cidade
        from lote lt
        inner join acesso a 
          on  lt.idlote  = a.idlote 
        inner join ${"`lead`"} l
          on a.idacesso = l.idacesso 
        inner join estado e 
          on l.idestado  = e.idestado 
        inner join cidade c 
          on l.idcidade  = c.idcidade 
        WHERE 
        lt.idlote =${idlote}
        ${idestado?` AND l.idestado = ${idestado}`:''}
        ${idcidade?` AND l.idcidade  = ${idcidade}`:''};
       `)
       )
    if (!lead) {
      throw new NotFoundException(`Nenhum Lead encontrado.`);
    }

    return lead;
  }

  async update(idlead: number, updateLeadDto:UpdateLeadDto,): Promise<any> {
    const lead = await this.findOne(idlead);

    if (!lead) {
      throw new NotFoundException(
        `Lead com o id ${idlead} não encontrado para atualização.`,
      );
    }
    return this.prisma.lead.update({
      where:{
        idlead:idlead
      },
      data:updateLeadDto
    })

  }

  async removeEmail(email: string): Promise<LeadEntity[]> {
    let transaction;
    let lead = []
    try {
      // Encontrar o lead pelo e-mail
       lead = await this.prisma.lead.findMany({
        where: {
          email,
        },
        include: {
          acesso: true,
          User: true,
        },
      });

      // Se não encontrar o lead, lançar uma exceção
      if (lead.length === 0) {
        throw new NotFoundException(
          `Lead com o e-mail ${email} não encontrado para exclusão.`,
        );
      }

      // Iniciar a transação
      transaction = await this.prisma.$transaction([
        // Excluir o lead encontrado
        this.prisma.$executeRaw(Prisma.raw(`DELETE FROM ${"`lead`"} WHERE email = '${email}'`)),

        // Excluir o userempresa encontrado
        this.prisma.$executeRaw(Prisma.raw(`DELETE FROM UserEmpresa WHERE (idusuario = (select id  
                                                                            from ${"`User`"} 
                                                                            where email = '${email}'))`)),

        // Excluir o usuário encontrado
        this.prisma.$executeRaw(Prisma.raw(`DELETE FROM ${"`User`"}  WHERE (email = '${email}')`)),

        // Editar o tema encontrado
        this.prisma.$executeRaw(Prisma.raw(`UPDATE tema
                                SET
                                reutilizar = 'N',
                                logo = null,
                                bgcolor = null,
                                textcolor = null,
                                imagem = null,
                                video = null,
                                descricao = null,
                                nome = null,
                                containerColor = null,
                                nomeTema = null,
                                ocupacao = null,
                                updated_at = null,
                                updated_by = null
                                WHERE idacesso = (select 
                                                    idacesso 
                                                  from ${"`lead`"} 
                                                  where email = '${email}')`)),

        // Editar o temaitem encontrado
        this.prisma.$executeRaw(Prisma.raw(`UPDATE temaitem
                                SET
                                link = null
                                WHERE idtema = (select t.idtema 
                                          from ${"`lead`"} l 
                                          inner join tema t on l.idacesso = t.idacesso 
                                          where l.email = '${email}')`)),
      ]);
      

      return lead; // Retorna o lead encontrado
    } catch (error) {
      // Se ocorrer um erro, a transação será revertida implicitamente
      throw new Error(`Erro ao excluir lead: ${error.message}`);
    }
  }

  async removeHash(hash: string): Promise<any> {
    let transaction;

    try {
      // Iniciar a transação
      transaction = await this.prisma.$transaction(async (prisma) => {
        // Encontrar o lead pelo hash
        const lead = await prisma.acesso.findUnique({
          where: {
            hash,
          },
          include: {
            lead: {
              include: {
                User: true,
              },
            },
            tema:{
              include:{
                temaitem:{}
              }
            }
          },
        });

        // Se não encontrar o lead, lançar uma exceção
        if (!lead) {
          throw new NotFoundException(`Link não encontrado para exclusão.`);
        } else if (lead.lead.length == 0) {
          throw new NotFoundException(
            `Não existe lead vinculado ao link informado.`,
          );
        }

        // Excluir o lead encontrado
        await prisma.lead.delete({
          where: {
            idlead: lead.lead[0].idlead,
          },
        });

        // Excluir o usuário encontrado
        await prisma.user.delete({
          where: {
            id: lead.lead[0].User.id,
          },
        });

        await prisma.tema.update({
          where:{
            idtema:lead.tema[0].idtema,
          },
          data:{
            logo:{set:null},
            bgcolor:{set:null},
            textcolor:{set:null},
            imagem:{set:null},
            video:{set:null}  ,
            descricao:{set:null} ,
            nome:{set:null} ,
            containerColor:{set:null} ,
            nomeTema:{set:null} ,
            ocupacao:{set:null} ,
            updated_at:{set:null} ,
            updated_by:{set:null} ,
            temaitem:{
              updateMany:{
                where:{
                  idtema:lead.tema[0].idtema
                },
                data:{
                  link:{set:null} 
                }
              }
            }
          },
         });

        return lead;
      });

      return transaction; // Retorna o lead encontrado
    } catch (error) {
      // Se ocorrer um erro, a transação será revertida implicitamente
      throw new Error(`Erro ao excluir lead: ${error.message}`);
    }
  }

  async clearAccess(hash: string): Promise<any> {

    try {

        // Encontrar o lead pelo hash
        const lead = await this.prisma.acesso.findUnique({
          where: {
            hash,
          },
          include: {
            lead: {
              include: {
                User: true,
              },
            },
            tema:{
              include:{
                temaitem:{}
              }
            }
          },
        });


        // Se não encontrar o lead, lançar uma exceção
        if (!lead) {
          throw new NotFoundException(`Link não encontrado para exclusão.`);
        } else if (lead.lead.length == 0) {
          throw new NotFoundException(  `Não existe lead vinculado ao link informado.`, );
        }

        const [resultLead,resultTema] = await this.prisma.$transaction([
           this.prisma.lead.delete({
             where: {
               idlead: lead.lead[0].idlead,
             },
           }),

           this.prisma.tema.update({
            where:{
              idtema:lead.tema[0].idtema,
            },
            data:{
              logo:{set:null},
              bgcolor:{set:null},
              textcolor:{set:null},
              imagem:{set:null},
              video:{set:null}  ,
              descricao:{set:null} ,
              nome:{set:null} ,
              containerColor:{set:null} ,
              nomeTema:{set:null} ,
              ocupacao:{set:null} ,
              updated_at:{set:null} ,
              updated_by:{set:null} ,
              temaitem:{
                updateMany:{
                  where:{
                    idtema:lead.tema[0].idtema
                  },
                  data:{
                    link:{set:null} 
                  }

                }
              }
            },
           })

        ])
      return [resultLead,resultTema]
    } catch (error) {
      // Se ocorrer um erro, a transação será revertida implicitamente
      throw new Error(`Erro ao excluir acesso: ${error.message}`);
    }
  }

  // async remove(idlead: number): Promise<LeadEntity> {
  //   const lead = await this.findOne(idlead);

  //   if (!lead) {
  //     throw new NotFoundException(`Lead com o id ${idlead} não encontrado para exclusão.`);
  //   }

  //   return this.prisma.lead.delete({
  //     where: {
  //       idlead,
  //     },
  //   });
  // }
}
