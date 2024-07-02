// backend/src/routes/register2
const express = require("express");
const { sendQueryCommit } = require('../api/mysql');
const register2Router = express.Router();

register2Router.post("/register2", async (req, res) => {
    //gets the fields from the request
    const { id, employee_type, start_date, Department, role, employee_manager, meeting_location_building, meeting_location_floor, meeting_location_room, meeting_location_station } = req.body;
    try {
        // Construct SQL query to insert data into employment_details table
        const query = `INSERT INTO employment_details (id, employee_type, start_date, Department, role, employee_manager, meeting_location_building, meeting_location_floor, meeting_location_room, meeting_location_station) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const result = await sendQueryCommit(query, [id, employee_type, start_date, Department, role, employee_manager, meeting_location_building, meeting_location_floor, meeting_location_room, meeting_location_station]);

        res.status(200).json({ message: `Employee details added for ID: ${id}` });
    } catch (error) { 
        console.error("Error registering employee details:", error);
        if (error.code === 'ER_DUP_ENTRY') {
            res.status(400).json({ error: "ER_DUP_ENTRY" });
        } else {
            res.status(500).json({ error: "Failed to register employee." });
        }
    }
});

module.exports = register2Router;
