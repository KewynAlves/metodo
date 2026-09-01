import { Redis } from '@upstash/redis';
import { PDFDocument, rgb } from 'pdf-lib';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    const { token, file } = req.query;

    if (!token || !file) {
      return res.status(400).send('Parâmetros inválidos.');
    }

    const redisUrl = process.env.UPSTASH_REDIS_REST_KV_REST_API_URL;
    const redisToken = process.env.UPSTASH_REDIS_REST_KV_REST_API_TOKEN;

    if (!redisUrl || !redisToken) {
      return res.status(500).send('Erro de configuração do servidor.');
    }

    const redis = new Redis({ url: redisUrl, token: redisToken });
    const tokenDataStr = await redis.get(`token:${token}`);

    if (!tokenDataStr) {
      return res.status(404).send('Este link de download expirou, foi cancelado ou não existe.');
    }

    const tokenData: any = typeof tokenDataStr === 'string' ? JSON.parse(tokenDataStr) : tokenDataStr;

    // Valida permissão do arquivo solicitado
    if (file === 'sedutor' && !tokenData.hasSedutor) {
      return res.status(403).send('Você não tem acesso a este arquivo.');
    }
    if (file === 'timidez' && !tokenData.hasTimidez) {
      return res.status(403).send('Você não tem acesso a este arquivo.');
    }

    // Valida limite de downloads (ex: 6 tentativas totais)
    if (tokenData.downloadsLeft <= 0) {
      return res.status(403).send('O limite máximo de downloads para este link foi esgotado.');
    }

    // Decrementa 1 download no Redis
    tokenData.downloadsLeft -= 1;
    await redis.set(`token:${token}`, JSON.stringify(tokenData), { ex: 604800 });

    // Define a URL pública onde o PDF original limpo está hospedado (ex: na pasta public do projeto)
    const pdfUrl = file === 'timidez' 
      ? 'https://www.sedutor.shop/books/timidez-zero.pdf' 
      : 'https://www.sedutor.shop/books/metodo-sedutor.pdf';

    const pdfBytesResponse = await fetch(pdfUrl);
    if (!pdfBytesResponse.ok) {
      return res.status(500).send('Erro ao carregar o e-book original.');
    }

    const existingPdfBytes = await pdfBytesResponse.arrayBuffer();

    // Carrega o PDF e aplica a marca d'água dinâmica
    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const pages = pdfDoc.getPages();

    const watermarkText = `Licenciado para: ${tokenData.email} | CPF: ${tokenData.cpf} | IP: ${tokenData.ip} — Uso exclusivo`;

    for (const page of pages) {
      const { width } = page.getSize();
      
      // Insere o rodapé antifraude bem discreto na parte inferior de cada página
      page.drawText(watermarkText, {
        x: 40,
        y: 20, // Rodapé inferior
        size: 8,
        color: rgb(0.5, 0.5, 0.5), // Cinza discreto
        opacity: 0.6,
      });
    }

    const modifiedPdfBytes = await pdfDoc.save();

    // Retorna o PDF carimbado para o usuário baixar
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${file}-licenciado.pdf"`);
    return res.send(Buffer.from(modifiedPdfBytes));

  } catch (error: any) {
    return res.status(500).send('Erro interno ao processar o download.');
  }
}