import { Redis } from '@upstash/redis';
import { PDFDocument, rgb } from 'pdf-lib';
import type { VercelRequest, VercelResponse } from '@vercel/node';
import fs from 'fs';
import path from 'path';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const { token, file } = req.query;

    if (!token || !file) {
      return res.status(400).send('Parâmetros inválidos.');
    }

    const redisUrl = process.env['UPSTASH_REDIS_REST_KV_REST_API_URL'];
    const redisToken = process.env['UPSTASH_REDIS_REST_KV_REST_API_TOKEN'];

    if (!redisUrl || !redisToken) {
      return res.status(500).send('Erro de configuração do servidor.');
    }

    const redis = new Redis({ url: redisUrl, token: redisToken });
    const tokenDataStr = await redis.get(`token:${token}`);

    if (!tokenDataStr) {
      return res.status(404).send('Este link de download expirou, foi cancelado ou não existe.');
    }

    const tokenData: any = typeof tokenDataStr === 'string' ? JSON.parse(tokenDataStr) : tokenDataStr;

    if (file === 'sedutor' && !tokenData.hasSedutor) {
      return res.status(403).send('Você não tem acesso a este arquivo.');
    }
    if (file === 'timidez' && !tokenData.hasTimidez) {
      return res.status(403).send('Você não tem acesso a este arquivo.');
    }

    if (tokenData.downloadsLeft <= 0) {
      return res.status(403).send('O limite máximo de downloads para este link foi esgotado.');
    }

    tokenData.downloadsLeft -= 1;
    await redis.set(`token:${token}`, JSON.stringify(tokenData), { ex: 604800 });

    const fileName = file === 'timidez' ? 'timidez-zero.pdf' : 'metodo-sedutor.pdf';
    const filePath = path.join(process.cwd(), 'public', fileName);

    if (!fs.existsSync(filePath)) {
      return res.status(500).send('Arquivo PDF não encontrado no servidor.');
    }

    const existingPdfBytes = fs.readFileSync(filePath);

    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const pages = pdfDoc.getPages();

    const watermarkText = `Licenciado para: ${tokenData.email} | CPF: ${tokenData.cpf} | IP: ${tokenData.ip} — Uso exclusivo`;

    for (const page of pages) {
      page.drawText(watermarkText, {
        x: 40,
        y: 20,
        size: 8,
        color: rgb(0.5, 0.5, 0.5),
        opacity: 0.6,
      });
    }

    const modifiedPdfBytes = await pdfDoc.save();

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${file}-licenciado.pdf"`);
    return res.send(Buffer.from(modifiedPdfBytes));

  } catch (error: any) {
    return res.status(500).send('Erro interno ao processar o download.');
  }
}