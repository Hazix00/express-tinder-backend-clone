/**
 * Required External Modules and Interfaces
 */
import express, { Request, Response } from "express";
import { TinderCard,TinderCardModel } from "../models/tinderCard";

 /**
  * Router Definition
  */
export const tinderCardsRouter = express.Router();

// reduce boilerplate with this function that wrappes the endpoints code with try catch
const handleResponse = async (res: Response ,callBack: () => Promise<any>) => {
  try {
    await callBack()
  } catch (e:any) {
    res.status(500).send(e.message);
  }
}  
 /**
  * Controller Definitions
  */
 
 // GET tinderCards
 
tinderCardsRouter.get("/", async (req: Request, res: Response) => {
  
  await handleResponse(res, async () => {
    const tinderCards: TinderCard[] = await TinderCardModel.find()
    res.status(200).send(tinderCards);
  })
    
});
 
 // GET tinderCards/:id
 
tinderCardsRouter.get("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  await handleResponse(res, async () => {
    const tinderCard: TinderCard | null = await TinderCardModel.findById(id);
    if (tinderCard) {
      return res.status(200).send(tinderCard);
    }

    res.status(404).send(`card not found with id:${id}`)
  })
});
 
// POST tinderCards

tinderCardsRouter.post("/", async (req: Request, res: Response) => {
  await handleResponse(res, async () => {
    const tinderCard: TinderCard = req.body;
    const newTinderCard: TinderCard | null = await TinderCardModel.create(tinderCard);
  
    res.status(201).json(newTinderCard);
  })
});
 
 // PUT tinderCards/:id
 
tinderCardsRouter.put("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  await handleResponse(res, async () => {
    const tinderCardToUpdate: TinderCard = req.body;

    const updatedTinderCard: TinderCard | null = await TinderCardModel.findByIdAndUpdate(id ,tinderCardToUpdate);

    if (updatedTinderCard) {
      return res.sendStatus(204);
    }

    res.status(404).send(`card not found with id:${id}`)
  })
});
 
// DELETE tinderCards/:id

tinderCardsRouter.delete("/:id", async (req: Request, res: Response) => {
  await handleResponse(res, async () => {
    const id = req.params.id;
    const deletedTinderCard: TinderCard | null = await TinderCardModel.findByIdAndDelete(id);

    if (deletedTinderCard) {
      return res.sendStatus(204);
    }
    
    res.status(404).send(`card not found with id:${id}`)
  })
});