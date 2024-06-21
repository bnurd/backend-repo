import firebaseAdmin, { ServiceAccount } from "firebase-admin";

// firebase credentials key file
/**
  {
    "type": "",
    "project_id": "",
    "private_key_id": "",
    "private_key": "",
    "client_email": "",
    "client_id": "",
    "auth_uri": "",
    "token_uri": "",
    "auth_provider_x509_cert_url": "",
    "client_x509_cert_url": "",
    "universe_domain": ""
  }
 */
import firebasekey from "./credentials.json";

type TCredential = ServiceAccount;

const Admin = firebaseAdmin.initializeApp({
  credential: firebaseAdmin.credential.cert(firebasekey as TCredential),
});

export const db = Admin.firestore();

export default Admin;
