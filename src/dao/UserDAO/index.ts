import { DAO } from "../../dao/DAO";
import { UserModel } from "../../models";

// class UserDao extends DAO {
//   async testExtent(id: string) {
//     return ["Hello", "World"];
//   }
// }

export default new DAO(UserModel);
