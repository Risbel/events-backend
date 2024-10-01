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
        { name: "Events" },
        { name: "Users" },
        { name: "Tickets" },
        { name: "VIP-tickets" },
        { name: "Notifications" },
        { name: "Packs" },
        { name: "Colors" },
        { name: "Pack-asociation" },
        { name: "Banner-images" },
        { name: "Banner-info" },
        { name: "About-info" },
        { name: "Carousel-images" },
        { name: "Footer-info" },
        { name: "Admin-settings-on-event" },
      ]);
    }
  } catch (error) {
    console.log("Error to create permissions or resources: ", error);
  }
};
