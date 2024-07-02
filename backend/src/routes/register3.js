// backend/src/routes/register3
const express = require("express");
const { sendQueryCommit } = require('../api/mysql');
const register3Router = express.Router();
//const validator = require('validator');

register3Router.post("/register3", async (req, res) => {
   //gets the fields from the request
    const {id, authorization, classification, Laptop, mobile, car, chosen_classification, choosen_models} = req.body;
  
    // SQL query to insert the data into the employee_classification table
    const query = `INSERT INTO employee_classification (id, authorization, classification, Laptop, mobile, car, chosen_classification, choosen_models) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [id, authorization, classification, Laptop, mobile, car, chosen_classification, choosen_models];
  
    
    try {
      await sendQueryCommit(query, values);
      res.status(200).send({ message: "Employee step 3 registered successfully!" });
    } catch (error) { 
      console.error("Error registering employee details:", error);
      if (error.code === 'ER_DUP_ENTRY') {
          res.status(400).json({ error: "ER_DUP_ENTRY" });
      } else {
          res.status(500).json({ error: "Failed to register employee." });
      }
  }
  });
  
  module.exports = register3Router;