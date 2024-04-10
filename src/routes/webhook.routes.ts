import { Request, Response, Router } from "express";
import Reservation from "../models/Reservation";
import TicketsReservation from "../models/TicketsReservation";
import DiscoTicket from "../models/DiscoTicket";
import ComboReservation from "../models/ComboReservation";
import Combo from "../models/Combo";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  const body = req.body;

  // Handle the event
  switch (body.type) {
    case "checkout.session.completed":
      const metadata: IMetadata = body.data.object.metadata;
      const cartItems = JSON.parse(body.data.object.metadata.items);

      const newReservation: any = await Reservation.create({
        userId: metadata.userId,
        discoId: metadata.discoId,
      });

      const fullReservation = await Promise.all(
        cartItems.map(async (item: any) => {
          if (item.discoTicketId) {
            const newTicketReservation = await TicketsReservation.create({
              reservationId: newReservation.id,
              discoTicketId: item.discoTicketId,
              quantity: item.quantity,
            });

            const discoTicket: any = await DiscoTicket.findOne({ where: { id: item.discoTicketId } });

            discoTicket.countInStock = Number(discoTicket.countInStock) - Number(item.quantity);

            const newDiscoTicket = await discoTicket.save();
            return { newTicketReservation, newDiscoTicket };
          } else {
            const newComboReservation = await ComboReservation.create({
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

      return res.status(204);
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
}
