import { Request, Response } from "express";
import Subscription from "../models/Subscription";
import DiscoRole from "../models/DiscoRole";
import Disco from "../models/Disco";

export const getSubscriptions = async (_req: Request, res: Response) => {
  try {
    const subscriptions = await Subscription.findAll({ include: DiscoRole });

    return res.status(200).json(subscriptions);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getSubscriptionsByIdUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const subscriptionByIdUser = await Subscription.findAll({ where: { userId: id }, include: { model: Disco } });

    if (!subscriptionByIdUser) {
      return res.status(404).json({ message: "Subscriptions not found" });
    }

    return res.status(200).json(subscriptionByIdUser);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const createSubscription = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { discoId } = req.body;

    const roles = await DiscoRole.findAll({ where: { discoId: discoId } });

    const userRole: any = roles.find((role: any) => role.name === "user");
    const roleId = userRole.id;

    const newSubscription = await Subscription.create({
      discoId,
      userId: id,
      roleId,
    });

    return res.status(200).json(newSubscription);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteSubscription = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await Subscription.destroy({ where: { id: id } });

    return res.status(200).json({ message: "Canceled subscription" });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
