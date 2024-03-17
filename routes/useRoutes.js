/**
 * @swagger
 * components:
 *   schemas:
 *     Organization:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the organization.
 *         name:
 *           type: string
 *           description: Name of the organization.
 *
 *     Pricing:
 *       type: object
 *       properties:
 *         organization_id:
 *           type: integer
 *           description: ID of the organization.
 *         zone:
 *           type: string
 *           description: Zone for pricing.
 *         base_distance_in_km:
 *           type: number
 *           description: Base distance in kilometers.
 *         km_price:
 *           type: number
 *           description: Price per kilometer.
 *         fix_price:
 *           type: number
 *           description: Fixed price.
 *
 *     Item:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the item.
 *         type:
 *           type: string
 *           description: Type of the item (perishable or non-perishable).
 *         description:
 *           type: string
 *           description: Description of the item.
 *
 *   responses:
 *     NotFoundError:
 *       description: Resource not found.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               message:
 *                 type: string
 *                 example: Resource not found.
 *
 * /api/items:
 *   get:
 *     summary: Get all items.
 *     responses:
 *       '200':
 *         description: A list of all items.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Item'
 *
 * /api/pricing:
 *   get:
 *     summary: Get all pricing information.
 *     responses:
 *       '200':
 *         description: A list of all pricing information.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pricing'
 *
 * /api/organization:
 *   get:
 *     summary: Get all organizations.
 *     responses:
 *       '200':
 *         description: A list of all organizations.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Organization'
 *
 * /api/calculate:
 *   post:
 *     summary: Calculate total price for delivery.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               zone:
 *                 type: string
 *                 description: Zone for delivery.
 *                 example: central
 *               organization_id:
 *                 type: string
 *                 description: ID of the organization.
 *                 example: 005
 *               total_distance:
 *                 type: number
 *                 description: Total distance for delivery in kilometers.
 *                 example: 12
 *               item_type:
 *                 type: string
 *                 enum: [perishable, non-perishable]
 *                 description: Type of item (perishable or non-perishable).
 *             required:
 *               - zone
 *               - organization_id
 *               - total_distance
 *               - item_type
 *     responses:
 *       '200':
 *         description: Total price for delivery.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total_price:
 *                   type: number
 *                   description: Total price for delivery.
 *               example:
 *                 total_price: 20.5
 *       '400':
 *         description: Bad request. Check your request payload.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/responses/NotFoundError'
 */



const express = require('express');
const { working, getItem, getPricing, getOrganizations, calculateTotalPrice } = require('../controller/useController');
const router = express.Router();

//Get All Items
router.get('/items', getItem);

//Get All Pricing List
router.get('/pricing', getPricing);

//Get All Organizations
router.get('/organization', getOrganizations);


//Calculate Total Price
router.post('/calculate', calculateTotalPrice)


module.exports = router;