/// <reference path="../../typings.d.ts" />
// import * as express from 'express';
import { Router, Request, Response } from 'express';
// import * as HttpStatus from 'http-status-codes';

const router: Router = Router();
import { Product } from '../models/product';


import * as path from 'path';
import * as fs from 'fs';
import * as moment from 'moment';
import * as fse from 'fs-extra';
import * as multer from 'multer';

const uploadDir = process.env.MMIS_DATA;

fse.ensureDirSync(uploadDir);

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir)
  },
  filename: function (req, file, cb) {
    let _ext = path.extname(file.originalname);
    cb(null, Date.now() + _ext)
  }
})

let upload = multer({ storage: storage })
//
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

router.post('/save', async (req: Request, res: Response) => {
  try {
    const data = req.body.data;
    const db = req.db;
    const rs = await productModel.save(db, data);
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
    const rs = await productModel.productListSearch(db, limit, offset, query);
    const rsTotal = await productModel.productListSearchTotal(db, query);
    res.send({ ok: true, rows: rs, total: rsTotal[0].total });

  } catch (error) {
    res.send({ ok: false, error: error });
  }

});


router.post('/image', upload.any(), (req: Request, res: Response) => {
  const db = req.db;
  const files = req.files;
  const productId = req.body.productId;
  const fileName = req.body.fileName;


  let docs: any = [];

  files.forEach(v => {
    // let fileData = fs.readFileSync(v.path);
    // const path = v.path
    let obj = {
      picture: v.path,
    };
    docs.push(obj);
  });

  if (docs.length) {
    productModel.saveUpload(db, docs, productId)
      .then((ids) => {
        res.send({ ok: true, files: docs });
      })
      .catch((error) => {
        res.send({ ok: false, error: error });
      })
      .finally(() => {
        db.destroy();
      });
  } else {
    res.send({ ok: false, error: 'No file upload!' });
  }
});

router.get('/info/:productId', upload.any(), (req, res, next) => {
  let productId = req.params.productId;
  let db = req.db;
  productModel.getFiles(db, productId)
    .then((rows) => {
      let files: any = [];
      rows.forEach(v => {
        files.push({
          product_id: v.product_id,
          picture: v.picture,
        });
      })
      res.send({ ok: true, rows: files });
    })
    .catch((error) => {
      res.send({ ok: false, error: error });
    })
    .finally(() => {
      db.destroy();
    });
});

export default router;