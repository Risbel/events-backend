import { Request, Response } from "express";
import Disco from "../models/Disco";
import DiscoDetail from "../models/DiscoDetail";
import DiscoRole from "../models/DiscoRole";
import Subscription from "../models/Subscription";
import DiscoNetworks from "../models/DiscoNetworks";
import DiscoImage from "../models/DiscoImage";
import DiscoPhone from "../models/DiscoPhone";
import DiscoColor from "../models/DiscoColor";
import DiscoBannerImage from "../models/DiscoBannerImage";
import { formatBufferTo64 } from "../utils/formatBufferTo64";
import { uploadMultipleImages } from "../utils/minio";
import QuickLink from "../models/QuickLink";
import DiscoEmail from "../models/DiscoEmail";
import EventAbout from "../models/EventAbout";

export const getDiscos = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const discos = await Disco.findAll({
      include: [
        {
          model: DiscoDetail,
          attributes: ["address", "bannerDescription"],
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
        isDeleted: false,
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
              model: QuickLink,
              required: false,
            },
            {
              model: DiscoImage,
              required: false,
            },
            {
              model: DiscoBannerImage,
            },
            {
              model: DiscoPhone,
              required: false,
            },
            {
              model: DiscoEmail,
              required: false,
            },
            {
              model: DiscoColor,
              required: false,
            },
            {
              model: EventAbout,
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

export const getMyEvents = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { userId } = req.params;

    const disco: any = await Disco.findAll({
      where: { isDeleted: false },
      include: [
        {
          model: DiscoDetail,
          where: { administrator: userId },
        },
      ],
    });

    if (!disco) {
      return res.status(404).json({ message: "You don't have Events" });
    }

    return res.status(200).json(disco);
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
      // general
      name,
      slug,
      brandColor,
      startDate,
      endDate,
      // navbar
      bgNavbarColor,
      navbarForeground,
      // banner
      layoutTextBanner,
      h1Banner,
      h1BannerColor,
      h1BannerHeight,
      h1Weight,
      dateDescription,
      dateDescriptionHeight,
      dateDescriptionWeight,
      dateDescriptionColor,
      bannerDescription,
      bannerDescriptionHeight,
      bannerDescriptionWeight,
      bannerDescriptionColor,
      bannerGradientColor,
      // about
      titleAboutColor,
      titleTextAbout,
      bgAboutColor,
      layoutTextAbout,
      aboutTexts,
      buttonColor,
      buttonForeground,
      // experience
      titleTextCarousel,
      bgExperiencies,
      experienciesH1Color,
      // tickets
      titleTicketText,
      bgTicketsSection,
      ticketH1Color,
      buttonsTicketsColor,
      buttonTicketForeground,
      // footer
      phone,
      email,
      address,
      socials,
      quickLinks,
      bgFooterColor,
      foregroundFooterColor,
      administrator,
    } = req.body;

    if (!req.body) {
      throw new Error("Request body is missing");
    }

    const imagesToUpload: any = req.files;

    if (!imagesToUpload) {
      throw new Error("No files uploaded");
    }

    // const imagesInBufferTo64: any = imagesToUpload.map((image: any) => formatBufferTo64(image).content);

    const imgsUloaded = await uploadMultipleImages(imagesToUpload);

    if (!imgsUloaded || !imgsUloaded.length) {
      throw new Error("Image upload failed");
    }

    const newDisco: any = await Disco.create({
      name,
      logo: `https://${encodeURI(imgsUloaded?.[0])}`,
      slug,
      startDate,
      endDate,
    });

    const discoId = newDisco.id;

    const detailsDisco: any = await DiscoDetail.create({
      layoutTextBanner,
      h1BannerHeight,
      h1Weight,
      dateDescription,
      dateDescriptionHeight,
      dateDescriptionWeight,
      h1Banner,
      discoId,
      administrator,
      bannerDescription,
      bannerDescriptionHeight,
      bannerDescriptionWeight,
      titleTextAbout,
      titleTicketText,
      layoutTextAbout,
      titleTextCarousel,
      address,
    });

    const discoDetailId = detailsDisco.id;

    const aboutTextsArray: any = JSON.parse(aboutTexts);
    console.log(aboutTextsArray);
    const aboutTextsWithDiscoDetailId = aboutTextsArray.map((aboutText: any) => ({
      ...aboutText,
      discoDetailId,
    }));

    await EventAbout.bulkCreate(aboutTextsWithDiscoDetailId);

    const discoColors = await DiscoColor.create({
      bgTicketsSection,
      ticketH1Color,
      buttonsTicketsColor,
      buttonTicketForeground,
      bgExperiencies,
      experienciesH1Color,
      h1BannerColor,
      dateDescriptionColor,
      bannerDescriptionColor,
      bannerGradientColor,
      brandColor,
      bgNavbarColor,
      navbarForeground,
      buttonColor,
      buttonForeground,
      discoDetailId,
      titleAboutColor,
      bgAboutColor,
      bgFooterColor,
      foregroundFooterColor,
    });

    await DiscoEmail.create({
      name: email,
      discoDetailId,
    });

    await DiscoPhone.create({
      number: phone,
      discoDetailId,
    });

    const socialsArray: any[] = JSON.parse(socials);
    await DiscoNetworks.create({
      facebook: socialsArray[0]?.url || "",
      instagram: socialsArray[1]?.url || "",
      youtube: socialsArray[2]?.url || "",
      X: socialsArray[3]?.url || "",
      discoDetailId,
    });

    const quickLinksArray: any[] = JSON.parse(quickLinks);
    const quickLinksArrayReady: any[] = quickLinksArray
      .filter((link) => link.url && link.name) // Filtrar enlaces con url y name válidos
      .map((link) => ({
        url: link.url,
        name: link.name,
        discoDetailId,
      }));

    if (quickLinksArrayReady.length > 0) {
      await QuickLink.bulkCreate(quickLinksArrayReady);
    }

    const bannerImages = await DiscoBannerImage.bulkCreate([{ image: `https://${imgsUloaded?.[1]}`, discoDetailId }]);

    const discoRoles = await DiscoRole.bulkCreate([
      { name: "user", discoId },
      { name: "VIP-user", discoId },
      { name: "moderator", discoId },
      { name: "admin", discoId },
    ]);

    const userRole: any = discoRoles.find((role: any) => role.name === "admin");
    const roleId = userRole.id;

    const newSubscription = await Subscription.create({
      discoId,
      userId: administrator,
      roleId,
    });

    return res.status(200).json({ disco: newDisco, details: detailsDisco });
  } catch (error: any) {
    console.error(error); // Log the complete error for debugging
    return res.status(500).json({ message: error.message });
  }
};

export const updateDisco = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const { name, logo, administrator, description, largeDescription, bgImage, address, slug, phone } = req.body;

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

    const newDisco = await disco.save();
    const details = await discoDetails.save();

    return res.status(200).json({ disco: newDisco, details: details });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const softDeleteEvent = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

    const event = await Disco.findByPk(id);

    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    event.update({ isDeleted: true });

    return res.status(204).json({ message: "Event deleted successfully" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

interface SocialArray {
  url: string;
}

interface QuickLinksArray {
  url: string;
  name: string;
}
