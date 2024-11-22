const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const policyValidation = require('../../validations/policy.validation');
const policyController = require('../../controllers/policy.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('managePolicies'), validate(policyValidation.createPolicy), policyController.createPolicy)
  .get(auth('getPolicies'), validate(policyValidation.getPolicies), policyController.getPolicies);

router
  .route('/:policyId')
  .get(auth('getPolicies'), validate(policyValidation.getPolicy), policyController.getPolicy)
  .patch(auth('managePolicies'), validate(policyValidation.updatePolicy), policyController.updatePolicy)
  .delete(auth('managePolicies'), validate(policyValidation.deletePolicy), policyController.deletePolicy);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Policies
 *   description: Policy management and retrieval
 */

/**
 * @swagger
 * /policies:
 *   post:
 *     summary: Create a policy
 *     description: Only admins can create policies for users.
 *     tags: [Policies]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - policyNumber
 *               - policyType
 *               - coverageAmount
 *               - premiumAmount
 *               - startDate
 *               - endDate
 *               - user
 *             properties:
 *               policyNumber:
 *                 type: string
 *                 description: Unique policy number
 *               policyType:
 *                 type: string
 *                 enum: [health, vehicle, life, property, other]
 *                 description: Type of the policy
 *               coverageAmount:
 *                 type: number
 *                 description: Coverage amount for the policy
 *               premiumAmount:
 *                 type: number
 *                 description: Premium amount for the policy
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: Start date of the policy
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: End date of the policy
 *               status:
 *                 type: string
 *                 enum: [active, expired, cancelled]
 *                 description: Status of the policy
 *                 default: active
 *               user:
 *                 type: string
 *                 format: uuid
 *                 description: ID of the user to whom the policy is assigned
 *             example:
 *               policyNumber: "POLICY001"
 *               policyType: "health"
 *               coverageAmount: 500000
 *               premiumAmount: 10000
 *               startDate: "2024-11-20"
 *               endDate: "2025-11-20"
 *               status: "active"
 *               user: "63c44b8c44187f5e9a1d1234"
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Policy'
 *       "400":
 *         description: Bad Request
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all policies
 *     description: Only admins can retrieve all policies.
 *     tags: [Policies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: policyNumber
 *         schema:
 *           type: string
 *         description: Filter by policy number
 *       - in: query
 *         name: policyType
 *         schema:
 *           type: string
 *           enum: [health, vehicle, life, property, other]
 *         description: Filter by policy type
 *       - in: query
 *         name: user
 *         schema:
 *           type: string
 *           format: uuid
 *         description: Filter by user ID
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Sort by query (e.g., policyNumber:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of policies
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 1
 *         description: Page number
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Policy'
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 limit:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 1
 *                 totalResults:
 *                   type: integer
 *                   example: 1
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /policies/{policyId}:
 *   get:
 *     summary: Get a policy
 *     description: Only admins can fetch a specific policy by ID.
 *     tags: [Policies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: policyId
 *         required: true
 *         schema:
 *           type: string
 *         description: Policy ID
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Policy'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update a policy
 *     description: Only admins can update policies.
 *     tags: [Policies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: policyId
 *         required: true
 *         schema:
 *           type: string
 *         description: Policy ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               policyNumber:
 *                 type: string
 *               policyType:
 *                 type: string
 *                 enum: [health, vehicle, life, property, other]
 *               coverageAmount:
 *                 type: number
 *               premiumAmount:
 *                 type: number
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *               status:
 *                 type: string
 *                 enum: [active, expired, cancelled]
 *             example:
 *               policyNumber: "POLICY002"
 *               coverageAmount: 750000
 *               status: "expired"
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Policy'
 *       "400":
 *         description: Bad Request
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   delete:
 *     summary: Delete a policy
 *     description: Only admins can delete policies.
 *     tags: [Policies]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: policyId
 *         required: true
 *         schema:
 *           type: string
 *         description: Policy ID
 *     responses:
 *       "204":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
