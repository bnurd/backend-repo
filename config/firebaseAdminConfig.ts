import firebaseAdmin, { AppOptions, ServiceAccount } from "firebase-admin";

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
const config: AppOptions = {};

if (process.env.USE_EMULATOR === "true") {
  console.log("Using Firebase Admin SDK with Firestore emulator");
  process.env["GCLOUD_PROJECT"] = "ebuddy-project";
  process.env["FIRESTORE_EMULATOR_HOST"] = "localhost:9898";
  process.env["FIREBASE_AUTH_EMULATOR_HOST"] = "localhost:9099";

  config.projectId = "ebuddy-project";
} else {
  console.log("Using Firebase Admin SDK with real cloud resources");
  config.credential = firebaseAdmin.credential.cert(firebasekey as TCredential);
}

const Admin = firebaseAdmin.initializeApp(config);

export const db = Admin.firestore();

export default Admin;
