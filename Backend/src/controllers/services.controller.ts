import { pool } from "../db_config/db";
import { Request, Response } from "express";


// Insert data
export const addServiceData = async (req: Request, res: Response) => {
  const { name, description, image_url } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO services (name, description, image_url) VALUES ($1, $2) RETURNING *",
      [name, description, image_url]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("DB Insert Error");
  }
};

// Get data
export const getServiceData = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM services");
    console.log(result);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("DB Fetch Error");
  }
};
export const getServicesDataById = async (req: Request, res: Response) => {
  try {
    const {id } = req.params ;
    console.log(id, req.params);
    const result = await pool.query("SELECT * FROM services WHERE service_id= $1 ", [id]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("DB Fetch Error");
  }
};