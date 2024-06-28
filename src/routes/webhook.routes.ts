import { Request, Response, Router } from "express";
import Reservation from "../models/Reservation";
import TicketsReservation from "../models/TicketsReservation";
import DiscoTicket from "../models/DiscoTicket";
import Combo from "../models/Combo";
import TicketReservationCombo from "../models/TicketReservationCombo";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const body = req.body;

  // Handle the event
  switch (body.type) {
    case "checkout.session.completed":
      const metadata: IMetadata = body.data.object.metadata;
      const cartItems: ICartItem[] = JSON.parse(body.data.object.metadata.items);

      const expDate: any = cartItems.find((item) => item.discoTicketId)?.expDate;

      const newReservation: any = await Reservation.create({
        userId: metadata.userId,
        discoId: metadata.discoId,
        collaborator: metadata.collaborator,
        expDate: expDate,
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

      const newCombos: INewComboReservation[] | any = ticketReservationCombo.filter(
        (combo) => combo && combo.dataValues
      );

      await Promise.all(
        newCombos.map(async (combo: INewComboReservation) => {
          const matchedCombo: any = await Combo.findOne({ where: { id: combo.dataValues.comboId } });
          matchedCombo.countInStock = Number(matchedCombo.countInStock) - Number(combo.dataValues.quantity);
          await matchedCombo.save();
        })
      );

      return res.status(204).json({ message: "Ok" });
      // Then define and call a function to handle the event checkout.session.completed
      break;
    // ... handle other event types
    default:
      console.log(`Unhandled event type ${body.type}`);
  }

  res.status(200).json("Webhook handled correctly");
});

export default router;

interface IMetadata {
  userId: string;
  discoId: string;
  items: string;
  collaborator: string | null;
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
