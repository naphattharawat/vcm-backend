/// <reference path="../../typings.d.ts" />
import * as express from 'express';
import { Router, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';

const router: Router = Router();
import { Product } from '../models/product';

import { Jwt } from '../models/jwt';

const productModel = new Product();
router.post('/', async (req: Request, res: Response) => {
  try {
    const limit = req.body.limit;
    const offset = req.body.offset;
    const db = req.db;
    const rs = await productModel.productList(db, limit, offset);
    const rsTotal = await productModel.productListTotal(db);
    res.send({ ok: true, rows: rs, total: rsTotal[0].total });
  } catch (error) {
    res.send({ ok: false, error: error });
  }

});

router.post('/search', async (req: Request, res: Response) => {
  try {
    const limit = req.body.limit;
    const offset = req.body.offset;
    const query = req.body.query;
    const db = req.db;
    const rs = await productModel.productListSearch(db, limit, offset, query);
    const rsTotal = await productModel.productListSearchTotal(db, query);
    res.send({ ok: true, rows: rs, total: rsTotal[0].total });

  } catch (error) {
    res.send({ ok: false, error: error });
  }

});

export default router;