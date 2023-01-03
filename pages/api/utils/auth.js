import admin from "firebase-admin";
import { getApps } from "firebase/app";
import fbKey from "../../../auth/firebaseKey.json";

!admin.app()
  ? admin.initializeApp({ credential: admin.credential.cert(fbKey) })
  : admin.app();

const getUser = async (req, res) => {
  const token = req.headers["token"];
  const user = await admin.auth().verifyIdToken(token);
  return user;
};

export { getUser };
