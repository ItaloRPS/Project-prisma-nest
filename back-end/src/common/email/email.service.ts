import { Injectable, NotFoundException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: 'smtp.office365.com', // Servidor SMTP do Outlook
      port: 587, // Porta padrão para TLS
      secure: false, // true para 465, false para outras portas
      auth: {
        user: process.env.EMAIL, // Seu endereço de e-mail do Outlook
        pass: process.env.PASSWORDEMAIL, // Sua senha do Outlook
      },
      tls: {
        ciphers: 'SSLv3',
      },
    });
  }
  async sendMail(to: string, subject: string, text: string, html: string) {
    const mailOptions = {
      from: process.env.EMAIL,
      to,
      subject,
      text,
      html,
    };
    try {
      nodemailer
    const retorno = await this.transporter.sendMail(mailOptions);
    return {
      message: 'E-mail enviado!',
      result: retorno,
    };
    } catch (error) {
      throw new NotFoundException({
        message: 'Erro ao envial e-mail.',
        error: error,
      });
    }
  }

}