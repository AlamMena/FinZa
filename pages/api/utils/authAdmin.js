import { getApps } from "firebase/app";
import admin from "firebase-admin";
import fbKey from "../../../auth/firebaseKey.json";

export default admin.app()
  ? admin.app()
  : admin.initializeApp({
      credential: admin.credential.cert(fbKey),
    });
