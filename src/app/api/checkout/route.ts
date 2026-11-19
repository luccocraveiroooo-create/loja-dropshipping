import { NextRequest, NextResponse } from "next/server";
import { MercadoPagoConfig, Payment } from "mercadopago";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { customer, items, paymentMethod } = body;

    const subtotal = items.reduce(
      (acc: number, item: any) => acc + item.price * item.quantity,
      0
    );

    const totalToPay = paymentMethod === "pix" ? subtotal * 0.95 : subtotal;

    // Se houver Access Token do Mercado Pago no ambiente, processamos com a API real
    const token = process.env.MERCADO_PAGO_ACCESS_TOKEN;

    if (token && token !== "APP_USR-seu-token-aqui") {
      const client = new MercadoPagoConfig({ accessToken: token });
      const payment = new Payment(client);

      if (paymentMethod === "pix") {
        const paymentResponse = await payment.create({
          body: {
            transaction_amount: Number(totalToPay.toFixed(2)),
            description: `Pedido de ${customer.fullName}`,
            payment_method_id: "pix",
            payer: {
              email: customer.email,
              first_name: customer.fullName.split(" ")[0] || "Cliente",
              last_name: customer.fullName.split(" ").slice(1).join(" ") || "Store",
              identification: {
                type: "CPF",
                number: customer.cpf.replace(/\D/g, ""),
              },
            },
          },
        });

        const txData = paymentResponse.point_of_interaction?.transaction_data;

        return NextResponse.json({
          success: true,
          pix: {
            id: paymentResponse.id,
            qrCode: txData?.qr_code,
            qrCodeBase64: txData?.qr_code_base64,
            ticketUrl: txData?.ticket_url,
          },
        });
      }
    }

    // MOCK / Modo de Testes local (caso ainda não tenha inserido o token do Mercado Pago)
    // Isso garante que você consiga testar o fluxo de compra de ponta a ponta sem erros
    const mockPixCode =
      "00020126580014br.gov.bcb.pix0136123e4567-e89b-12d3-a456-4266141740005204000053039865405" +
      totalToPay.toFixed(2) +
      "5802BR5925PRIMESTORE OFICIAL BRASIL6009SAO PAULO62070503***6304ABCD";

    return NextResponse.json({
      success: true,
      mode: "test_mode",
      message:
        "Modo de demonstração: Insira seu MERCADO_PAGO_ACCESS_TOKEN no .env.local para PIX real bancário.",
      pix: {
        id: "mock_order_" + Date.now(),
        qrCode: mockPixCode,
        qrCodeBase64:
          "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
        ticketUrl: "https://www.mercadopago.com.br",
      },
    });
  } catch (error: any) {
    console.error("Erro no processamento do checkout:", error);
    return NextResponse.json(
      { error: error.message || "Erro interno ao processar pedido" },
      { status: 500 }
    );
  }
}
