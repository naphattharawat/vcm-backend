/// <reference path="../../typings.d.ts" />
import { Router, Request, Response } from 'express';

const router: Router = Router();
import { UserModel } from '../models/user';


const userModel = new UserModel();

router.get('/', async (req: Request, res: Response) => {
  try {
    const db = req.db;
    const rs = await userModel.list(db);
    res.send({ ok: true, rows: rs });
  } catch (error) {
    res.send({ ok: false, error: error });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const db = req.db;
    const data = req.body.data;
    await userModel.save(db, data);
    res.send({ ok: true });
  } catch (error) {
    res.send({ ok: false, error: error });
  }
});

router.put('/', async (req: Request, res: Response) => {
  try {
    const db = req.db;
    const data = req.body.data;
    const userId = req.body.userId;
    await userModel.update(db, userId, data);
    res.send({ ok: true });
  } catch (error) {
    res.send({ ok: false, error: error });
  }
});

router.delete('/', async (req: Request, res: Response) => {
  try {
    const db = req.db;
    const userId = req.query.userId;
    await userModel.delete(db, userId);
    res.send({ ok: true });
  } catch (error) {
    res.send({ ok: false, error: error });
  }
});

export default router;