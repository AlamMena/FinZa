import fbKey from "./firebaseKey.json";
import admin from "firebase-admin";
try {
  admin.initializeApp({
    credential: admin.credential.cert(fbKey),
  });
  console.log("Initialized.");
} catch (error) {
  if (!/already exists/u.test(error.message)) {
    console.error("Firebase admin initialization error", error.stack);
  }
}

const getUser = async (req, res) => {
  const token = req.headers["token"];
  const user = await admin.auth().verifyIdToken(token);
  return user;
};

export { getUser };
