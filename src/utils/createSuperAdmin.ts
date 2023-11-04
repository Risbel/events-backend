import { hash } from "bcryptjs";
import User from "../models/User";

export const createSuperAdmin = async () => {
  try {
    const superAdmin = await User.findOne({ where: { email: "risbel961019@gmail.com" } });

    if (!superAdmin) {
      const hashedPassword = await hash("RisbelSA961019.", 10);

      await User.create({
        name: "Risbel",
        lastName: "Suarez",
        email: "risbel961019@gmail.com",
        phone: "+53 54353930",
        password: hashedPassword,
        isSuperAdmin: true,
      });

      console.log("Superusuario creado exitosamente.");
    }
  } catch (error) {
    console.error("Error al crear el superusuario:", error);
  }
};
