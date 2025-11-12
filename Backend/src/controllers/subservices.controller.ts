import { pool } from "../db_config/db";
import { Request, Response } from "express";


// Insert data
export const addSubServicesData = async (req: Request, res: Response) => {
  const { name, description, service_id } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO subservices (name, description, service_id) VALUES ($1, $2, $3) RETURNING *",
      [name, description,service_id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("DB Insert Error");
  }
};

// Get data
export const getSubServicesData = async (_req: Request, res: Response) => {
  try {
    const result = await pool.query("SELECT * FROM subservices");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("DB Fetch Error");
  }
};


export const getSubServicesDataById = async (req: Request, res: Response) => {
  try {
    const {id } = req.params ;
    console.log(id, req.params);
    const result = await pool.query("SELECT * FROM subservices WHERE subservice_id= $1 ", [id]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("DB Fetch Error");
  }
};