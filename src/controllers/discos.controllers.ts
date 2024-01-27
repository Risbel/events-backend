import { Request, Response } from "express";
import Disco from "../models/Disco";
import DiscoDetail from "../models/DiscoDetail";
import DiscoRole from "../models/DiscoRole";
import Subscription from "../models/Subscription";
import DiscoNetworks from "../models/DiscoNetworks";
import DiscoImage from "../models/DiscoImage";
import DiscoPhone from "../models/DiscoPhone";
import User from "../models/User";
import UserBankCard from "../models/UserBankCard";
import DiscoColor from "../models/DiscoColor";
import DiscoBannerImage from "../models/DiscoBannerImage";

export const getDiscos = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const discos = await Disco.findAll({
      include: [
        {
          model: DiscoDetail,
          attributes: ["address", "description"],
        },
      ],
      attributes: ["id", "logo", "name", "slug"],
    });

    return res.json(discos);
  } catch (error: any) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getDisco = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { slug, userId } = req.params;

    const disco: any = await Disco.findOne({
      where: {
        slug: slug,
      },
      include: [
        {
          model: DiscoDetail,
          include: [
            {
              model: DiscoNetworks,
              required: false,
            },
            {
              model: DiscoImage,
              required: false,
            },
            {
              model: DiscoPhone,
              required: false,
            },
            {
              model: UserBankCard,
              required: false,
            },
            {
              model: DiscoColor,
              required: false,
            },
          ],
        },
      ],
    });

    if (!disco) {
      return res.status(404).json({ message: "The disco does not exist" });
    }

    if (userId) {
      const subscriptions: any = await Subscription.findAll({
        where: { discoId: disco.id },
        include: DiscoRole,
      });

      const subscription = subscriptions.find((sub: any) => sub.userId === userId);

      if (subscription) {
        return res.status(200).json({ disco: disco, subscription: subscription });
      }

      return res.status(200).json({ disco: disco });
    }

    return res.status(200).json({ disco: disco });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getRolesByIdDisco = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

    const disco = await Disco.findOne({
      where: { id: id },
      include: [{ model: DiscoRole }],
    });

    return res.status(200).json(disco);
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
};

export const createDisco = async (req: Request, res: Response): Promise<Response> => {
  try {
    const {
      name,
      slug,
      logo,
      description,
      bannerImage,
      h1Color,
      h2Color,
      brandColor,
      secondaryColor,
      bgColor,
      textColor,
      buttonColor,
      buttonForeground,
      largeDescription,
      address,
      administrator,
      bankCardNumber,
      bgImage,
    } = req.body;

    const newDisco: any = await Disco.create({
      name,
      logo,
      slug,
    });
    const discoId = newDisco.id;

    const userBankCard: any = await UserBankCard.create({
      number: bankCardNumber,
      userId: administrator,
    });

    const detailsDisco: any = await DiscoDetail.create({
      discoId,
      administrator,
      description,
      largeDescription,
      bgImage,
      address,
      userBankCardId: userBankCard.id,
    });

    const discoDetailId = detailsDisco.id;

    const discoColors = await DiscoColor.create({
      brandColor,
      secondaryColor,
      h1Color,
      h2Color,
      bgColor,
      textColor,
      buttonColor,
      buttonForeground,
      discoDetailId,
    });

    const bannerImages = await DiscoBannerImage.bulkCreate([{ image: bannerImage, discoDetailId }]);

    const discoRoles = await DiscoRole.bulkCreate([
      { name: "user", discoId },
      { name: "moderator", discoId },
      { name: "admin", discoId },
    ]);

    return res.status(200).json({ disco: newDisco, details: detailsDisco });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateDisco = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const { name, logo, administrator, description, largeDescription, bgImage, address, slug, phone, userBankCardId } =
      req.body;

    const disco: any = await Disco.findByPk(id);
    const discoDetails: any = await DiscoDetail.findOne({
      where: { discoId: id },
    });
    disco.name = name;
    disco.logo = logo;
    discoDetails.slug = slug;
    discoDetails.administrator = administrator;
    discoDetails.description = description;
    discoDetails.largeDescription = largeDescription;
    discoDetails.bgImage = bgImage;
    discoDetails.address = address;
    discoDetails.phone = phone;
    discoDetails.userBankCardId = userBankCardId;

    const newDisco = await disco.save();
    const details = await discoDetails.save();

    return res.status(200).json({ disco: newDisco, details: details });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateBankCard = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const { userBankCardId } = req.body;

    const discoDetails: any = await DiscoDetail.findOne({
      where: { id: id },
    });

    discoDetails.userBankCardId = userBankCardId;

    const newDiscoBankCard = await discoDetails.save();

    return res.status(200).json(newDiscoBankCard);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteDisco = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

    await DiscoDetail.destroy({
      where: { discoId: id },
    });
    await Disco.destroy({
      where: { id: id },
    });
    await DiscoRole.destroy({
      where: { discoId: id },
    });

    return res.status(200).json({ message: "Disco deleted successfuly" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};
