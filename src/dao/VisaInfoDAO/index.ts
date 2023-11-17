import { DAO } from "../DAO";
import { VisaInfoModel } from "../../models";

// class UserDao extends DAO {
//   async testExtent(id: string) {
//     return ["Hello", "World"];
//   }
// }

export default new DAO(VisaInfoModel);
