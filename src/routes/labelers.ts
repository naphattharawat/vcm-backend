/// <reference path="../../typings.d.ts" />
import { Router, Request, Response } from 'express';

const router: Router = Router();
import { LabelerModel } from '../models/labeler';


const labelertModel = new LabelerModel();

// router.post('/', async (req: Request, res: Response) => {
//   try {
//     const limit = req.body.limit;
//     const offset = req.body.offset;
//     const db = req.db;
//     const rs = await productModel.productList(db, limit, offset);
//     const rsTotal = await productModel.productListTotal(db);
//     res.send({ ok: true, rows: rs, total: rsTotal[0].total });
//   } catch (error) {
//     console.log(error);

//     res.send({ ok: false, error: error });
//   }

// });

// router.post('/save', async (req: Request, res: Response) => {
//   try {
//     const data = req.body.data;
//     const db = req.db;
//     const rs = await productModel.save(db, data);
//     res.send({ ok: true, rows: rs });
//   } catch (error) {
//     res.send({ ok: false, error: error.message });
//   }

// });

// router.put('/save', async (req: Request, res: Response) => {
//   try {
//     const data = req.body.data;
//     const productId = req.body.productId;
//     const db = req.db;
//     await productModel.update(db, productId, data);
//     res.send({ ok: true });
//   } catch (error) {
//     res.send({ ok: false, error: error.message });
//   }

// });

// router.delete('/', async (req: Request, res: Response) => {
//   try {
//     const productId = req.query.productId;
//     const db = req.db;
//     await productModel.delete(db, productId);
//     res.send({ ok: true });
//   } catch (error) {
//     res.send({ ok: false, error: error });
//   }

// });

// router.post('/search', async (req: Request, res: Response) => {
//   try {
//     const limit = req.body.limit;
//     const offset = req.body.offset;
//     const query = req.body.query;
//     const db = req.db;
//     const rs = await productModel.productListSearch(db, limit, offset, query);
//     const rsTotal = await productModel.productListSearchTotal(db, query);
//     res.send({ ok: true, rows: rs, total: rsTotal[0].total });

//   } catch (error) {
//     res.send({ ok: false, error: error });
//   }
// });

router.get('/autocomplete', async (req: Request, res: Response) => {
  try {
    const query = req.query.q;
    const db = req.db;
    const rs = await labelertModel.labelerAutoComplete(db, query);
    if (rs.length) {
      res.send(rs);
    } else {
      res.send([])
    }
  } catch (error) {
    res.send([])
  }
});



router.get('/', async (req: Request, res: Response) => {
  try {
    const db = req.db;
    const rs = await labelertModel.list(db);
    res.send({ ok: true, rows: rs });
  } catch (error) {
    res.send({ ok: false, error: error });
  }
});

router.put('/', async (req: Request, res: Response) => {
  try {
    const db = req.db;
    const labelerId = req.query.labelerId;
    const data = req.body.data;
    const rs = await labelertModel.update(db, labelerId, data);
    res.send({ ok: true, rows: rs });
  } catch (error) {
    res.send({ ok: false, error: error });
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const db = req.db;
    const data = req.body.data;
    const rs = await labelertModel.save(db, data);
    res.send({ ok: true, rows: rs });
  } catch (error) {
    res.send({ ok: false, error: error });
  }
});

router.post('/telephone', async (req: Request, res: Response) => {
  try {
    const db = req.db;
    const labelerId = req.body.labelerId;
    const data = req.body.data;
    await labelertModel.removeTel(db, labelerId);
    const tel = [];
    for (const t of data) {
      if (t.tel != '' && t.tel != null) {
        const obj: any = {
          supplier_id: labelerId,
          tel: t.tel,
          status: 1
        }
        tel.push(obj);
      }
    }
    await labelertModel.saveTel(db, tel);
    res.send({ ok: true });
  } catch (error) {
    res.send({ ok: false, error: error });
  }
});

router.post('/fax', async (req: Request, res: Response) => {
  try {
    const db = req.db;
    const labelerId = req.body.labelerId;
    const data = req.body.data;
    await labelertModel.removeFax(db, labelerId);
    const fax = [];
    for (const t of data) {
      if (t.fax != '' && t.fax != null) {
        const obj: any = {
          supplier_id: labelerId,
          fax: t.fax,
          status: 1
        }
        fax.push(obj);
      }
    }
    await labelertModel.saveFax(db, fax);
    res.send({ ok: true });
  } catch (error) {
    res.send({ ok: false, error: error });
  }
});
router.post('/contact', async (req: Request, res: Response) => {
  try {
    const db = req.db;
    const labelerId = req.body.labelerId;
    const data = req.body.data;
    await labelertModel.removeContact(db, labelerId);
    const contacts = [];
    for (const t of data) {
      const obj: any = {
        supplier_id: labelerId,
        contact_name: t.contact_name,
        contact_tel: t.contact_tel,
        status: 1
      }
      contacts.push(obj);
    }
    await labelertModel.saveContact(db, contacts);
    res.send({ ok: true });
  } catch (error) {
    res.send({ ok: false, error: error });
  }
});

router.get('/info/:labelerId', async (req: Request, res: Response) => {
  try {
    const db = req.db;
    const labelerId = req.params.labelerId;
    const rs = await labelertModel.info(db, labelerId);
    res.send({ ok: true, rows: rs[0] });
  } catch (error) {
    res.send({ ok: false, error: error });
  }
});

router.get('/telephone/:labelerId', async (req: Request, res: Response) => {
  try {
    const db = req.db;
    const labelerId = req.params.labelerId;
    const rs = await labelertModel.getTelephone(db, labelerId);
    res.send({ ok: true, rows: rs });
  } catch (error) {
    res.send({ ok: false, error: error });
  }
});

router.get('/fax/:labelerId', async (req: Request, res: Response) => {
  try {
    const db = req.db;
    const labelerId = req.params.labelerId;
    const rs = await labelertModel.getFax(db, labelerId);
    res.send({ ok: true, rows: rs });
  } catch (error) {
    res.send({ ok: false, error: error });
  }
});

router.get('/product/:labelerId', async (req: Request, res: Response) => {
  try {
    const db = req.db;
    const labelerId = req.params.labelerId;
    const rs = await labelertModel.getProduct(db, labelerId);
    res.send({ ok: true, rows: rs });
  } catch (error) {
    res.send({ ok: false, error: error });
  }
});

router.put('/machine', async (req: Request, res: Response) => {
  try {
    const db = req.db;
    const machineId = req.body.machineId;
    const rs = await labelertModel.removeMachine(db, machineId);
    res.send({ ok: true });
  } catch (error) {
    res.send({ ok: false, error: error });
  }
});

router.get('/contact/:labelerId', async (req: Request, res: Response) => {
  try {
    const db = req.db;
    const labelerId = req.params.labelerId;
    const rs = await labelertModel.getContact(db, labelerId);
    res.send({ ok: true, rows: rs });
  } catch (error) {
    res.send({ ok: false, error: error });
  }
});


router.get('/search', async (req: Request, res: Response) => {
  try {
    const query = req.query.query;
    const db = req.db;
    const rs = await labelertModel.listSearch(db, query);
    res.send({ ok: true, rows: rs });
  } catch (error) {
    res.send({ ok: false, error: error });
  }
});

router.delete('/', async (req: Request, res: Response) => {
  try {
    const labelerId = req.query.labelerId;
    const db = req.db;
    await labelertModel.delete(db, labelerId);
    res.send({ ok: true });
  } catch (error) {
    res.send({ ok: false, error: error });
  }

});
export default router;