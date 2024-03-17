const pool = require("../config/database");
const requestSchema = require("../models/useModels");


const working = async(req , res) =>{
    res.send("working")
}


const getItem = async(req, res) =>{
    try {
        const getAllItem = await pool.query("SELECT * FROM item");
        res.send(getAllItem.rows);
    } catch (error) {
        console.log(error.message);
    }
}


const getPricing = async(req, res) =>{
    try {
        const getAllItem = await pool.query("SELECT * FROM pricing");
        res.send(getAllItem.rows);
    } catch (error) {
        console.log(error.message);
    }
}


const getOrganizations = async(req, res) =>{
    try {
        const getAllItem = await pool.query("SELECT * FROM organization");
        res.send(getAllItem.rows);
    } catch (error) {
        console.log(error.message);
    }
}


const calculateTotalPrice = async(req, res) =>{
    try {
        const { error } = requestSchema.validate(req.body);

        if (error) {
            // Sends a 400 Bad Request response if validation fails
            return res.status(400).send(error.details[0].message);
        }

        const { zone, organization_id, total_distance, item_type } = req.body;


        const pricing = await pool.query("SELECT * FROM pricing WHERE zone = $1 AND organization_id = $2", [zone, organization_id]);

        if (!pricing.rows[0]) {
            return res.status(400).send("Pricing not found , Check your organization_id and zone");
        }

        const {base_distance_in_km, km_price, fix_price} = pricing.rows[0];

        if(total_distance <= base_distance_in_km){
            const totalPrice = { total_price: fix_price };
            return res.json(totalPrice);
        }

        if(item_type === "perishable"){
            
            const totalPrice = Number(fix_price) + (total_distance - base_distance_in_km) * 1.5;
            const total_Price = { total_price:  totalPrice};
            return res.json(total_Price);
        }
        const total_price = (total_distance - base_distance_in_km) * km_price + fix_price;

        if(item_type === "non-perishable"){
            const totalPrice = Number(fix_price) + (total_distance - base_distance_in_km) * 1;
            const total_Price = { total_price:  totalPrice};
            return res.json(total_Price);
        }
        return res.json("Server Error");
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    working,
    getItem,
    getOrganizations,
    getPricing,
    calculateTotalPrice,
}