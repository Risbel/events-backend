import { Request, Response } from "express";
import Combo from "../models/Combo";
import ComboDetail from "../models/ComboDetail";
import ComboReservation from "../models/ComboReservation";
import { uploadImage } from "../utils/minio";
import { formatBufferTo64 } from "../utils/formatBufferTo64";
import Disco from "../models/Disco";
import DiscoDetail from "../models/DiscoDetail";
import UserBankCard from "../models/UserBankCard";
import TicketCombo from "../models/TicketCombo";
import DiscoTicket from "../models/DiscoTicket";
import sequelize from "../database/database";

export const getCombos = async (req: Request, res: Response) => {
  try {
    const combos = await Combo.findAll({ include: [ComboDetail] });
    return res.status(200).json(combos);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getComboByDiscoId = async (req: Request, res: Response) => {
  try {
    const { discoId } = req.params;

    const combosByDiscoId = await Combo.findAll({
      where: { discoId: discoId, isDeleted: false },
      include: [{ model: ComboDetail }, { model: TicketCombo, include: [{ model: DiscoTicket }] }],
    });

    return res.status(200).json(combosByDiscoId);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const createCombo = async (req: Request, res: Response) => {
  try {
    const { discoId } = req.params;
    const { price, countInStock, description, category } = req.body;

    const image: any = await uploadImage(req.file);

    const newCombo: any = await Combo.create({
      discoId,
      price,
      category,
      countInStock,
    });

    const comboImage = await ComboDetail.create({
      comboId: newCombo.id,
      description,
      image: `https://${encodeURI(image)}`,
      imageCloudId: "",
    });

    res.status(200).json({ newCombo: newCombo, comboImage: comboImage });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateCombo = async (req: Request, res: Response) => {
  try {
    const transaction = await sequelize.transaction();

    const { id } = req.params;
    const { price, countInStock, description, category } = req.body;

    const combo: any = await Combo.findByPk(id, { transaction });
    if (!combo) {
      await transaction.rollback();
      return res.status(404).json({ message: "Combo not found" });
    }

    combo.price = price;
    combo.countInStock = countInStock;
    combo.category = category;

    const comboDetail: any = await ComboDetail.findOne({ where: { comboId: id }, transaction });
    if (!comboDetail) {
      await transaction.rollback();
      return res.status(404).json({ message: "Combo detail not found" });
    }

    comboDetail.description = description;

    await combo.save({ transaction });
    await comboDetail.save({ transaction });

    await transaction.commit();

    return res.status(200).json({ combo, comboDetail });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteCombo = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const combo = await Combo.findByPk(id);
    if (!combo) {
      return res.status(404).json({ message: "Combo not found" });
    }
    await combo.update({ isDeleted: true });

    return res.status(200).json({ message: "Combo and associated details deleted successfully" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const asociateCombo = async (req: Request, res: Response) => {
  try {
    const { discoTicketId } = req.params;
    const { comboId } = req.body;

    const asociation = await TicketCombo.create({
      discoTicketId,
      comboId,
    });

    return res.status(200).json(asociation);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};
