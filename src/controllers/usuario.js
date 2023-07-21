import bcryptjs from "bcryptjs";
import { generarJWT } from "../middlewares/generarJWT.js";

import { prisma } from "../database/bdConfig.js";

export const usuariId = async (req, res) => {
  const { userId } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      permission: true,
    },
  });
  console.log(user);
  res.status(200).json(user);
};

export const todosUsuarios = async (req, res) => {
  const usuariosTodos = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      telefono: true,
      permissionId: true,
      permission: {
        select: {
          id: true,
          type: true,
        },
      },
      // contacts: {
      //   // Incluir los contactos del usuario
      //   select: {
      //     id: true,
      //     name: true,
      //     email: true,
      //     telefono: true,
      //   },
      // },
    },
  });

  // console.log("todosUsuarios");
  res.status(200).json(usuariosTodos);
};

export const crearUsuario = async (req, res) => {
  const { email, password } = req.body;

  const usuarioOld = await prisma.user.findUnique({
    where: {
      email,
    },
    include: {
      permission: true,
    },
  });

  if (usuarioOld) {
    return res.status(400).json({
      msg: "El usuario ya existe",
    });
  }

  const nuevo = req.body;

  if (!nuevo.name) {
    return res.status(400).json({
      msg: "Falta el nombre",
    });
  }
  if (!nuevo.email) {
    return res.status(400).json({
      msg: "Falta el email",
    });
  }
  if (!nuevo.telefono) {
    return res.status(400).json({
      msg: "Falta el telefono",
    });
  }
  if (!nuevo.password) {
    return res.status(400).json({
      msg: "Falta la contraseña",
    });
  }

  nuevo.permissionId = 1;

  const salt = bcryptjs.genSaltSync();
  nuevo.password = bcryptjs.hashSync(password, salt);

  const usuario = await prisma.user.create({
    data: nuevo,
    include: {
      permission: true,
    },
  });

  // console.log(usuario);
  // return res.status(200).json(usuario);

  delete usuario.password;

  const token = await generarJWT(usuario.email);

  console.log({
    usuario,
    token,
  });

  return res.json({
    usuario,
    token,
  });
};

export const actualizarUsuario = async (req, res) => {
  const { id: userId, ...newData } = req.body;

  console.log("newData");
  console.log(newData);

  if (newData.password !== "") {
    const salt = bcryptjs.genSaltSync();
    newData.password = bcryptjs.hashSync(newData.password, salt);
  }

  console.log("newData");
  console.log(newData);

  const updatedUser = await prisma.user.update({
    where: {
      id: userId,
    },
    data: newData,

    select: {
      id: true,
      name: true,
      email: true,
      telefono: true,
      permissionId: true,
      permission: {
        select: {
          id: true,
          type: true,
        },
      },
    },
  });
  console.log({ msg: "Usuario Actualizado" });
  res.status(200).json({ msg: "Usuario Actualizado", updatedUser });
};

export const borraUsuario = async (req, res) => {
  const userId = parseInt(req.params.id);

  const usuarioOld = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      permission: true,
    },
  });

  if (!usuarioOld) {
    return res.status(400).json({
      msg: "El usuario no existe",
    });
  }

  const deletedUser = await prisma.user.delete({
    where: {
      id: userId,
    },
    include: {
      permission: true,
    },
  });

  res.status(200).json({ msg: "usuario borrado" });
};
