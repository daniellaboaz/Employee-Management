// backend/src/routes/register.js
const express = require("express");
const { sendQueryCommit } = require('../api/mysql');
const path = require('path'); 
const fs = require('fs').promises; 
const registerRouter = express.Router();

registerRouter.post("/register", async (req, res) => {
    const { id, name, phone, email, employee_image } = req.body; //gets the fields from the request
    const base64Data = employee_image.replace(/^data:image\/\w+;base64,/, ''); //convert the image so we can save it
    const buf = Buffer.from(base64Data, 'base64');
    const imageName = `${id}_${Date.now()}.png`; // Example: 123456789_1624094584321.png

    try {
        // Save the image to a folder on the uploads directory
        const imagePath = path.join(__dirname, '../uploads', imageName);
        await fs.writeFile(imagePath, buf);

        // Construct SQL query to insert data into employee_details table
        const query = `INSERT INTO employee_details (id, name, phone, email, employee_image) VALUES (?, ?, ?, ?, ?)`;
        const result = await sendQueryCommit(query, [id, name, phone, email, imageName]);

        res.status(200).json({ message: `New Employee added: \nusername: ${name}, email: ${email}`, id: id });
    } catch (error) {
        console.error("Error registering employee:", error);
        if (error.code === 'ER_DUP_ENTRY') {
            res.status(400).json({ error: "ER_DUP_ENTRY" });
        } else {
            res.status(500).json({ error: "Failed to register employee." });
        }
    }
});

module.exports = registerRouter;