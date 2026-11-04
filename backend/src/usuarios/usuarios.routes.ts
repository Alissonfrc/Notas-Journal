import { Router } from "express";
import * as controller from "./usuarios.controller";

const router = Router();
/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     summary: Cadastra um usuário para fazer login
 *     tags: [Usuários]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/Cadastro' }
 *     responses:
 *       '201':
 *         description: Usuário cadastrado sem exposição da senha
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Usuario' }
 *       '400': { $ref: '#/components/responses/BadRequest' }
 *       '409': { description: E-mail já cadastrado }
 */
router.post("/api/usuarios", controller.create);
export default router;
