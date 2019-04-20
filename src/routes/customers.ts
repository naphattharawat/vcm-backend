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

router.put('/', async (req: Request, res: Response) => {
  try {
    const db = req.db;
    const customerId = req.query.customerId;
    const data = req.body.data;
    const rs = await customerModel.update(db, customerId, data);
    res.send({ ok: true, rows: rs });
  } catch (error) {
    res.send({ ok: false, error: error });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const db = req.db;
    const data = req.body.data;
    const rs = await customerModel.save(db, data);
    res.send({ ok: true, rows: rs });
  } catch (error) {
    res.send({ ok: false, error: error });
  }
});

router.post('/telephone', async (req: Request, res: Response) => {
  try {
    const db = req.db;
    const customerId = req.body.customerId;
    const data = req.body.data;
    await customerModel.removeTel(db, customerId);
    const tel = [];
    for (const t of data) {
      if (t.tel != '' && t.tel != null) {
        const obj: any = {
          customer_id: customerId,
          tel: t.tel,
          status: 1
        }
        tel.push(obj);
      }
    }
    await customerModel.saveTel(db, tel);
    res.send({ ok: true });
  } catch (error) {
    res.send({ ok: false, error: error });
  }
});

router.post('/fax', async (req: Request, res: Response) => {
  try {
    const db = req.db;
    const customerId = req.body.customerId;
    const data = req.body.data;
    await customerModel.removeFax(db, customerId);
    const fax = [];
    for (const t of data) {
      if (t.fax != '' && t.fax != null) {
        const obj: any = {
          customer_id: customerId,
          fax: t.fax,
          status: 1
        }
        fax.push(obj);
      }
    }
    await customerModel.saveFax(db, fax);
    res.send({ ok: true });
  } catch (error) {
    res.send({ ok: false, error: error });
  }
});
router.post('/contact', async (req: Request, res: Response) => {
  try {
    const db = req.db;
    const customerId = req.body.customerId;
    const data = req.body.data;
    await customerModel.removeContact(db, customerId);
    const contacts = [];
    for (const t of data) {
      const obj: any = {
        customer_id: customerId,
        contact_name: t.contact_name,
        contact_tel: t.contact_tel,
        status: 1
      }
      contacts.push(obj);
    }
    await customerModel.saveContact(db, contacts);
    res.send({ ok: true });
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

router.get('/machine/:customerId', async (req: Request, res: Response) => {
  try {
    const db = req.db;
    const customerId = req.params.customerId;
    const rs = await customerModel.getMachine(db, customerId);
    res.send({ ok: true, rows: rs });
  } catch (error) {
    res.send({ ok: false, error: error });
  }
});

router.put('/machine', async (req: Request, res: Response) => {
  try {
    const db = req.db;
    const machineId = req.body.machineId;
    const rs = await customerModel.removeMachine(db, machineId);
    res.send({ ok: true });
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
    const customerId = req.query.customerId;
    const db = req.db;
    await customerModel.delete(db, customerId);
    res.send({ ok: true });
  } catch (error) {
    res.send({ ok: false, error: error });
  }

});


export default router;