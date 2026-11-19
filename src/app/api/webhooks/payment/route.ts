import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";

export async function POST(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const topic = url.searchParams.get("topic") || url.searchParams.get("type");
    const id = url.searchParams.get("id") || url.searchParams.get("data.id");

    console.log(`[Webhook Pagamento] Notificação recebida: ${topic} - ID: ${id}`);

    const token = process.env.MERCADO_PAGO_ACCESS_TOKEN;
    if (!token || token === "APP_USR-seu-token-aqui") {
      return NextResponse.json({ status: "mock_received" });
    }

    if (topic === "payment" && id) {
      const client = new MercadoPagoConfig({ accessToken: token });
      const payment = new Payment(client);
      const paymentInfo = await payment.get({ id });

      if (paymentInfo.status === "approved") {
        console.log(`[Pagamento Aprovado!] Pedido ${id} pronto para envio.`);
        // Aqui você aciona a API do seu fornecedor (ex: CJ Dropshipping) para despachar o produto
      }
    }

    return NextResponse.json({ status: "ok" });
  } catch (err: any) {
    console.error("Erro no webhook de pagamento:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
