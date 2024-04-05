import { Request, Response } from "express";
import Combo from "../models/Combo";
import ComboDetail from "../models/ComboDetail";
import ComboReservation from "../models/ComboReservation";
import { uploadImage } from "../utils/minio";
import { formatBufferTo64 } from "../utils/formatBufferTo64";
import Disco from "../models/Disco";
import DiscoDetail from "../models/DiscoDetail";
import UserBankCard from "../models/UserBankCard";

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
      where: { discoId: discoId },
      include: [
        ComboDetail,
        ComboReservation,
        { model: Disco, include: [{ model: DiscoDetail, include: [{ model: UserBankCard }] }] },
      ],
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

    // const file64: any = formatBufferTo64(req.file);

    // const { image, imageCloudId }: any = await uploadImage(file64.content);

    const image = uploadImage(req.file);

    const newCombo: any = await Combo.create({
      discoId,
      price,
      category,
      countInStock,
    });

    const comboImage = await ComboDetail.create({
      comboId: newCombo.id,
      description,
      image,
      imageCloudId: "",
    });

    res.status(200).json({ newCombo: newCombo, comboImage: comboImage });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
