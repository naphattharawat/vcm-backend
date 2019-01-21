/// <reference path="../../typings.d.ts" />

import { Router, Request, Response } from 'express';

const router: Router = Router();
import { MachineModel } from '../models/machine';


import * as path from 'path';
import * as fse from 'fs-extra';
import * as multer from 'multer';

const uploadDir = 'public/uploads';

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
const machineModel = new MachineModel();

router.post('/', async (req: Request, res: Response) => {
  try {
    const limit = req.body.limit;
    const offset = req.body.offset;
    const db = req.db;
    const rs = await machineModel.productList(db, limit, offset);
    const rsTotal = await machineModel.productListTotal(db);
    res.send({ ok: true, rows: rs, total: rsTotal[0].total });
  } catch (error) {
    console.log(error);
    res.send({ ok: false, error: error });
  }

});

router.post('/save', async (req: Request, res: Response) => {
  try {
    const data = req.body.data;
    const db = req.db;
    const rs = await machineModel.save(db, data);
    res.send({ ok: true, rows: rs });
  } catch (error) {
    res.send({ ok: false, error: error.message });
  }

});

router.put('/save', async (req: Request, res: Response) => {
  try {
    const data = req.body.data;
    const machineId = req.body.machineId;
    const db = req.db;
    await machineModel.update(db, machineId, data);
    res.send({ ok: true });
  } catch (error) {
    res.send({ ok: false, error: error.message });
  }

});

router.delete('/', async (req: Request, res: Response) => {
  try {
    const machineId = req.query.machineId;
    const db = req.db;
    await machineModel.delete(db, machineId);
    res.send({ ok: true });
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
    const rs = await machineModel.productListSearch(db, limit, offset, query);
    const rsTotal = await machineModel.productListSearchTotal(db, query);
    res.send({ ok: true, rows: rs, total: rsTotal[0].total });

  } catch (error) {
    res.send({ ok: false, error: error });
  }

});

router.get('/info', async (req: Request, res: Response) => {
  try {
    const machineId = req.query.machineId;
    const db = req.db;
    const rs = await machineModel.info(db, machineId);
    res.send({ ok: true, rows: rs[0] });

  } catch (error) {
    res.send({ ok: false, error: error });
  }

});


router.post('/image', upload.any(), (req: Request, res: Response) => {
  const db = req.db;
  const files = req.files;
  const machineId = req.body.machineId;
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
    machineModel.saveUpload(db, docs, machineId)
      .then((ids) => {
        res.send({ ok: true, files: docs });
      })
      .catch((error) => {
        res.send({ ok: false, error: error.message });
      });
  } else {
    res.send({ ok: false, error: 'No file upload!' });
  }
});

export default router;