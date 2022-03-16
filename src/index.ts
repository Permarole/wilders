import express from "express";
import { wilderRouter } from "./routes/wilders";
import cors from "cors";
import mongoose from "mongoose";

const app = express();

async function init() {
    await mongoose.connect(
        "mongodb://root:root@localhost:27017/wildapi?authSource=admin&readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false",
        {
            autoIndex: true,
        }
    );
    app.use(cors());

    app.use(express.json());

    app.use("/api/wilders", wilderRouter);

    app.listen(3000, () => {
        console.log("server is listening on port 4000");
    });
}

init();
