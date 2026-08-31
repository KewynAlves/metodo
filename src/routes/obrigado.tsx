import { createFileRoute } from '@tanstack/react-router';
import { useEffect } from 'react';

export const Route = createFileRoute('/obrigado' as any)({
  component: ObrigadoPage,
});

function ObrigadoPage() {
  useEffect(() => {
    document.title = 'Método Sedutor Pro | Pagamento Aprovado';
  }, []);

  return (
    <div style={{ backgroundColor: '#09090b', color: '#d4d4d8', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', padding: '20px' }}>
      <div style={{ maxWidth: '500px', width: '100%', backgroundColor: '#111113', border: '1px solid #27272a', borderRadius: '12px', padding: '40px', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}>
        
        <div style={{ fontSize: '48px', marginBottom: '20px' }}>🎉</div>
        
        <h1 style={{ color: '#ffffff', fontSize: '24px', fontWeight: 'bold', marginBottom: '16px' }}>
          Pagamento Aprovado com Sucesso!
        </h1>
        
        <p style={{ color: '#a1a1aa', fontSize: '15px', lineHeight: '1.6', marginBottom: '30px' }}>
          Parabéns pela aquisição do <strong style={{ color: '#ffffff' }}>Método Sedutor Pro</strong>. O seu link de download exclusivo e seguro foi enviado agora pouco para o seu e-mail de compra.
        </p>

        <div style={{ backgroundColor: '#18181b', border: '1px solid #27272a', padding: '16px', borderRadius: '8px', fontSize: '13px', color: '#a1a1aa', marginBottom: '30px', textAlign: 'left', lineHeight: '1.5' }}>
          💡 <strong style={{ color: '#ffffff' }}>Dica:</strong> Verifique sua caixa de entrada ou spam.<br/><br/>
          Caso ocorra algum atraso ou erro no envio, mande um e-mail para <a href="mailto:contato@sedutor.shop" style={{ color: '#e11d48', textDecoration: 'none', fontWeight: 'bold' }}>contato@sedutor.shop</a> que respondemos em menos de 24h com o envio dos produtos!
        </div>

        <a href="/" style={{ backgroundColor: '#e11d48', color: '#ffffff', padding: '12px 24px', textDecoration: 'none', borderRadius: '6px', fontWeight: 'bold', fontSize: '14px', display: 'inline-block', boxShadow: '0 4px 14px rgba(225, 29, 72, 0.4)' }}>
          Voltar para o Início
        </a>

      </div>
    </div>
  );
}