import type { VercelRequest, VercelResponse } from '@vercel/node';
import { Redis } from '@upstash/redis';
import { Resend } from 'resend';
import crypto from 'crypto';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_KV_REST_API_URL!,
  token: process.env.UPSTASH_REDIS_REST_KV_REST_API_TOKEN!,
});

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Método não permitido' });
  }

  const secretHeader = req.headers['x-cakto-secret'] || req.query.secret;
  if (process.env.WEBHOOK_SECRET && secretHeader !== process.env.WEBHOOK_SECRET) {
    return res.status(401).json({ error: 'Não autorizado' });
  }

  try {
    const payload = req.body;
    const event = payload.event || payload.status;
    const customerEmail = payload.customer?.email || payload.email;

    if (!customerEmail) {
      return res.status(400).json({ error: 'E-mail do cliente não encontrado no payload' });
    }

    if (event === 'refund' || event === 'chargeback' || event === 'REFUNDED') {
      const activeToken = await redis.get(`email:${customerEmail}`);
      if (activeToken) {
        await redis.del(`token:${activeToken}`);
        await redis.del(`email:${customerEmail}`);
      }
      return res.status(200).json({ message: 'Acesso revogado com sucesso' });
    }

    if (event === 'paid' || event === 'approved' || event === 'PAID') {
      const token = crypto.randomUUID();

      await redis.set(`token:${token}`, JSON.stringify({
        email: customerEmail,
        downloadsLeft: 3,
        createdAt: new Date().toISOString()
      }), { ex: 604800 });

      await redis.set(`email:${customerEmail}`, token, { ex: 604800 });

      const downloadLink = `https://www.sedutor.shop/api/download?token=${token}`;

      await resend.emails.send({
        from: 'Método Sedutor <contato@sedutor.shop>',
        to: [customerEmail],
        subject: 'Seu acesso ao Método Sedutor Pro',
        html: `
          <h2>Obrigado pela compra!</h2>
          <p>Clique no link abaixo para baixar seu e-book de forma segura:</p>
          <p><a href="${downloadLink}" style="background:#e11d48; color:#fff; padding:12px 24px; text-decoration:none; border-radius:5px; font-weight:bold; display:inline-block;">Baixar E-book PDF</a></p>
          <p><small>Este link é individual e permite até 3 downloads.</small></p>
        `
      });

      return res.status(200).json({ success: true, token });
    }

    return res.status(200).json({ message: 'Evento recebido sem ação necessária' });
  } catch (error: any) {
    console.error('Erro no Webhook:', error);
    return res.status(500).json({ error: error.message });
  }
}