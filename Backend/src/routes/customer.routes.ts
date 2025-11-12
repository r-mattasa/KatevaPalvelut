import express from "express";
import { createCustomer, getcustomer, getcustomers, deletecustomer } from "../controllers/customer.controller";
import { Request, Response } from "express";

const router = express.Router();


router.post("/", async (req: Request, res: Response) => {
  const Customer = req.body;
  const createdCustomer = await createCustomer(Customer);
  res.send(createdCustomer);
});


router.get("/", async (req: Request, res: Response) => {
  const customers = await getcustomers();
  if (customers === null) {
    res.status(404).send({ error: "Customer not found" });
    return;
  }
  res.send(customers);
});


router.get("/:id", async (req: Request, res: Response) => {
  const customers = await getcustomer(Number(req.params.id));
  if (customers === null) {
    res.status(404).send({ error: "Customer not found" });
    return;
  }
  res.send(customers);
});



router.delete("/:id", async (req: Request, res: Response) => {
  const customers = await deletecustomer(Number(req.params.id));
  if (customers === null) {
    res.status(404).send({ error: "Customer not found" });
    return;
  }
  res.send(customers);
});

export default router;