import { Router } from "express";
import {
  usuariId,
  todosUsuarios,
  crearUsuario,
  actualizarUsuario,
  borraUsuario,
} from "../controllers/usuario.js";

const router = Router();

router.get("/usuariId", usuariId);

router.get("/todosUsuarios", todosUsuarios);

router.post("/crearUsuario", crearUsuario);

router.put("/actualizarUsuario", actualizarUsuario);

router.delete("/borraUsuario/:id", borraUsuario);

export default router;
