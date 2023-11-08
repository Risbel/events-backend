import { Request, Response } from "express";
import UserBankCard from "../models/UserBankCard";

export const getBankCardsByUserId = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const userBankCards = await UserBankCard.findAll({ where: { userId: userId } });

    return res.status(200).json(userBankCards);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
