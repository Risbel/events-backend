import { Request, Response } from "express";
import Reservation from "../models/Reservation";
import TicketsReservation from "../models/TicketsReservation";
import DiscoTicket from "../models/DiscoTicket";
import Disco from "../models/Disco";
import User from "../models/User";
import Combo from "../models/Combo";
import TicketReservationCombo from "../models/TicketReservationCombo";
import sequelize from "../database/database";
import { Op } from "sequelize";
import { sub, format } from "date-fns";

export const createReservation = async (req: Request, res: Response) => {
  try {
    const { userId, cartItems }: IReservation = req.body;

    const ticketItems = cartItems.map((item) => {
      if (item.discoId) {
        return {
          collaborator: item.collaborator,
          expDate: item.expDate,
          discoId: item.discoId,
        };
      }
    });

    const newReservation: any = await Reservation.create({
      userId: userId,
      discoId: ticketItems[0]?.discoId,
      collaborator: ticketItems[0]?.collaborator,
      expDate: ticketItems[0]?.expDate,
    });

    const ticketReservations: (INewTicketReservation | null)[] = await Promise.all(
      cartItems.map(async (item) => {
        if (item.discoTicketId) {
          return await TicketsReservation.create({
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
    const { limit = 10, cursor }: any = req.query; // GET /reservations/disco/:slug?limit=10&cursor=2024-06-21

    // Find the disco by slug first
    const disco: any = await Disco.findOne({
      where: { slug },
      attributes: ["id", "slug"],
    });

    if (!disco) {
      return res.status(404).json({ error: "Disco not found" });
    }

    const today = format(new Date(), "yyyy-MM-dd");
    const yesterday = format(sub(new Date(), { days: 1 }), "yyyy-MM-dd");

    const comparisonSign = (cursor: "yesterday" | "today" | "pending" | "expired") => {
      if (cursor == "today") {
        return "=";
      } else if (cursor == "yesterday") {
        return "=";
      } else if (cursor == "expired") {
        return "<";
      } else {
        return ">";
      }
    };

    const formatedDate = (cursor: "yesterday" | "today" | "pending" | "expired") => {
      if (cursor == "today" || cursor == "pending") {
        return today;
      } else {
        return yesterday;
      }
    };

    // Find reservations related to the disco founded
    const reservationsByDiscoSlug = await Reservation.findAll({
      where: {
        discoId: disco.id,
        [Op.and]: [
          sequelize.where(sequelize.fn("date", sequelize.col("expDate")), comparisonSign(cursor), formatedDate(cursor)),
        ],
      },
      attributes: ["userId", "createdAt", "id", "expDate"],
      order: [["createdAt", "DESC"]],
      limit: Number(limit),
      include: [
        {
          model: User,
          attributes: ["name", "phone", "email", "lastName"],
        },
        {
          model: TicketsReservation,
          attributes: ["id", "quantity", "discoTicketId"],
          include: [
            {
              model: DiscoTicket,
              attributes: ["price", "expDate", "shortDescription", "id", "category"],
            },
          ],
        },
      ],
    });

    return res.status(200).json(reservationsByDiscoSlug);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getReservationCombosById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const reservationCombos = await TicketReservationCombo.findAll({
      where: { ticketReservationId: id },
      include: [
        {
          model: Combo,
        },
      ],
    });

    return res.status(200).json(reservationCombos);
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
  collaborator: string | null;
  expDate: string | null;
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

interface IDisco {
  dataValues: {
    id: string;
    slug: string;
  };
}
