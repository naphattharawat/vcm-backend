/// <reference path="../../typings.d.ts" />
import { Router, Request, Response } from 'express';
const router: Router = Router();
import { ReceiveModel } from '../models/receive';



import * as moment from 'moment';


const receiveModel = new ReceiveModel();

router.post('/list', async (req: Request, res: Response) => {
  try {
    const limit = req.body.limit;
    const offset = req.body.offset;
    const db = req.db;
    const rs = await receiveModel.receiveList(db, limit, offset);
    const rsTotal = await receiveModel.receiveListTotal(db);
    res.send({ ok: true, rows: rs, total: rsTotal[0].total });
  } catch (error) {
    res.send({ ok: false, error: error });
  }
});

router.get('/products', async (req: Request, res: Response) => {
  try {
    const receiveId = req.query.receiveId;
    const db = req.db;
    const rs = await receiveModel.productList(db, receiveId);
    res.send({ ok: true, rows: rs });
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
    const rs = await receiveModel.receiveListSearch(db, limit, offset, query);
    const rsTotal = await receiveModel.receiveListSearchTotal(db, query);
    res.send({ ok: true, rows: rs, total: rsTotal[0].total });
  } catch (error) {
    res.send({ ok: false, error: error });
  }
});

router.delete('/', async (req: Request, res: Response) => {
  try {
    const receiveId = req.body.receiveId;
    const db = req.db;
    await receiveModel.delete(db, receiveId);
    res.send({ ok: true });
  } catch (error) {
    res.send({ ok: false, error: error });
  }

});

export default router;