import { Request, Response } from "express";
import DiscoTicket from "../models/DiscoTicket";
import Disco from "../models/Disco";

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

    const ticketsByDisco = await DiscoTicket.findAll({ where: { discoId: id } });
    return res.status(200).json(ticketsByDisco);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const createDiscoTicket = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { price, description, category, quantity } = req.body;

    const newDiscoTicket = await DiscoTicket.create({
      discoId: id,
      price,
      description,
      category,
      quantity,
    });

    return res.status(200).json(newDiscoTicket);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const updateDiscoTicket = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { price, description, category, quantity } = req.body;

    const discoTicket: any = await DiscoTicket.findOne({
      where: { discoId: id },
    });
    (discoTicket.price = price),
      (discoTicket.description = description),
      (discoTicket.category = category),
      (discoTicket.quantity = quantity);

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
      where: { discoId: id },
    });

    res.status(200).json({ message: "DiscoTicket deleted successfuly" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
