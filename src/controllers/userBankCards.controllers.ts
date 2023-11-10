import { Request, Response } from "express";
import UserBankCard from "../models/UserBankCard";
import DiscoDetail from "../models/DiscoDetail";

export const createBankCard = async (req: Request, res: Response) => {
  try {
    const { name, number, userId } = req.body;

    const newBankCard = await UserBankCard.create({ name, number, userId });

    return res.status(200).json(newBankCard);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getBankCardsByUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const userBankCards = await UserBankCard.findAll({
      where: { userId: userId },
      include: { model: DiscoDetail, attributes: ["id"] },
    });

    return res.status(200).json(userBankCards);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteUserBankCard = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await UserBankCard.destroy({ where: { id } });

    return res.status(204).json({ message: "Deleted successfully" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
