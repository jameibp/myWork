import { UserModel } from "../../models";

export default {
  getAllUsers: async () => {
    return await UserModel.find();
  },
};
