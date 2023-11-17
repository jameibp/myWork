import { DAO } from "../DAO";
import { BasicDetailsModel } from "../../models";

// class UserDao extends DAO {
//   async testExtent(id: string) {
//     return ["Hello", "World"];
//   }
// }

export default new DAO(BasicDetailsModel);
