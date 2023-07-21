import bcryptjs from "bcryptjs";
import { generarJWT } from "../middlewares/generarJWT.js";

import { prisma } from "../database/bdConfig.js";

export const logear = async (req, res) => {
  const { email, password } = req.body;

  const usuario = await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      permission: true,
    },
  });

  if (!usuario) {
    return res.status(400).json({
      msg: "El usuario o contaseña son incorrectos",
    });
  }

  // Verificar la contraseña
  const validPassword = bcryptjs.compareSync(password, usuario.password);
  if (!validPassword) {
    return res.status(400).json({
      msg: "El usuario o contaseña son incorrectos",
    });
  }

  delete usuario.password;

  const token = await generarJWT(usuario.email);

  return res.json({
    usuario,
    token,
  });
};
