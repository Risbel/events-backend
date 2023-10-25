import { Request, Response } from "express";
import Disco from "../models/Disco";
import DiscoDetail from "../models/DiscoDetail";
import DiscoRole from "../models/DiscoRole";
import Subscription from "../models/Subscription";
import DiscoNetworks from "../models/DiscoNetworks";
import DiscoImage from "../models/DiscoImage";

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
    const { name, logo, administrator, description, largeDescription, bgImage, address, slug, phone, email } = req.body;

    const newDisco: any = await Disco.create({
      name,
      logo,
    });
    const discoId = newDisco.id;
    const detailsDisco = await DiscoDetail.create({
      discoId,
      administrator,
      description,
      largeDescription,
      bgImage,
      address,
      slug,
      phone,
      email,
    });
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
    const { name, logo, slug, administrator, description, largeDescription, bgImage, address, phone, email } = req.body;

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
    discoDetails.email = email;

    const newDisco = await disco.save();
    const details = await discoDetails.save();

    return res.status(200).json({ disco: newDisco, details: details });
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
