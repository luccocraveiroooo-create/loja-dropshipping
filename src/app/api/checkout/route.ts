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

    // Access Token oficial do Mercado Pago
    const token =
      process.env.MERCADO_PAGO_ACCESS_TOKEN ||
      "APP_USR-6375878168463894-111913-859ddbad1d822d2e4dabd40c1a39d7e1-3857097075";

    if (token && token.startsWith("APP_USR-")) {
      try {
        const client = new MercadoPagoConfig({ accessToken: token });
        const payment = new Payment(client);

        if (paymentMethod === "pix") {
          const names = (customer.fullName || "Cliente Loja").trim().split(" ");
          const firstName = names[0] || "Cliente";
          const lastName = names.slice(1).join(" ") || "Brasil";
          const cleanCpf = (customer.cpf || "").replace(/\D/g, "");

          const paymentResponse = await payment.create({
            body: {
              transaction_amount: Number(totalToPay.toFixed(2)),
              description: `Pedido PrimeStore - ${items[0]?.title || "Produtos"}`,
              payment_method_id: "pix",
              payer: {
                email: customer.email || "cliente@sualoja.com",
                first_name: firstName,
                last_name: lastName,
                identification: {
                  type: "CPF",
                  number: cleanCpf.length === 11 ? cleanCpf : "19119119100",
                },
              },
            },
          });

          const txData = paymentResponse.point_of_interaction?.transaction_data;

          if (txData?.qr_code) {
            return NextResponse.json({
              success: true,
              isRealPix: true,
              pix: {
                id: paymentResponse.id,
                qrCode: txData.qr_code,
                qrCodeBase64: txData.qr_code_base64,
                ticketUrl: txData.ticket_url,
              },
            });
          }
        }
      } catch (mpError: any) {
        console.error("Erro ao chamar API do Mercado Pago:", mpError);
        // Se a chamada do MP falhar por validação de CPF ou dados, retornamos a mensagem detalhada
        return NextResponse.json(
          {
            error:
              mpError.message ||
              "Erro ao processar com o Mercado Pago. Verifique os dados digitados.",
          },
          { status: 400 }
        );
      }
    }

    // Fallback de demonstração
    const mockPixCode =
      "00020126580014br.gov.bcb.pix0136123e4567-e89b-12d3-a456-4266141740005204000053039865405" +
      totalToPay.toFixed(2) +
      "5802BR5925PRIMESTORE OFICIAL BRASIL6009SAO PAULO62070503***6304ABCD";

    return NextResponse.json({
      success: true,
      mode: "test_mode",
      pix: {
        id: "mock_" + Date.now(),
        qrCode: mockPixCode,
        qrCodeBase64:
          "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
      },
    });
  } catch (error: any) {
    console.error("Erro interno no checkout:", error);
    return NextResponse.json(
      { error: error.message || "Erro interno ao processar pedido" },
      { status: 500 }
    );
  }
}
