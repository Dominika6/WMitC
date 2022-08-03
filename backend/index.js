import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import config from "config"
import usersRoutes from "./routes/users.js";
import clientsRoutes from "./routes/clients.js";
import projectsRoutes from "./routes/projects.js";
import tasksRoutes from "./routes/tasks.js";
import Users from "./models/users.js";
import bcrypt from "bcryptjs";

const app = express();
dotenv.config();


app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

app.use("/user", usersRoutes);
app.use("/client", clientsRoutes);
app.use("/project", projectsRoutes);
app.use("/task", tasksRoutes);

app.get("/", (req, res) => {
  res.send("Hello to WMitC API");
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(config.get('dbUrl'))
  .then(async () => {

    const email = config.get('adminEmail')
    const password = config.get('adminPassword')
    const phone = config.get('adminPhone')
    const name = config.get('adminName')
    const position = "admin"
    const supervisor = "none"

    const existingUser = await Users.findOne({ email });
    if (!existingUser) {
        const hashedPassword = await bcrypt.hash(password, 12);
        await Users.create({
            name: name,
            phone_number: phone,
            email,
            password: hashedPassword,
            position,
            id_supervisor: supervisor,
        });
    }

    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  })
  .catch((error) => console.log(error.message));


