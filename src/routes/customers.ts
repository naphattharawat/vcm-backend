/// <reference path="../../typings.d.ts" />
import { Router, Request, Response } from 'express';
const router: Router = Router();
import { CustomerModel } from '../models/customer';


import * as moment from 'moment';


const customerModel = new CustomerModel();

router.get('/', async (req: Request, res: Response) => {
  try {
    const db = req.db;
    const rs = await customerModel.list(db);
    res.send({ ok: true, rows: rs });
  } catch (error) {
    res.send({ ok: false, error: error });
  }
});

router.get('/info/:customerId', async (req: Request, res: Response) => {
  try {
    const db = req.db;
    const customerId = req.params.customerId;
    const rs = await customerModel.info(db, customerId);
    res.send({ ok: true, rows: rs[0] });
  } catch (error) {
    res.send({ ok: false, error: error });
  }
});

router.get('/telephone/:customerId', async (req: Request, res: Response) => {
  try {
    const db = req.db;
    const customerId = req.params.customerId;
    const rs = await customerModel.getTelephone(db, customerId);
    res.send({ ok: true, rows: rs });
  } catch (error) {
    res.send({ ok: false, error: error });
  }
});

router.get('/fax/:customerId', async (req: Request, res: Response) => {
  try {
    const db = req.db;
    const customerId = req.params.customerId;
    const rs = await customerModel.getFax(db, customerId);
    res.send({ ok: true, rows: rs });
  } catch (error) {
    res.send({ ok: false, error: error });
  }
});

router.get('/contact/:customerId', async (req: Request, res: Response) => {
  try {
    const db = req.db;
    const customerId = req.params.customerId;
    const rs = await customerModel.getContact(db, customerId);
    res.send({ ok: true, rows: rs });
  } catch (error) {
    res.send({ ok: false, error: error });
  }
});


router.get('/search', async (req: Request, res: Response) => {
  try {
    const query = req.query.query;
    const db = req.db;
    const rs = await customerModel.listSearch(db, query);
    res.send({ ok: true, rows: rs });
  } catch (error) {
    res.send({ ok: false, error: error });
  }
});

router.delete('/', async (req: Request, res: Response) => {
  try {
    const customerId = req.body.customerId;
    const db = req.db;
    await customerModel.delete(db, customerId);
    res.send({ ok: true });
  } catch (error) {
    res.send({ ok: false, error: error });
  }

});


export default router;