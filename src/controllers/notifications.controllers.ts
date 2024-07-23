import { Request, Response } from "express";
import EventNotification from "../models/EventNotification";
import { uploadImage } from "../utils/minio";
import Subscription from "../models/Subscription";
import SubscriptionNotification from "../models/SubscriptionNotification";

export const getNotificationsByEventId = async (req: Request, res: Response) => {
  try {
    const { eventId } = req.params;
    const { page, limit, search } = req.query;

    const offset = (Number(page) - 1) * Number(limit);

    const notifications = await EventNotification.findAll({
      where: {
        discoId: eventId,
      },
      limit: Number(limit),
      offset: Number(offset),
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json(notifications);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const createEventNotification = async (req: Request, res: Response) => {
  try {
    const { eventId } = req.params;
    const { type, title, description, expDate, userId } = req.body;
    const image: any = req.file ? await uploadImage(req.file) : null;

    const notification: INotification = await EventNotification.create({
      discoId: eventId,
      type,
      title,
      description,
      expDate,
      image: image ? `https://${encodeURI(image)}` : null,
    });

    const subscriptions: ISubscription[] = await Subscription.findAll({
      where: {
        discoId: eventId,
      },
    });

    const subscriptionNotificationsPromises = subscriptions.map((subscription) =>
      SubscriptionNotification.create({
        eventNotificationId: notification.id,
        subscriptionId: subscription.id,
      })
    );

    await Promise.all(subscriptionNotificationsPromises);

    return res.status(200).json(notification);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteNotification = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

    await EventNotification.destroy({ where: { id }, cascade: true });

    return res.status(204).send();
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const editNotification = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { type, title, description, expDate } = req.body;

    const notification: any = await EventNotification.findByPk(id);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    notification.type = type;
    notification.title = title;
    notification.description = description;
    notification.expDate = expDate;

    await notification.save();

    return res.status(200).json({ notification });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getNotificationsBySubscription = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { page, limit, search } = req.query;

    const offset = (Number(page) - 1) * Number(limit);

    const notifications = await Subscription.findAll({
      where: { userId: userId },
      include: [
        {
          model: SubscriptionNotification,
          include: [
            {
              model: EventNotification,
            },
          ],
        },
      ],
      limit: Number(limit),
      offset: Number(offset),
      order: [["createdAt", "DESC"]],
    });

    return res.status(200).json(notifications);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}; //not used for now

export const getNotificationsByUserEvent = async (req: Request, res: Response) => {
  try {
    const { userId, eventId } = req.params;
    const { page, limit, search } = req.query;

    const offset = (Number(page) - 1) * Number(limit);

    const notifications = await Subscription.findOne({
      where: { userId: userId, discoId: eventId },
      include: [
        {
          model: SubscriptionNotification,
          where: { isDeleted: false },
          include: [
            {
              model: EventNotification,
            },
          ],
        },
      ],
      limit: Number(limit),
      offset: Number(offset),
    });

    return res.status(200).json(notifications);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const getNotificationsCount = async (req: Request, res: Response) => {
  try {
    const { userId, eventId } = req.params;

    const subscription = await Subscription.findOne({
      where: { userId: userId, discoId: eventId },
    });
    const notificationsCount = await SubscriptionNotification.count({
      where: {
        subscriptionId: subscription.id,
        isDeleted: false,
        isRead: false,
      },
    });

    return res.status(200).json({ count: notificationsCount });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
export const updateNotificationIsRead = async (req: Request, res: Response) => {
  try {
    const { notificationId } = req.params;

    const subscriptionNotification: any = await SubscriptionNotification.findOne({
      where: { eventNotificationId: notificationId },
    });

    if (!subscriptionNotification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    subscriptionNotification.isRead = !subscriptionNotification.isRead;

    await subscriptionNotification.save();

    return res.status(200).json({ subscriptionNotification });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateNotificationIsDeleted = async (req: Request, res: Response) => {
  try {
    const { notificationId } = req.params;

    const subscriptionNotification: any = await SubscriptionNotification.findOne({
      where: { eventNotificationId: notificationId },
    });

    subscriptionNotification.isDeleted = !subscriptionNotification.isDeleted;

    await subscriptionNotification.save();

    return res.status(200).json({ subscriptionNotification });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export interface INotification {
  id: string;
  isDeleted: boolean;
  discoId: string;
  type: string;
  title: string;
  description: string;
  expDate: string;
  image: string;
  updatedAt: string;
  createdAt: string;
  priority: string;
}

export interface ISubscription {
  id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  roleId: string;
  discoId: string;
}
