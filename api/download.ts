import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Redis } from '@upstash/redis';
import fs from 'fs';
import path from 'path';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_KV_REST_API_URL!,
  token: process.env.UPSTASH_REDIS_REST_KV_REST_API_TOKEN!,
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { token, file } = req.query;

  if (!token || typeof token !== 'string') {
    return res.status(400).send('Token de download ausente ou inválido.');
  }

  try {
    const tokenDataRaw = await redis.get(`token:${token}`);

    if (!tokenDataRaw) {
      return res.status(403).send('Este link de download expirou, foi cancelado ou não existe.');
    }

    const tokenData = typeof tokenDataRaw === 'string' ? JSON.parse(tokenDataRaw) : tokenDataRaw;

    if (tokenData.downloadsLeft <= 0) {
      return res.status(403).send('Você atingiu o limite máximo de downloads permitidos para este link.');
    }

    // Controla o consumo de downloads
    tokenData.downloadsLeft -= 1;

    if (tokenData.downloadsLeft <= 0) {
      await redis.del(`token:${token}`);
    } else {
      await redis.set(`token:${token}`, JSON.stringify(tokenData), { keepTtl: true });
    }

    // Define qual arquivo enviar com base no parâmetro e permissão
    const fileName = (file === 'timidez' && tokenData.hasTimidez) 
      ? 'metodo-timidez-zero.pdf' 
      : 'metodo-sedutor.pdf';

    // Caminho para o arquivo na pasta public do projeto
    const filePath = path.join(process.cwd(), 'public', fileName);

    if (!fs.existsSync(filePath)) {
      return res.status(404).send('Arquivo não encontrado no servidor.');
    }

    // Configura os headers para forçar o download seguro e mascarar a URL
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);

    const fileStream = fs.createReadStream(filePath);
    return fileStream.pipe(res);

  } catch (error) {
    console.error('Erro no download:', error);
    return res.status(500).send('Erro interno ao processar o download.');
  }
}