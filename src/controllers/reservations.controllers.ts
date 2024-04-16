import { Request, Response } from "express";
import Reservation from "../models/Reservation";
import TicketsReservation from "../models/TicketsReservation";
import DiscoTicket from "../models/DiscoTicket";
import Disco from "../models/Disco";
import User from "../models/User";
import ComboReservation from "../models/ComboReservation";
import Combo from "../models/Combo";
import Companion from "../models/Companions";

export const createReservation = async (req: Request, res: Response) => {
  try {
    const { userId, cartItems, companions }: IReservation = req.body;

    const newReservation: any = await Reservation.create({
      userId: userId,
      discoId: cartItems[0].discoId,
      colaborator: cartItems[0].colaborator,
    });

    const ticketsReservations = await Promise.all(
      cartItems.map(async (item: ICartItem) => {
        if (item.discoTicketId) {
          const newTicketReservation: any = await TicketsReservation.create({
            reservationId: newReservation.id,
            discoTicketId: item.discoTicketId,
            quantity: item.quantity,
          });

          const companionPromises = companions.map((comp) =>
            Companion.create({
              ticketReservationId: newTicketReservation.id,
              firstName: comp.firstName,
              lastName: comp.lastName,
            })
          );

          // Wait for all companion creations to finish before continuing
          await Promise.all(companionPromises);

          const discoTicket: any = await DiscoTicket.findOne({ where: { id: item.discoTicketId } });

          discoTicket.countInStock = Number(discoTicket.countInStock) - Number(item.quantity);

          const newDiscoTicket = await discoTicket.save();
          return { newTicketReservation, newDiscoTicket };
        } else {
          const newComboReservation: any = await ComboReservation.create({
            reservationId: newReservation.id,
            comboId: item.comboId,
            quantity: item.quantity,
          });
          const combo: any = await Combo.findOne({ where: { id: item.comboId } });

          combo.countInStock = Number(combo.countInStock) - Number(item.quantity);

          const newCombo = await combo.save();
          return { newComboReservation, newCombo };
        }
      })
    );

    return res.status(200).json({ newReservation, ticketsReservations });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getReservationsByUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const reservations = await Reservation.findAll({
      where: { userId: userId },
      include: [
        {
          model: TicketsReservation,
          include: [{ model: DiscoTicket, include: [{ model: Disco }] }, { model: Companion }],
        },
        { model: ComboReservation, include: [{ model: Combo, include: [{ model: Disco }] }] },
      ],
    });

    return res.status(200).json(reservations);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getReservationsByDiscoSlug = async (req: Request, res: Response) => {
  try {
    const { slug } = req.params;

    const reservationsByDiscoSlug = await Disco.findOne({
      where: { slug: slug },
      attributes: ["id", "slug"],
      include: {
        model: Reservation,
        attributes: ["userId", "createdAt", "id"],
        include: [
          { model: User, attributes: ["name", "phone", "email", "lastName"] },
          {
            model: TicketsReservation,
            attributes: ["id", "quantity", "discoTicketId"],
            include: [{ model: DiscoTicket, attributes: ["price", "expDate", "shortDescription", "id", "category"] }],
          },
        ],
      },
    });

    return res.status(200).json(reservationsByDiscoSlug);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export interface IReservation {
  userId: string;
  cartItems: ICartItem[];
  companions: {
    firstName: string;
    lastName: string;
  }[];
}

interface ICartItem {
  discoId: string;
  discoTicketId: string | null;
  comboId: string | null;
  quantity: number;
  category: string;
  imagesTicket: string | null;
  imagesCombo: string | null;
  comboDescription: string | null;
  ticketDescription: string;
  price: string;
  discoSlug: string;
  colaborator: string | null;
}
