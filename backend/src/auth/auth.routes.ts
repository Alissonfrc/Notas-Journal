import { Router } from "express";
import { login } from "./auth.controller";

const router = Router();
/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Autentica por e-mail e senha e retorna um JWT válido por 2 horas
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, senha]
 *             properties:
 *               email: { type: string, format: email, example: ana@email.com }
 *               senha: { type: string, format: password, example: Ana12345! }
 *     responses:
 *       '200':
 *         description: Login realizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token: { type: string }
 *                 usuario: { $ref: '#/components/schemas/Usuario' }
 *       '400': { $ref: '#/components/responses/BadRequest' }
 *       '401': { $ref: '#/components/responses/Unauthorized' }
 */
router.post("/api/login", login);
export default router;
