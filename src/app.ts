import { config } from "dotenv";
import express from "express";
import router from "./routes/health.router";

config()

function buildApp() {

    const app= express();
    app.use(express.json());

    app.use('/health', router);

    return app;
}
export default buildApp;