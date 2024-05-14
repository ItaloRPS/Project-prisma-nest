import e from 'express'
import {PrimaClientError} from '..//types/prismaClientError'

export const isPrismaError = (e:PrimaClientError)=>{
    return(
        typeof e.code == 'string'&& typeof e.clientVersion=='string' &&
        (typeof e.meta == 'undefined' ||typeof e.meta=='object')
    )
}