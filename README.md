# 🚀 PrimeStore - Loja Virtual de Dropshipping de Alta Conversão

Loja virtual completa, moderna e ultra veloz construída com **Next.js 14**, **Tailwind CSS**, **TypeScript** e integração nativa para **PIX Transparente** (Mercado Pago).

---

## 📁 O Que Já Foi Criado

- **Página Inicial (Home):**
  - Hero Banner com proposta de valor e CTA imediato.
  - Vitrine de produtos vencedores com cálculo de desconto percentual automático.
  - Prova social com avaliações reais e fotos de clientes satisfeitos.
  - Selos de garantia, envio blindado e suporte.

- **Página de Produto (PDP):**
  - Galeria de imagens dinâmica com zoom.
  - Alerta de escassez em tempo real (*"Apenas X unidades restantes"*).
  - Seletor de cores e variações.
  - Destaque para parcelamento e 5% de desconto no PIX.
  - **Sticky Buy Bar:** Botão fixo no rodapé para compras pelo celular (aumenta em até 35% as conversões mobile).

- **Carrinho Lateral Fluido (Slide-over Cart):**
  - Barra de progresso para **Frete Grátis** (induz o cliente a comprar mais para bater a meta).
  - Controle de quantidade e remoção instantânea sem recarregar a página.

- **Checkout Transparente em 1 Passo:**
  - Layout focado em conversão, eliminando distrações.
  - Coleta de dados essenciais (Nome, CPF, WhatsApp, Endereço).
  - **PIX Instantâneo:** Geração de QR Code e Copia e Cola diretamente na tela do cliente.

- **Backend & Webhooks:**
  - Rota de checkout integrada ao Mercado Pago (`/api/checkout`).
  - Webhook de confirmação automática de pagamento (`/api/webhooks/payment`).
  - Webhook para fornecedor de dropshipping (`/api/webhooks/supplier`).

---

## ⚡ Como Rodar Localmente no seu Computador

### 1. Pré-requisito: Node.js
Se ainda não tiver o Node.js instalado no seu Windows:
1. Baixe a versão LTS no site oficial: [https://nodejs.org/](https://nodejs.org/)
2. Avance a instalação padrão ("Next, Next, Finish").

### 2. Instalar as dependências e iniciar a loja:
Abra o terminal dentro da pasta `loja-dropshipping` e execute:
```bash
npm install
npm run dev
```

Abra o navegador no endereço: **`http://localhost:3000`**

---

## 💳 Como Ativar o PIX Real do Mercado Pago

1. Acesse o portal do desenvolvedor do Mercado Pago: [https://www.mercadopago.com.br/developers](https://www.mercadopago.com.br/developers)
2. Crie uma aplicação (ou use suas credenciais existentes).
3. Copie o seu **Access Token** (de teste ou produção).
4. Abra o arquivo `.env.local` na pasta `loja-dropshipping` e cole o seu token:
```env
MERCADO_PAGO_ACCESS_TOKEN="APP_USR-seu-token-aqui"
```
Pronto! Todos os pagamentos via PIX gerarão o QR Code real do Banco Central e o dinheiro cairá diretamente na sua conta do Mercado Pago.

---

## 🌐 Como Colocar a Loja no Ar para o Mundo Todo (Grátis em 3 Minutos)

Você não precisa pagar hospedagem cara:
1. Crie uma conta gratuita na [Vercel](https://vercel.com).
2. Suba a pasta deste projeto no seu [GitHub](https://github.com).
3. Na Vercel, clique em **"Add New Project"** e selecione o repositório da sua loja.
4. Adicione as variáveis de ambiente do `.env.local` e clique em **"Deploy"**.
5. Em menos de 2 minutos sua loja estará no ar em um link seguro com HTTPS (ex: `sualoja.vercel.app` ou seu domínio próprio `.com.br`).
