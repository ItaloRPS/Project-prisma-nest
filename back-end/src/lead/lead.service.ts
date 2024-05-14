import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { LeadRepository } from './repositories/lead.repository';
import { LeadEntity } from './entities/lead.entity';

@Injectable()
export class LeadService {
  constructor(private readonly repository: LeadRepository) {}

  async create(createLeadDto: CreateLeadDto): Promise<LeadEntity> {
    try {
      const createdLead = await this.repository.create(createLeadDto);
      if (!createdLead) {
        throw new Error('Failed to create lead');
      }
      return createdLead;
    } catch (error) {
      throw new Error(`Failed to create lead: ${error.message}`);
    }
  }

  async findAll(currentUser): Promise<LeadEntity[]> {
    try {
      return await this.repository.findAll(currentUser);
    } catch (error) {
      throw new Error(`Failed to retrieve leads: ${error.message}`);
    }
  }

  async findOne(idlead: number): Promise<LeadEntity> {
    const lead = await this.repository.findOne(idlead);
    if (!lead) {
      throw new NotFoundException(`Lead with id ${idlead} not found`);
    }
    return lead;
  }

  async findOneEmail(email: string, hash: string) {

    if(email){
      const retorno = await this.repository.findOneEmail(email, hash);

      // console.log(lead)

      if (!retorno) {
        throw new NotFoundException(`Lead with email ${email} not found`);

      }else{
        delete retorno.lead.idlead
        // console.log(retorno.lead)
        const creatLead = this.create(retorno.lead)
        
        return creatLead;
      }

    }else{
      throw new NotFoundException(`Lead with email ${email} not found`);
    }
  }

  async findOneCompanyDownload(idempresa: number ,currentUser) {
    const lead = await this.repository.findOneCompanyDownload(idempresa, currentUser);
    if (!lead) {
      throw new NotFoundException(`Lead with id ${idempresa} not found`);
    }
    return lead;
  }

  async findOneCompany(idempresa: number ,currentUser) {
    const lead = await this.repository.findOneCompany(idempresa, currentUser);
    if (!lead) {
      throw new NotFoundException(`Lead with id ${idempresa} not found`);
    }
    return lead;
  }

  async findAllbyLote(idlote:number, idestado:number, idcidade:number) {
    const lead = await this.repository.findAllbyLote(idlote, idestado, idcidade);
    if (!lead) {
      throw new NotFoundException(`Lead with id ${idlote} not found`);
    }
    return lead;
  }

  async update(idlead: number, updateLeadDto: UpdateLeadDto): Promise<LeadEntity> {
    try {
      const updatedLead = await this.repository.update(idlead, updateLeadDto);
      if (!updatedLead) {
        throw new Error('Failed to update lead');
      }
      return updatedLead;
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }

  async removeEmail(email: string): Promise<LeadEntity[]> {
    try {
      const deletedLead = await this.repository.removeEmail(email);
      if (!deletedLead) {
        throw new Error('Failed to delete lead');
      }
      return deletedLead;
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }

  async removeHash(hash: string) {
    try {
      const deletedLead = await this.repository.removeHash(hash);
      if (!deletedLead) {
        throw new Error('Failed to delete lead');
      }
      return deletedLead;
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }

  async clearAccess(hash: string) {
    try {
      const deletedAccess = await this.repository.clearAccess(hash);
      if (!deletedAccess) {
        throw new Error('Failed to delete access');
      }
      return deletedAccess;
    } catch (error) {
      throw new Error(`${error.message}`);
    }
  }

  // async remove(idlead: number): Promise<LeadEntity> {
  //   try {
  //     const deletedLead = await this.repository.remove(idlead);
  //     if (!deletedLead) {
  //       throw new Error('Failed to delete lead');
  //     }
  //     return deletedLead;
  //   } catch (error) {
  //     throw new Error(`Failed to delete lead: ${error.message}`);
  //   }
  // }
}