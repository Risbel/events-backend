import { Request, Response } from "express";
import Reservation from "../models/Reservation";
import TicketsReservation from "../models/TicketsReservation";
import DiscoTicket from "../models/DiscoTicket";
import Disco from "../models/Disco";
import User from "../models/User";
import ComboReservation from "../models/ComboReservation";
import Combo from "../models/Combo";
import Companion from "../models/Companions";
import TicketReservationCombo from "../models/TicketReservationCombo";

export const createReservation = async (req: Request, res: Response) => {
  try {
    const { userId, cartItems, companions }: IReservation = req.body;

    const newReservation: any = await Reservation.create({
      userId: userId,
      discoId: cartItems[0].discoId,
      colaborator: cartItems[0].colaborator,
    });

    const ticketReservations: (INewTicketReservation | null)[] = await Promise.all(
      cartItems.map(async (item) => {
        if (item.discoTicketId) {
          return await TicketsReservation.create<any>({
            reservationId: newReservation.id,
            discoTicketId: item.discoTicketId,
            quantity: item.quantity,
          });
        } else {
          return null;
        }
      })
    );

    const primerTicket = ticketReservations.find((ticket) => ticket && ticket.dataValues);

    const companionPromises = companions.length
      ? companions.map(async (comp) => {
          return await Companion.create({
            ticketReservationId: primerTicket?.dataValues.id,
            firstName: comp.firstName,
            lastName: comp.lastName,
          });
        })
      : [];
    // Wait for all companion creations to finish before continuing
    const newCompanions = await Promise.all(companionPromises);

    const discoTicket: any = await DiscoTicket.findOne({ where: { id: primerTicket?.dataValues.discoTicketId } });
    discoTicket.countInStock = Number(discoTicket.countInStock) - Number(primerTicket?.dataValues.quantity);
    await discoTicket.save();

    const ticketReservationCombo: (INewComboReservation | null)[] = await Promise.all(
      cartItems.map(async (item) => {
        if (item.comboId) {
          return await TicketReservationCombo.create<any>({
            ticketReservationId: primerTicket?.dataValues.id,
            comboId: item.comboId,
            quantity: item.quantity,
          });
        } else {
          null;
        }
      })
    );

    const newCombos: INewComboReservation[] | any = ticketReservationCombo.filter((combo) => combo && combo.dataValues);

    await Promise.all(
      newCombos.map(async (combo: INewComboReservation) => {
        const matchedCombo: any = await Combo.findOne({ where: { id: combo.dataValues.comboId } });
        matchedCombo.countInStock = Number(matchedCombo.countInStock) - Number(combo.dataValues.quantity);
        await matchedCombo.save();
      })
    );

    return res.status(200).json({ message: "Ok" });
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
          include: [
            { model: DiscoTicket, include: [{ model: Disco }] },
            { model: Companion },
            { model: TicketReservationCombo, include: [{ model: Combo, include: [{ model: Disco }] }] },
          ],
        },
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
  comboImage: string | null;
  comboDescription: string | null;
  ticketDescription: string;
  price: string;
  discoSlug: string;
  colaborator: string | null;
}

interface ICompanions {
  firstName: string;
  lastName: string;
}

interface INewTicketReservation {
  dataValues: {
    id: string;
    reservationId: string;
    discoTicketId: string;
    quantity: number;
    updatedAt: string;
    createdAt: string;
  };
}

interface INewComboReservation {
  dataValues: {
    id: string;
    ticketReservationId: string;
    comboId: string;
    quantity: number;
    updatedAt: string;
    createdAt: string;
  };
}
