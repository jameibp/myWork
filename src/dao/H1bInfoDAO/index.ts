import { DAO } from "../DAO";
import { H1bModel } from "../../models";

// class UserDao extends DAO {
//   async testExtent(id: string) {
//     return ["Hello", "World"];
//   }
// }

export default new DAO(H1bModel);
