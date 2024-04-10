import { Request, Response } from "express";
import Stripe from "stripe";

const stripe = new Stripe(
  "sk_test_51Oph0tEfSxxpiCNZINaZzbhTwf2JYcHu9dDjGndeQFGB2zInKpGeWPk1ufEdPLhBaS5RMD1MrmsF1T9iIFtwhQ5N00n2Agycgd"
);

export const checkout = async (req: Request, res: Response) => {
  try {
    const cartItems: IReservation[] = req.body;
    const { userId } = req.params;

    const items = cartItems.map((item: IReservation) => {
      return {
        discoTicketId: item.discoTicketId ?? null,
        comboId: item.comboId ?? null,
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      line_items: cartItems.map((item) => {
        if (item.comboId) {
          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: `${item.category} combo`,
                images: [encodeURI(item.imagesCombo)],
                description: item.comboDescription ?? "no description provided",
                metadata: {
                  comboId: item.comboId,
                  discoTicketId: item.discoTicketId,
                },
              },
              unit_amount: Number(item.price) * 100,
            },
            quantity: item.quantity,
          };
        } else {
          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: `${item.category} ticket`,
                images: item?.imagesTicket ? [encodeURI(item?.imagesTicket)] : [],
                description: item.ticketDescription ? item.ticketDescription : "no description provided",
                metadata: {
                  comboId: item.comboId ?? null,
                  discoTicketId: item.discoTicketId,
                },
              },
              unit_amount: Number(item.price) * 100,
            },
            quantity: item.quantity,
          };
        }
      }),
      metadata: {
        userId: userId,
        discoId: cartItems[0].discoId,
        items: JSON.stringify(items),
      },
      mode: "payment",
      payment_method_types: ["card"],
      success_url: `http://localhost:3000/event/${cartItems[0].discoSlug}/success`,
      cancel_url: `http://localhost:3000/event/${cartItems[0].discoSlug}/cancel`,
    });

    return res.status(200).json(session);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export interface IReservation {
  discoId: string;
  discoTicketId: string | null;
  comboId: string | null;
  quantity: number;
  category: string;
  imagesCombo: string;
  imagesTicket: string;
  comboDescription: string;
  ticketDescription: string;
  price: number;
  discoSlug: string;
}
