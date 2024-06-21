import { db } from "../config/firebaseAdminConfig";

const getUser = async (uid: string) => {
  const user = await db.collection("USERS").doc(uid).get();

  return user;
};

export default getUser;
