import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();
    const { orderId, trackingCode, status, carrier } = payload;

    console.log(`[Dropshipping Fulfillment] Pedido: ${orderId} | Rastreio: ${trackingCode} (${carrier})`);

    // Notificar cliente com link de rastreamento
    return NextResponse.json({ success: true, updated: orderId });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
