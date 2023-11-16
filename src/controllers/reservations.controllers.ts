import { Request, Response } from "express";
import Reservation from "../models/Reservation";
import TicketsReservation from "../models/TicketsReservation";
import DiscoTicket from "../models/DiscoTicket";

export const createReservation = async (req: Request, res: Response) => {
  try {
    const { userId, cartItems }: { userId: string; cartItems: any[] } = req.body;

    const reservations = await Promise.all(
      cartItems.map(async (disco) => {
        const newReservation: any = await Reservation.create({
          userId: userId,
        });

        const ticketsReservations = await Promise.all(
          disco.items.map(async (item: any) => {
            const newTicketReservation: any = await TicketsReservation.create({
              reservationId: newReservation.id,
              discoTicketId: item.discoTicketId,
              quantity: item.quantity,
            });

            const discoTicket: any = await DiscoTicket.findOne({ where: { id: item.discoTicketId } });

            discoTicket.countInStock = Number(discoTicket.countInStock) - Number(item.quantity);

            const newDiscoTicket = await discoTicket.save();

            return { newTicketReservation, newDiscoTicket };
          })
        );

        return { ticketsReservations };
      })
    );
    return res.status(200).json(reservations);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
