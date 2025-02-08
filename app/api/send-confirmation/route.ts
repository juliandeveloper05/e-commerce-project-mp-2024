import { Resend } from 'resend';
import { NextResponse } from 'next/server';

interface OrderItem {
    name: string;
    size: string;
    quantity: number;
    price: number;
}

interface CustomerInfo {
    name: string;
    address: string;
    phone: string;
    comments?: string;
}

interface OrderDetails {
    orderNumber: string;
    customerInfo: CustomerInfo;
    items: OrderItem[];
    total: number;
}

interface EmailRequestBody {
    email: string;
    orderDetails: OrderDetails;
}

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request): Promise<NextResponse> {
    try {
        const { email, orderDetails }: EmailRequestBody = await req.json();

        const itemsList = orderDetails.items
            .map(item => `
                <tr>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
                        ${item.name} (Talla: ${item.size})
                    </td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; text-align: center;">
                        ${item.quantity}
                    </td>
                    <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; text-align: right;">
                        $${item.price * item.quantity}
                    </td>
                </tr>
            `)
            .join('');

        const response = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: process.env.NODE_ENV === 'development' 
                ? 'juliansoto.dev@gmail.com' 
                : email,
            subject: `Pedido Recibido #${orderDetails.orderNumber}`,
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h1 style="color: #9333ea; margin: 0;">¡Gracias por tu compra!</h1>
                        <p style="color: #6b7280; margin-top: 10px;">
                            Tu pedido #${orderDetails.orderNumber} ha sido recibido
                        </p>
                    </div>

                    <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
                        <h2 style="color: #1f2937; margin-top: 0;">Detalles de envío</h2>
                        <p style="margin: 5px 0;"><strong>Nombre:</strong> ${orderDetails.customerInfo.name}</p>
                        <p style="margin: 5px 0;"><strong>Dirección:</strong> ${orderDetails.customerInfo.address}</p>
                        <p style="margin: 5px 0;"><strong>Teléfono:</strong> ${orderDetails.customerInfo.phone}</p>
                        ${orderDetails.customerInfo.comments ? `
                            <p style="margin: 5px 0;"><strong>Comentarios:</strong> ${orderDetails.customerInfo.comments}</p>
                        ` : ''}
                    </div>

                    <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
                        <thead>
                            <tr style="border-bottom: 2px solid #e5e7eb;">
                                <th style="text-align: left; padding: 12px 0;">Producto</th>
                                <th style="text-align: center; padding: 12px 0;">Cantidad</th>
                                <th style="text-align: right; padding: 12px 0;">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${itemsList}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="2" style="padding: 12px 0; text-align: right;">
                                    <strong>Envío:</strong>
                                </td>
                                <td style="padding: 12px 0; text-align: right; color: #059669;">
                                    Gratis
                                </td>
                            </tr>
                            <tr>
                                <td colspan="2" style="padding: 12px 0; text-align: right;">
                                    <strong>Total:</strong>
                                </td>
                                <td style="padding: 12px 0; text-align: right; font-size: 1.25em; font-weight: bold;">
                                    $${orderDetails.total}
                                </td>
                            </tr>
                        </tfoot>
                    </table>

                    <div style="text-align: center; color: #6b7280; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                        <p style="margin: 5px 0;">
                            Un representante se pondrá en contacto contigo por WhatsApp para coordinar el pago
                        </p>
                        <p style="margin: 5px 0;">
                            ¡Gracias por confiar en Maria Pancha!
                        </p>
                    </div>
                </div>
            `
        });

        console.log('Email sent:', response);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ error: 'Error sending email' }, { status: 500 });
    }
}
