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
    if(rs.length){
      res.send(rs);
    } else {
      res.send([])
    }
  } catch (error) {
    res.send([])
  }
});

export default router;