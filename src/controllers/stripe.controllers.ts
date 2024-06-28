import { Request, Response } from "express";
import Stripe from "stripe";
import appConfig from "../config";

if (!appConfig.stripe.testSecretKey) {
  throw new Error("Stripe test secret key is not defined in the configuration.");
}

const stripe = new Stripe(appConfig.stripe.testSecretKey);

const createStripeSession = async (cartItems: ICartItem[], userId: string): Promise<Stripe.Checkout.Session> => {
  const items = cartItems.map((item: ICartItem) => ({
    discoTicketId: item.discoTicketId ?? null,
    comboId: item.comboId ?? null,
    quantity: item.quantity,
    collaborator: item.collaborator ?? null,
    expDate: item.expDate ?? null,
  }));

  return await stripe.checkout.sessions.create({
    line_items: cartItems.map((item) => {
      const priceData: any = {
        currency: "usd",
        product_data: {
          name: item.comboId ? `${item.category} combo` : `${item.category} ticket`,
          images: item.comboId ? [item.comboImage] : item.imagesTicket ? [encodeURI(item.imagesTicket)] : [],
          metadata: {
            comboId: item.comboId ?? null,
            discoTicketId: item?.discoTicketId ?? null,
            expDate: item.expDate ?? null,
          },
        },
        unit_amount: Number(item.price) * 100,
      };

      const description = item.comboId ? item.comboDescription : item.ticketDescription;
      if (description) {
        priceData.product_data["description"] = description;
      }

      return { price_data: priceData, quantity: item.quantity };
    }),
    metadata: {
      userId,
      discoId: cartItems[0].discoId,
      collaborator: cartItems[0].collaborator,
      items: JSON.stringify(items),
    },
    mode: "payment",
    payment_method_types: ["card"],
    success_url: `${process.env.URL_ALLOWED_CLIENT_PRO}/event/${cartItems[0].discoSlug}/success`,
    cancel_url: `${process.env.URL_ALLOWED_CLIENT_PRO}/event/${cartItems[0].discoSlug}/cancel`,
    payment_intent_data: {
      description: `MyEvents payment from ${cartItems[0].discoSlug}`,
    },
  });
};

export const checkout = async (req: Request, res: Response) => {
  try {
    const { cartItems }: IReservation = req.body;
    const { userId } = req.params;

    if (!cartItems || !userId) {
      return res.status(400).json({ message: "Invalid input" });
    }

    const session = await createStripeSession(cartItems, userId);
    return res.status(200).json(session);
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export interface IReservation {
  cartItems: ICartItem[];
}

interface ICartItem {
  discoId: string;
  discoTicketId: string | null;
  comboId: string | null;
  quantity: number;
  category: string;
  comboImage: string;
  imagesTicket: string;
  comboDescription: string;
  ticketDescription: string;
  price: number;
  discoSlug: string;
  collaborator: string | null;
  expDate: string | null;
}
