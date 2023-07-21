import { Router } from "express";
import {
  guardarContacto,
  todosContactos,
  actualizarContacto,
  borrarContacto,
} from "../controllers/contacto.js";

const router = Router();

router.get("/todosContactos/:id", todosContactos);

router.post("/crearContacto", guardarContacto);

router.put("/actualizarContacto", actualizarContacto);

router.delete("/borrarContacto/:id", borrarContacto);

export default router;
