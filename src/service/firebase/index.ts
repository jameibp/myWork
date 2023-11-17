import admin, { ServiceAccount } from "firebase-admin";
import config from "../../config";

admin.initializeApp({
  credential: admin.credential.cert(config.firebase as ServiceAccount),
});

export default admin;
