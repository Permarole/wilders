import { Request, Response, NextFunction } from "express";
import WilderModel from "../models/Wilder";

export const wilderController = {
    // CREATE NEW WILDER
    create: async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        const newWilder = new WilderModel(req.body);
        try {
            const wilder = await newWilder.save();
            res.json({ success: true, result: wilder });
        } catch (err: any) {
            if (err.code === 11000) {
                res.status(400).json({ message: "Name already taken" });
            } else {
                next(err);
            }
        }
    },

    // DELETE WILDER BY NAME
    delete: async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const wilder = await WilderModel.findById(req.params.id);
            if (!wilder) {
                res.status(404).json({ message: "no wilder found" });
            } else {
                await wilder.remove();
                res.json({ success: true, result: wilder });
            }
        } catch (err: any) {
            next(err);
        }
    },

    // RETREIVE ALL WILDERS
    find: async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const wilders = await WilderModel.find();

            if (!wilders) {
                res.status(500).json({ message: "no wilder found" });
            } else {
                res.json({ success: true, result: wilders });
            }
        } catch (err: any) {
            next(err);
        }
    },

    // RETREIVE A WILDER BY ID
    findOne: async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const wilder = await WilderModel.findById(req.params.id);

            if (!wilder) {
                res.status(404).json({ message: "no wilder found" });
            } else {
                next();
            }
        } catch (err: any) {
            next(err);
        }
    },

    // UPDATE ONE WILDER BY HIS NAME
    update: async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<void> => {
        try {
            const wilder = await WilderModel.findById(req.params.id);
            if (!wilder) {
                res.status(404).json({ message: "no wilder found" });
            } else {
                Object.assign(wilder, req.body);
                const updatedWilder = {
                    name: wilder.name,
                    city: wilder.city,
                    skills: wilder.skills,
                };
                await WilderModel.updateOne(updatedWilder);
                res.json({ success: true, result: wilder });
            }
        } catch (err: any) {
            next(err);
        }
    },
};
