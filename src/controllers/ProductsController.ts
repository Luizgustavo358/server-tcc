import { Request, Response } from 'express';
import Knex from 'knex';

import db from '../database/connection';

export default class ProductsController {

    async index(req: Request, res: Response) {
        const products = await db('products')
            .select('*');

        res.json(products);
    }

    async create(req: Request, res: Response) {
        const {
            rfid,
            name,
            description,
            type,
            avatar,
            validity
        } = req.body;
    
        const trx = await db.transaction();
    
        try {
            await trx('products').insert({
                rfid,
                name,
                description,
                type,
                avatar,
                validity
            });
        
            await trx.commit();
        
            return res.status(201).send();
        } catch(err) {
            await trx.rollback();
    
            return res.status(400).json({
                error: 'Unexpected error while creating new product'
            });
        }
    }

    async delete(req: Request, res: Response) {
        const id = req.params.id;

        Knex('products')
            .where('id', id)
            .del();

        return res.send(id);
    }
}