import cors from "cors";
import { patchSelectQueryBuilder } from "typeorm-global-scopes";
import setupDatabase from "./setupDatabse";

require("dotenv").config();

const setupServer = async () => {
  const dbConnection = await setupDatabase();
  patchSelectQueryBuilder();

  const otherAllowedUrls = (process.env.ALLOWED_CORS || "").split(",") || [];
  const allowListCors =
    process.env.NODE_ENV === "production"
      ? [process.env.FRONTEND_URL as string, ...otherAllowedUrls]
      : ["*"];
  const corsOptionsDelegate: cors.CorsOptionsDelegate = (req, callback) => {
    let corsOptions: cors.CorsOptions;
    if (
      allowListCors.indexOf((req as any).header("Origin") as string) !== -1 ||
      allowListCors.includes("*")
    ) {
      corsOptions = { origin: true };
    } else {
      corsOptions = { origin: false };
    }
    corsOptions.credentials = true;
    callback(null, corsOptions);
  };
  const corsData = corsOptionsDelegate;
  return {
    corsData,
    dbConnection,
  };
};

export default setupServer;
