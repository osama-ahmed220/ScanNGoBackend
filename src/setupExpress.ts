import cors from "cors";
import Express from "express";
import path from "path";
import routes from "./routes";
require("dotenv").config();

const setupExpress = async (corsData: cors.CorsOptionsDelegate) => {
  const app = Express();
  app.set("trust proxy", 1); // Should fix the Chrome Cookie thing. Thanks Osama.
  app.use(
    Express.json({
      limit: "50mb",
    })
  );
  app.use(
    Express.urlencoded({
      limit: "50mb",
      extended: true,
      parameterLimit: 50000,
    })
  );
  app.get("/", (_, res) => {
    res.send("Working");
  });
  app.use(cors(corsData));
  app.use(
    "/assets",
    cors(corsData),
    Express.static(path.join(__dirname, "assets"))
  );

  app.use("/api", cors(corsData), routes);
  return { app };
};

export default setupExpress;
