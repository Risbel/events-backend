import { Response, NextFunction } from "express";

import { verify } from "jsonwebtoken";
import appConfig from "../config";
import User from "../models/User";
import Subscription from "../models/Subscription";

export const verifyToken = async (req: any, res: Response, next: NextFunction) => {
  try {
    var token = req.headers.authorization.replace("Bearer ", "");

    if (!token) {
      return res.status(403).json({ message: "No token provided" });
    }

    const decoded: any = verify(token, appConfig.secretSignJwt);

    req.userId = decoded.id; //en el objeto req creo una propiedad llamada userId y le guardo el id del token ya decodificado

    const user = await User.findByPk(req.userId, { attributes: { exclude: ["password"] } }); //password: 0 es para no guardar en user el password

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    next(); //para contibuar con el siguiente middleware
  } catch (error: any) {
    return res.status(404).json({ message: "Unautorized" });
  }
};

export const isAdmin = async (req: any, res: Response, next: NextFunction) => {
  const user: any = await User.findByPk(req.userId, { include: [Subscription] }); //req.userId existe porque en la funcion anterior lo hemos seteado en e objeto req

  // if (user.name === "admin") {
  // 	next();
  // } else {
  // 	return res.status(403).json({ message: "This action is reserved just for admin." });
  // }
};
