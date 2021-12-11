/**
 * Required External Modules and Interfaces
 */
import express, { Request, Response } from "express";
import { TinderCard,TinderCardModel } from "../models/tinderCard";

 /**
  * Router Definition
  */
  export const tinderCardsRouter = express.Router();
 /**
  * Controller Definitions
  */
 
 // GET tinderCards
 
tinderCardsRouter.get("/", async (req: Request, res: Response) => {
  try {
    const tinderCards: TinderCard[] = await TinderCardModel.find()

    res.status(200).send(tinderCards);
  } catch (e:any) {
    res.status(500).send(e.message);
  }
});
 
 // GET tinderCards/:id
 
tinderCardsRouter.get("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const item: TinderCard | null = await TinderCardModel.findById(id);

    if (item) {
      return res.status(200).send(item);
    }

    res.status(404).send("item not found");
  } catch (e:any) {
    res.status(500).send(e.message);
  }
});
 
// POST tinderCards

tinderCardsRouter.post("/", async (req: Request, res: Response) => {
try {
  const item: TinderCard = req.body;

  const newItem = await TinderCardModel.create(item);

  res.status(201).json(newItem);
} catch (e:any) {
  res.status(500).send(e.message);
}
});
 
 // PUT tinderCards/:id
 
tinderCardsRouter.put("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  try {
    const tinderCardToUpdate: TinderCard = req.body;

    const existingItem: TinderCard | null = await TinderCardModel.findById(id);

    if (existingItem) {
      const updatedTinderCard = await TinderCardModel.findByIdAndUpdate(id ,tinderCardToUpdate);
      return res.status(200).json(updatedTinderCard);
    }

    res.status(404).send("item not found");
  } catch (e:any) {
    res.status(500).send(e.message);
  }
});
 
// DELETE tinderCards/:id

tinderCardsRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const deletedTinderCard: TinderCard | null = await TinderCardModel.findByIdAndDelete(id);

    res.sendStatus(204);
  } catch (e:any) {
    res.status(500).send(e.message);
  }
});