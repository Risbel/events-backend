import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import User from "../models/User";
import Reservation from "../models/Reservation";
import appConfig from "../config";
import { verify } from "jsonwebtoken";
import Subscription from "../models/Subscription";
import DiscoRole from "../models/DiscoRole";
import Disco from "../models/Disco";
import UserBankCard from "../models/UserBankCard";
import DiscoDetail from "../models/DiscoDetail";

export const getUsers = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const users = await User.findAll({ attributes: { exclude: ["password"] } });
    return res.json(users);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

    const user = await User.findOne({
      where: {
        id,
      },
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Subscription,
          include: [
            {
              model: DiscoRole,
              attributes: { include: ["name", "id"] },
            },
            {
              model: Disco,
              attributes: { include: ["name", "id"] },
            },
          ],
          attributes: { exclude: ["createdAt", "updatedAt"] },
        },
        {
          model: UserBankCard,
        },
      ],
    });

    if (!user) {
      res.status(404).json({ message: "User does not exist" });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getMyUsers = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { userId } = req.params;

    const myDiscosAndSubscribers: any = await Disco.findAll({
      include: [
        {
          model: DiscoDetail,
          where: {
            administrator: userId,
          },
        },
        {
          model: Subscription,
          include: [
            {
              model: User,
            },
          ],
        },
      ],
    });

    const users: any = [];
    myDiscosAndSubscribers.map((disc: any) => {
      disc.subscriptions.map((subscription: any) => {
        !users.find((user: any) => user.id === subscription.User.id) ? users.push(subscription.User) : null;
      });
    });

    return res.status(200).json(users);
  } catch (error: any) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getUserByToken = async (req: Request, res: Response): Promise<Response> => {
  try {
    if (!req?.headers?.authorization) {
      return res.status(401).json({ error: "No token provided" });
    }
    var cleanToken = req?.headers?.authorization.replace("Bearer ", "");

    const decoded: any = verify(cleanToken, appConfig.secretSignJwt);

    const { id } = decoded;

    const user = await User.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User does not exist" });
    }

    return res.status(200).json(user);
  } catch (error: any) {
    if (
      error.name === "JsonWebTokenError" ||
      error.message === "invalid signature" ||
      error.message === "jwt expired"
    ) {
      return res.status(401).json(error.message);
    }

    return res.status(500).json({ error: error.message });
  }
};

export const getUserReservations = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const userReservations = await User.findOne({
      where: {
        id,
      },
      include: Reservation,
    });

    return res.status(200).json(userReservations);
  } catch (error) {
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const createUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { name, lastName, email, phone, password, imageUrl }: UserEntries = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      lastName,
      email,
      phone,
      imageUrl,
      password: hashedPassword,
    });
    return res.status(200).json(newUser);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;
    const { name, lastName, email, phone, imageUrl } = req.body;

    const user: UserEntries | any = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.name = name;
    user.lastName = lastName;
    user.email = email;
    user.phone = phone;
    user.imageUrl = imageUrl;

    const updatedUser = user;

    const newUser = await updatedUser.save();

    return res.status(200).json(newUser);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { id } = req.params;

    await User.destroy({
      where: {
        id,
      },
    });

    return res.sendStatus(200).json({ message: "User deleted successfuly" });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export interface IMyUsers {
  id: string;
  name: string;
  logo: string;
  slug: string;
  startDate: string;
  endDate: string;
  createdAt: string;
  updatedAt: string;
  discoDetail: {
    id: string;
    h1Banner: string;
    bannerDescription: string;
    aboutDescription: string;
    titleTextCarousel: string;
    titleTextAbout: string;
    bgImage: string;
    address: string;
    createdAt: string;
    updatedAt: string;
    userBankCardId: string;
    administrator: string;
    discoId: string;
  };
  subscriptions: [
    {
      id: string;
      createdAt: string;
      updatedAt: string;
      userId: string;
      roleId: string;
      discoId: string;
      User: {
        id: string;
        name: string;
        lastName: string;
        email: string;
        phone: string;
        password: string;
        imageUrl: string;
        createdAt: string;
        updatedAt: string;
      };
    }
  ];
}
export interface UserEntries {
  id?: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  imageUrl: string;
  role: string;
}
