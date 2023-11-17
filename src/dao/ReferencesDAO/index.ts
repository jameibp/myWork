import { DAO } from "../DAO";
import { ReferencesModel } from "../../models";

// class UserDao extends DAO {
//   async testExtent(id: string) {
//     return ["Hello", "World"];
//   }
// }

export default new DAO(ReferencesModel);
