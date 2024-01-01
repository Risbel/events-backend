import Permission from "../models/Permission";
import Resource from "../models/Resource";

export const createPermissionsResources = async () => {
  try {
    const somePermission = await Permission.findOne();
    const someResource = await Resource.findOne();

    if (!somePermission) {
      Permission.bulkCreate([{ name: "create" }, { name: "update" }, { name: "read" }, { name: "delete" }]);
    }

    if (!someResource) {
      Resource.bulkCreate([
        { name: "Discos" },
        { name: "Users" },
        { name: "Disco Images" },
        { name: "Tickets" },
        { name: "Admin settings on disco" },
      ]);
    }
  } catch (error) {
    console.log("Error to create permissions or resources: ", error);
  }
};
