import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_KV_REST_API_URL!,
  token: process.env.UPSTASH_REDIS_REST_KV_REST_API_TOKEN!,
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const { token } = req.query;

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

    tokenData.downloadsLeft -= 1;

    if (tokenData.downloadsLeft <= 0) {
      await redis.del(`token:${token}`);
    } else {
      await redis.set(`token:${token}`, JSON.stringify(tokenData), { keepTtl: true });
    }

    return res.redirect(302, '/metodo-sedutor.pdf');
  } catch (error) {
    console.error('Erro no download:', error);
    return res.status(500).send('Erro interno ao processar o download.');
  }
}