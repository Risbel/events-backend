import { config } from "dotenv"; //importo la funcion
config(); //la ejecuto para cargar mis variables de entorno definidas en un archivo .env en el objeto process.env

const db = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,

  conectionString: process.env.DB_URL,
};

const minio = {
  endpoint: process.env.MINIO_ENDPOINT,
  bucketName: process.env.MINIO_BUCKET_NAME,
  accessKeyId: process.env.MINIO_KEY,
  secretAccessKey: process.env.MINIO_SECRET_KEY,
};

const originAllowedDev = process.env.URL_ALLOWED_CLIENT_DEV;
const originAllowedPro = process.env.URL_ALLOWED_CLIENT_PRO;

const secretSignJwt: any = process.env.SECRET_SIGNATURE;

const secretRefreshJwt: any = process.env.SECRET_REFRESH_JWT;

const appConfig = {
  db,
  minio,
  originAllowedDev,
  originAllowedPro,
  secretSignJwt,
  secretRefreshJwt,
};

export default appConfig;
