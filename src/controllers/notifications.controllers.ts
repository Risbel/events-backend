import { Request, Response } from "express";
import EventNotification from "../models/EventNotification";
import { uploadImage } from "../utils/minio";

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
    const { type, title, description, expDate } = req.body;
    const image: any = req.file ? await uploadImage(req.file) : null;

    const notification = await EventNotification.create({
      discoId: eventId,
      type,
      title,
      description,
      expDate,
      image: image ? `https://${encodeURI(image)}` : null,
    });

    return res.status(200).json(notification);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const deleteNotification = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

    const rowsDeleted = await EventNotification.destroy({ where: { id } });

    if (rowsDeleted === 0) {
      return res.status(404).json({ error: "Notification not found" });
    }

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
