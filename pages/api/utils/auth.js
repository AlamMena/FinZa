import authAdmin from "./authAdmin";

const getUser = async (req, res) => {
  const token = req.headers["token"];
  const user = await authAdmin.auth().verifyIdToken(token);
  return user;
};

export { getUser };
