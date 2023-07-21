import { prisma } from "../database/bdConfig.js";

export const todosContactos = async (req, res) => {
  const userId = parseInt(req.params.id);

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      contacts: {
        select: {
          id: true,
          name: true,
          email: true,
          telefono: true,
        },
      },
    },
  });

  //   console.log(user.contacts);
  res.status(200).json(user.contacts);
};

export const actualizarContacto = async (req, res) => {
  const { id: userId, ...newData } = req.body;

  const updatedUser = await prisma.contact.update({
    where: {
      id: parseInt(userId),
    },
    data: newData,

    select: {
      id: true,
      name: true,
      email: true,
      telefono: true,
    },
  });
  console.log({ msg: "Contacto Actualizado" });
  res.status(200).json({ msg: "Contacto Actualizado", updatedUser });
};

export const borrarContacto = async (req, res) => {
  const userId = parseInt(req.params.id);

  const contactoOld = await prisma.contact.findUnique({
    where: {
      id: userId,
    },
  });

  if (!contactoOld) {
    return res.status(400).json({
      msg: "El contacto no existe",
    });
  }

  const deletedUser = await prisma.contact.delete({
    where: {
      id: userId,
    },
  });

  res.status(200).json({ msg: "contacto borrado" });
};

export const guardarContacto = async (req, res) => {
  const { name, email, telefono, userId } = req.body;

  const nuevoContacto = await prisma.contact.create({
    data: {
      name: name,
      email: email,
      telefono: telefono,
      user: { connect: { id: parseInt(userId) } }, // Conectamos el contacto al usuario mediante su ID
    },
  });

  console.log("guardarContacto");
  res.status(200).json({ msg: "contacto creado" });
};
