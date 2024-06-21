import { db } from "../config/firebaseAdminConfig";

export type UpdateUserDTO = {
  name: string;
  age: number;
  telp: number;
  address: string;
};

const updateUser = async (uid: string, data: UpdateUserDTO) => {
  const user = await db.collection("USERS").doc(uid).update(data);

  return user
};

export default updateUser;
