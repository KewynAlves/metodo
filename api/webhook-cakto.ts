import { Resend } from 'resend';
import { Redis } from '@upstash/redis';

const resend = new Resend(process.env.RESEND_API_KEY);
const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const eventData = req.body;
    const event = eventData.event;
    const customerEmail = eventData.customer?.email;

    if (!customerEmail) {
      return res.status(400).json({ error: 'E-mail do cliente não encontrado no payload' });
    }

    // 1. TRATAMENTO DE REEMBOLSO / CHARGEBACK (Revogação total de acesso)
    if (event === 'refund' || event === 'chargeback' || event === 'REFUNDED' || event === 'CHARGEBACK') {
      // Apaga o registro principal do e-mail
      const activeToken = await redis.get(`email:${customerEmail}`);
      if (activeToken) {
        await redis.del(`token:${activeToken}`);
        await redis.del(`email:${customerEmail}`);
      }

      // Varredura completa para limpar qualquer outro token antigo ou duplicado desse e-mail
      const keys = await redis.keys(`token:*`);
      for (const key of keys) {
        const tokenDataStr = await redis.get(key);
        if (tokenDataStr) {
          try {
            const data = typeof tokenDataStr === 'string' ? JSON.parse(tokenDataStr) : tokenDataStr;
            if (data.email === customerEmail) {
              await redis.del(key);
            }
          } catch (e) {
            // Ignora erro de parse
          }
        }
      }

      return res.status(200).json({ message: 'Acesso revogado com sucesso para todos os tokens do e-mail' });
    }

    // 2. TRATAMENTO DE COMPRA APROVADA
    if (event === 'paid' || event === 'approved' || event === 'ORDER_APPROVED') {
      // Identifica os produtos comprados (suporta formato de array de items ou produto único)
      const items = eventData.items || [];
      const productName = eventData.product?.name || '';
      
      const hasSedutor = items.some(item => item.name?.toLowerCase().includes('método sedutor')) || 
                         productName.toLowerCase().includes('método sedutor');
                         
      const hasTimidez = items.some(item => item.name?.toLowerCase().includes('timidez')) || 
                         productName.toLowerCase().includes('timidez');

      // Se por acaso o webhook vier vazio de itens mas disparou para o produto principal
      const isCombo = hasSedutor && hasTimidez;
      const isOnlySedutor = hasSedutor && !hasTimidez;
      const isOnlyTimidez = !hasSedutor && hasTimidez;

      // Gera um token único seguro
      const token = Math.random().toString(36).substring(2) + Date.now().toString(36);

      // Salva no Redis com limite de 6 downloads totais e validade de 7 dias (604800 segundos)
      await redis.set(`token:${token}`, JSON.stringify({
        email: customerEmail,
        hasSedutor: true, // Sempre libera o principal se passou por aqui
        hasTimidez: isCombo || isOnlyTimidez,
        downloadsLeft: 6,
        createdAt: new Date().toISOString()
      }), { ex: 604800 });

      // Associa o e-mail ao token ativo
      await redis.set(`email:${customerEmail}`, token, { ex: 604800 });

      // Monta os links seguros para cada arquivo
      const linkSedutor = `https://www.sedutor.shop/api/download?token=${token}&file=sedutor`;
      const linkTimidez = `https://www.sedutor.shop/api/download?token=${token}&file=timidez`;

      // Monta os botões dinamicamente no HTML do e-mail conforme o que o cliente comprou
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
        // Padrão: Apenas Método Sedutor
        productsTitle = 'Método Sedutor Pro';
        buttonsHtml = `
          <div style="text-align: center; margin: 32px 0;">
            <a href="${linkSedutor}" style="background-color: #e11d48; color: #ffffff; padding: 14px 28px; border-radius: 6px; text-decoration: none; font-weight: bold; display: inline-block; font-size: 15px; box-shadow: 0 4px 12px rgba(225, 29, 72, 0.3);">BAIXAR MÉTODO SEDUTOR PRO →</a>
          </div>
        `;
      }

      // Dispara o e-mail via Resend com layout escuro profissional
      await resend.emails.send({
        from: 'Método Sedutor <contato@sedutor.shop>',
        to: [customerEmail],
        subject: 'Seu acesso está liberado! 🚀',
        html: `
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
        `
      });

      return res.status(200).json({ message: 'Webhook processado com sucesso' });
    }

    return res.status(200).json({ message: 'Evento ignorado' });
  } catch (error) {
    console.error('Erro no webhook:', error);
    return res.status(500).json({ error: 'Erro interno ao processar webhook' });
  }
}