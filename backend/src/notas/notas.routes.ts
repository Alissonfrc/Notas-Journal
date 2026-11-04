import { Router } from "express";
import { requireAuth } from "../auth/auth.middleware";
import * as controller from "./notas.controller";

const router = Router();
/**
 * @swagger
 * /api/notas:
 *   get:
 *     summary: Lista somente as notas do usuário autenticado
 *     tags: [Notas]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       '200':
 *         description: Notas do usuário, em ordem da mais recente para a mais antiga
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Nota' }
 *       '401': { $ref: '#/components/responses/Unauthorized' }
 *   post:
 *     summary: Cria uma nota para o usuário autenticado
 *     tags: [Notas]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/NotaEntrada' }
 *     responses:
 *       '201':
 *         description: Nota criada
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Nota' }
 *       '400': { $ref: '#/components/responses/BadRequest' }
 *       '401': { $ref: '#/components/responses/Unauthorized' }
 *       '413': { description: Corpo da requisição excede 4 MB }
 * /api/notas/{id}:
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       schema: { type: integer, minimum: 1, maximum: 2147483647 }
 *   get:
 *     summary: Busca uma nota do usuário autenticado
 *     tags: [Notas]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       '200':
 *         description: Nota encontrada
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Nota' }
 *       '400': { $ref: '#/components/responses/BadRequest' }
 *       '401': { $ref: '#/components/responses/Unauthorized' }
 *       '404': { $ref: '#/components/responses/NotFound' }
 *   put:
 *     summary: Substitui os campos editáveis de uma nota do usuário autenticado
 *     tags: [Notas]
 *     security: [{ bearerAuth: [] }]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/NotaEntrada' }
 *     responses:
 *       '200':
 *         description: Nota atualizada
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Nota' }
 *       '400': { $ref: '#/components/responses/BadRequest' }
 *       '401': { $ref: '#/components/responses/Unauthorized' }
 *       '404': { $ref: '#/components/responses/NotFound' }
 *       '413': { description: Corpo da requisição excede 4 MB }
 *   delete:
 *     summary: Exclui uma nota do usuário autenticado
 *     tags: [Notas]
 *     security: [{ bearerAuth: [] }]
 *     responses:
 *       '204': { description: Nota excluída sem corpo de resposta }
 *       '400': { $ref: '#/components/responses/BadRequest' }
 *       '401': { $ref: '#/components/responses/Unauthorized' }
 *       '404': { $ref: '#/components/responses/NotFound' }
 */
router.get("/api/notas", requireAuth, controller.getAll);
router.get("/api/notas/:id", requireAuth, controller.getById);
router.post("/api/notas", requireAuth, controller.create);
router.put("/api/notas/:id", requireAuth, controller.update);
router.delete("/api/notas/:id", requireAuth, controller.remove);
export default router;
