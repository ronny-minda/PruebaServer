import express from "express";
import cors from "cors";

import usuario from "./routes/usuario.mjs";
import contacto from "./routes/contacto.mjs";
import login from "./routes/login.mjs";

import { prisma } from "./database/bdConfig.js";
import bcryptjs from "bcryptjs";

const pordefecto = async () => {
  const usuario = await prisma.user.findUnique({
    where: {
      email: "admin@gmail.com",
    },
  });

  if (!usuario) {
    await prisma.permission.create({
      data: {
        type: "USER",
      },
    });
    await prisma.permission.create({
      data: {
        type: "ADMIN",
      },
    });

    const salt = bcryptjs.genSaltSync();
    let password = bcryptjs.hashSync("123", salt);

    await prisma.user.create({
      data: {
        name: "Admin",
        email: "admin@gmail.com",
        telefono: "1234567890",
        password,
        permissionId: 2,
      },
    });
  }
};

const main = () => {
  const app = express();
  app.use(express.json());
  app.use(cors());

  const PORT = process.env.PORT || 5000;

  app.use("/api/login", login);
  app.use("/api/usuarios", usuario);
  app.use("/api/contacto", contacto);

  pordefecto();

  app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
  });
};

export default main;
