import { Redis } from '@upstash/redis';
import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Usando os nomes exatos das variáveis do seu painel da Vercel
    const redisUrl = process.env.UPSTASH_REDIS_REST_KV_REST_API_URL;
    const redisToken = process.env.UPSTASH_REDIS_REST_KV_REST_API_TOKEN;
    const resendKey = process.env.RESEND_API_KEY;

    if (!redisUrl || !redisToken) {
      return res.status(500).json({ error: 'Configuração ausente', details: 'UPSTASH_REDIS_REST_KV_REST_API_URL ou TOKEN não definidos' });
    }

    const redis = new Redis({
      url: redisUrl,
      token: redisToken,
    });

    const eventData = req.body || {};
    const event = eventData.event;
    const customerEmail = eventData.customer?.email || eventData.email || 'metodosedutor1@gmail.com';

    if (!customerEmail) {
      return res.status(400).json({ error: 'E-mail do cliente não encontrado no payload' });
    }

    // 1. REEMBOLSO / CHARGEBACK
    if (event === 'refund' || event === 'chargeback' || event === 'REFUNDED' || event === 'CHARGEBACK') {
      try {
        const activeToken = await redis.get(`email:${customerEmail}`);
        if (activeToken) {
          await redis.del(`token:${activeToken}`);
          await redis.del(`email:${customerEmail}`);
        }

        const keys = await redis.keys(`token:*`);
        if (keys && Array.isArray(keys)) {
          for (const key of keys) {
            const tokenDataStr = await redis.get(key);
            if (tokenDataStr) {
              const data: any = typeof tokenDataStr === 'string' ? JSON.parse(tokenDataStr) : tokenDataStr;
              if (data && data.email === customerEmail) {
                await redis.del(key);
              }
            }
          }
        }
      } catch (redisError: any) {
        console.error('Erro no Redis durante reembolso:', redisError?.message);
      }

      return res.status(200).json({ message: 'Acesso revogado com sucesso' });
    }

    // 2. COMPRA APROVADA
    if (event === 'paid' || event === 'approved' || event === 'ORDER_APPROVED') {
      const items: any[] = eventData.items || [];
      const productName = eventData.product?.name || '';
      
      const hasSedutor = items.some((item: any) => item.name?.toLowerCase().includes('método sedutor')) || 
                         productName.toLowerCase().includes('método sedutor');
                         
      const hasTimidez = items.some((item: any) => item.name?.toLowerCase().includes('timidez')) || 
                         productName.toLowerCase().includes('timidez');

      const isCombo = hasSedutor && hasTimidez;
      const isOnlyTimidez = !hasSedutor && hasTimidez;

      const token = Math.random().toString(36).substring(2) + Date.now().toString(36);

      await redis.set(`token:${token}`, JSON.stringify({
        email: customerEmail,
        hasSedutor: true,
        hasTimidez: isCombo || isOnlyTimidez,
        downloadsLeft: 6,
        createdAt: new Date().toISOString()
      }), { ex: 604800 });

      await redis.set(`email:${customerEmail}`, token, { ex: 604800 });

      const linkSedutor = `https://www.sedutor.shop/api/download?token=${token}&file=sedutor`;
      const linkTimidez = `https://www.sedutor.shop/api/download?token=${token}&file=timidez`;

      let buttonsHtml = '';
      let productsTitle = '';

      if (isCombo) {
        productsTitle = 'Método Sedutor Pro + Bônus Timidez Zero';
        buttonsHtml = `
          <div style="text-align: center; margin: 32px 0;">
            <a href="${linkSedutor}" style="background-color: #e11d48; color: #ffffff; padding: 14px 28px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-block; font-size: 15px; margin-bottom: 12px; box-shadow: 0 4px 12px rgba(225, 29, 72, 0.3);">BAIXAR MÉTODO SEDUTOR PRO →</a>
          </div>
          <div style="text-align: center; margin: 16px 0 32px 0;">
            <a href="${linkTimidez}" style="background-color: #27272a; color: #ffffff; border: 1px solid #3f3f46; padding: 14px 28px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-block; font-size: 15px;">BAIXAR BÔNUS: TIMIDEZ ZERO (PDF) →</a>
          </div>
        `;
      } else if (isOnlyTimidez) {
        productsTitle = 'Bônus Timidez Zero';
        buttonsHtml = `
          <div style="text-align: center; margin: 32px 0;">
            <a href="${linkTimidez}" style="background-color: #e11d48; color: #ffffff; padding: 14px 28px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-block; font-size: 15px; box-shadow: 0 4px 12px rgba(225, 29, 72, 0.3);">BAIXAR BÔNUS: TIMIDEZ ZERO (PDF) →</a>
          </div>
        `;
      } else {
        productsTitle = 'Método Sedutor Pro';
        buttonsHtml = `
          <div style="text-align: center; margin: 32px 0;">
            <a href="${linkSedutor}" style="background-color: #e11d48; color: #ffffff; padding: 14px 28px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-block; font-size: 15px; box-shadow: 0 4px 12px rgba(225, 29, 72, 0.3);">BAIXAR MÉTODO SEDUTOR PRO →</a>
          </div>
        `;
      }

      const htmlContent = `
        <div style="background-color: #09090b; color: #f4f4f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 40px 20px;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #121215; border: 1px solid #27272a; border-radius: 12px; padding: 32px;">
            <h1 style="color: #ffffff; font-size: 22px; text-align: center; margin-bottom: 24px; letter-spacing: -0.5px;">MÉTODO SEDUTOR PRO</h1>
            <p style="font-size: 16px; line-height: 1.6; color: #d4d4d8; text-align: center;">
              Parabéns pela decisão! Seus e-books digitais (<strong style="color: #ffffff;">${productsTitle}</strong>) já estão prontos para serem baixados.
            </p>
            ${buttonsHtml}
            <div style="background-color: #18181b; border: 1px solid #27272a; padding: 20px; border-radius: 8px; font-size: 13px; color: #a1a1aa; margin: 28px 0;">
              <strong style="color: #ffffff; font-size: 14px; display: block; margin-bottom: 8px;">📌 Informações dos seus links seguros:</strong>
              <ul style="margin: 0; padding-left: 18px; line-height: 1.8;">
                <li>Links exclusivos associados ao seu e-mail de compra.</li>
                <li>O pacote permite até <strong style="color: #ffffff;">3 downloads totais</strong> entre os materiais.</li>
                <li>Válidos por <strong style="color: #ffffff;">7 dias</strong>.</li>
              </ul>
            </div>
            <hr style="border: none; border-top: 1px solid #27272a; margin: 32px 0;" />
            <p style="font-size: 12px; color: #71717a; text-align: center; margin: 0;">
              Precisa de ajuda?<br>
              Mande um e-mail para <a href="mailto:contato@sedutor.shop" style="color: #a1a1aa; text-decoration: underline;">contato@sedutor.shop</a> que respondemos em menos de 24h.
            </p>
          </div>
        </div>
      `;

      if (resendKey) {
        try {
          await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${resendKey}`
            },
            body: JSON.stringify({
              from: 'Método Sedutor <contato@sedutor.shop>',
              to: [customerEmail],
              subject: 'Seu acesso está liberado! 🚀',
              html: htmlContent
            })
          });
        } catch (emailErr) {
          console.error('Falha ao enviar e-mail, mas o acesso foi liberado:', emailErr);
        }
      }

      return res.status(200).json({ message: 'Webhook processado com sucesso' });
    }

    return res.status(200).json({ message: 'Evento ignorado' });
  } catch (error: any) {
    console.error('Erro crítico no webhook:', error);
    return res.status(500).json({ 
      error: 'Erro interno ao processar webhook', 
      details: error?.message || String(error),
      stack: error?.stack || ''
    });
  }
}