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

  try {
    const payload = req.body || {};
    
    // Identifica o evento
    const event = payload.event || payload.status || payload.type || 'paid';
    
    // Pega o e-mail do cliente
    const customerEmail = 
      payload.customer?.email || 
      payload.email || 
      payload.data?.customer?.email || 
      payload.data?.email ||
      'metodosedutor1@gmail.com';

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

    if (event === 'paid' || event === 'approved' || event === 'PAID' === event || event === 'purchase_approved') {
      
      // Descobre quais produtos foram comprados (Varre itens ou produto único)
      const items = payload.items || payload.data?.items || [];
      const productName = payload.product?.name || payload.data?.product?.name || '';
      
      // Verifica se comprou o Timidez Zero ou Método Sedutor com base no nome/itens
      const hasTimidez = items.some((i: any) => i.name?.toLowerCase().includes('timidez')) || productName.toLowerCase().includes('timidez');
      const hasSedutor = items.some((i: any) => i.name?.toLowerCase().includes('sedutor')) || productName.toLowerCase().includes('sedutor') || items.length === 0;

      const token = crypto.randomUUID();

      // Salvamos no Redis quais produtos esse token tem direito de baixar
      await redis.set(`token:${token}`, JSON.stringify({
        email: customerEmail,
        hasSedutor: true, // Sempre libera o principal por segurança se passou aqui
        hasTimidez: hasTimidez, // Libera o timidez se comprou o order bump
        downloadsLeft: 3,
        createdAt: new Date().toISOString()
      }), { ex: 604800 });

      await redis.set(`email:${customerEmail}`, token, { ex: 604800 });

      const downloadLink = `https://www.sedutor.shop/api/download?token=${token}`;

      // Texto descritivo dependendo se levou o combo ou só um
      const produtosTexto = hasTimidez 
        ? 'Método Sedutor Pro + Bônus Timidez Zero' 
        : 'Método Sedutor Pro';

      await resend.emails.send({
        from: 'Método Sedutor <contato@sedutor.shop>',
        to: [customerEmail],
        subject: `Seu acesso exclusivo ao ${produtosTexto} chegou!`,
        text: `Olá! Parabéns pela aquisição. O seu acesso foi liberado com sucesso. Baixe seus materiais no link: ${downloadLink}. Este link é exclusivo e permite até 3 downloads.`,
        html: `
          <div style="background-color: #09090b; padding: 40px 15px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; min-height: 100%;">
            <div style="max-width: 540px; margin: 0 auto; background-color: #111113; border-radius: 12px; overflow: hidden; border: 1px solid #27272a; box-shadow: 0 10px 25px rgba(0,0,0,0.5);">
              
              <div style="background-color: #18181b; padding: 28px 24px; text-align: center; border-bottom: 1px solid #27272a;">
                <span style="color: #ffffff; font-size: 20px; font-weight: 800; letter-spacing: 2px; text-transform: uppercase;">MÉTODO SEDUTOR PRO</span>
              </div>

              <div style="padding: 36px 28px; color: #d4d4d8; line-height: 1.6;">
                <h2 style="margin-top: 0; color: #ffffff; font-size: 22px; font-weight: 700; text-align: center;">Seu acesso está liberado! 🔥</h2>
                <p style="margin: 20px 0; color: #a1a1aa; font-size: 15px; text-align: center;">
                  Parabéns pela decisão! Seus e-books digitais (<strong style="color: #ffffff;">${produtosTexto}</strong>) já estão prontos para serem baixados.
                </p>

                <div style="text-align: center; margin: 36px 0;">
                  <a href="${downloadLink}" style="background-color: #e11d48; color: #ffffff; padding: 16px 36px; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 16px; display: inline-block; box-shadow: 0 4px 14px rgba(225, 29, 72, 0.4);">
                    BAIXAR SEUS E-BOOKS EM PDF →
                  </a>
                </div>

                <div style="background-color: #18181b; border: 1px solid #27272a; padding: 20px; border-radius: 8px; font-size: 13px; color: #a1a1aa; margin: 28px 0;">
                  <strong style="color: #ffffff; font-size: 14px; display: block; margin-bottom: 8px;">📌 Informações do seu link seguro:</strong>
                  <ul style="margin: 0; padding-left: 18px; line-height: 1.8;">
                    <li>Link exclusivo associado ao seu e-mail de compra.</li>
                    <li>Permite até <strong style="color: #ffffff;">3 downloads</strong>.</li>
                    <li>Válido por <strong style="color: #ffffff;">7 dias</strong>.</li>
                  </ul>
                </div>

                <hr style="border: none; border-top: 1px solid #27272a; margin: 32px 0 24px 0;" />

                <p style="font-size: 13px; color: #71717a; text-align: center; margin: 0;">
                  Precisa de ajuda?<br />
                  Mande um e-mail para <strong style="color: #a1a1aa;">contato@sedutor.shop</strong> que respondemos em menos de 24h.
                </p>
              </div>

            </div>
          </div>
        `
      });

      return res.status(200).json({ success: true, token, hasTimidez });
    }

    return res.status(200).json({ message: 'Evento recebido sem ação necessária' });
  } catch (error: any) {
    console.error('Erro no Webhook:', error);
    return res.status(500).json({ error: error.message });
  }
}