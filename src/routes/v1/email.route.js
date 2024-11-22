const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const emailValidation = require('../../validations/email.validation');
const emailController = require('../../controllers/email.controller');

const router = express.Router();

router
  .route('/')
  .post(auth('manageEmails'), validate(emailValidation.createEmail), emailController.createEmail)
  .get(auth('getEmails'), validate(emailValidation.getEmails), emailController.getEmails);

router
  .route('/:emailId')
  .get(auth('getEmails'), validate(emailValidation.getEmail), emailController.getEmail)
  .patch(auth('manageEmails'), validate(emailValidation.updateEmail), emailController.updateEmail)
  .delete(auth('manageEmails'), validate(emailValidation.deleteEmail), emailController.deleteEmail);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Emails
 *   description: Email management and retrieval
 */

/**
 * @swagger
 * /emails:
 *   post:
 *     summary: Create an email
 *     description: Only authorized users can create emails.
 *     tags: [Emails]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - subject
 *               - emailBody
 *               - emailId
 *               - user
 *               - category
 *             properties:
 *               subject:
 *                 type: string
 *               emailBody:
 *                 type: string
 *               emailId:
 *                 type: string
 *                 format: email
 *               user:
 *                 type: string
 *                 format: uuid
 *                 description: The ID of the user
 *               category:
 *                 type: string
 *                 enum: [enquire, claim, feedback, others]
 *             example:
 *               subject: "Policy Inquiry"
 *               emailBody: "I have a question regarding my policy."
 *               emailId: "user@example.com"
 *               user: "5f8f8c44b54764421b715f0d"
 *               category: "enquire"
 *     responses:
 *       "201":
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Email'
 *       "400":
 *         description: Bad Request
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *
 *   get:
 *     summary: Get all emails
 *     description: Only authorized users can retrieve all emails.
 *     tags: [Emails]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: subject
 *         schema:
 *           type: string
 *         description: Filter by subject
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           enum: [enquire, claim, feedback, others]
 *         description: Filter by category
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Sort by field (e.g., subject:asc)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           minimum: 1
 *         default: 10
 *         description: Maximum number of emails
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
 *                     $ref: '#/components/schemas/Email'
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
 *                   example: 100
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger
 * /emails/{emailId}:
 *   get:
 *     summary: Get an email
 *     description: Only authorized users can retrieve email details.
 *     tags: [Emails]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: emailId
 *         required: true
 *         schema:
 *           type: string
 *         description: Email ID
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Email'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 *
 *   patch:
 *     summary: Update an email
 *     description: Only authorized users can update emails.
 *     tags: [Emails]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: emailId
 *         required: true
 *         schema:
 *           type: string
 *         description: Email ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               subject:
 *                 type: string
 *               emailBody:
 *                 type: string
 *               category:
 *                 type: string
 *                 enum: [enquire, claim, feedback, others]
 *             example:
 *               subject: "Updated Subject"
 *               emailBody: "Updated email content."
 *               category: "feedback"
 *     responses:
 *       "200":
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *                $ref: '#/components/schemas/Email'
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
 *     summary: Delete an email
 *     description: Only authorized users can delete emails.
 *     tags: [Emails]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: emailId
 *         required: true
 *         schema:
 *           type: string
 *         description: Email ID
 *     responses:
 *       "200":
 *         description: No content
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
