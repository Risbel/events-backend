import { Request, Response } from "express";
import DiscoTicket from "../models/DiscoTicket";
import Disco from "../models/Disco";
import TicketImages from "../models/TicketImages";
import DiscoBankCard from "../models/UserBankCard";
import DiscoDetail from "../models/DiscoDetail";
import TicketsReservation from "../models/TicketsReservation";

export const getTickets = async (_req: Request, res: Response) => {
  try {
    const discoTickets = await DiscoTicket.findAll({ include: Disco });

    return res.status(200).json(discoTickets);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getTicketsByIdDisco = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const ticketsByDisco = await DiscoTicket.findAll({
      where: { discoId: id },
      include: { model: TicketsReservation, attributes: ["id", "quantity"] },
    });
    return res.status(200).json(ticketsByDisco);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getTicketById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const discoTicket = await DiscoTicket.findByPk(id, {
      include: [
        { model: Disco, include: [{ model: DiscoDetail, include: [{ model: DiscoBankCard }] }] },
        { model: TicketImages },
      ],
    });
    if (discoTicket === null) {
      return res.status(404).json({ message: "This ticket does not exist" });
    }

    return res.status(200).json(discoTicket);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const createDiscoTicket = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { price, shortDescription, largeDescription, category, countInStock, image, imageText, expDate } = req.body;

    const newDiscoTicket: any = await DiscoTicket.create({
      discoId: id,
      price,
      shortDescription,
      largeDescription,
      category,
      countInStock,
      expDate,
    });
    const ticketId = newDiscoTicket.id;

    const ticketImage = await TicketImages.create({
      image,
      imageText,
      discoTicketId: ticketId,
    });

    return res.status(200).json({ ticket: newDiscoTicket, image: ticketImage });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateDiscoTicket = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const { price, shortDescription, countInStock } = req.body;

    const discoTicket: any = await DiscoTicket.findOne({
      where: { id: id },
    });
    (discoTicket.price = price),
      (discoTicket.shortDescription = shortDescription),
      (discoTicket.countInStock = countInStock);

    const newDiscoTicket = await discoTicket.save();

    return res.status(200).json(newDiscoTicket);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteDiscoTicket = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await DiscoTicket.destroy({
      where: { id: id },
    });

    return res.status(204).json({ message: "Deleted successfully" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
