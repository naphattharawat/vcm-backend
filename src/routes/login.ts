/// <reference path="../../typings.d.ts" />

import * as express from 'express';
import { Router, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import * as crypto from 'crypto';

import { Login } from '../models/login';

import { Jwt } from '../models/jwt';

const loginModel = new Login();
const jwt = new Jwt();

const router: Router = Router();

router.post('/', async (req: Request, res: Response) => {
  let username: string = req.body.username;
  let password: string = req.body.password;

  let db = req.db;

  try {
    // let encPassword = crypto.createHash('md5').update(password).digest('hex');
    let rs: any = await loginModel.doCustomerLogin(db, username, password);

    if (rs.length) {

      let payload = {
        fullname: `${rs[0].name} ${rs[0].lname}`,
        id: rs[0].user_id,
        type: 'customer'
      }

      let token = jwt.sign(payload);
      res.send({ ok: true, token: token, code: HttpStatus.OK });
    } else {
      res.send({ ok: false, error: 'Login failed!', code: HttpStatus.UNAUTHORIZED });
    }
  } catch (error) {
    res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
  }

});

router.post('/technician', async (req: Request, res: Response) => {
  let username: string = req.body.username;
  let password: string = req.body.password;

  let db = req.db;

  try {
    let encPassword = crypto.createHash('md5').update(password).digest('hex');
    let rs: any = await loginModel.doTechnicianLogin(db, username, encPassword);

    if (rs.length) {

      let payload = {
        fullname: rs[0].fullname,
        username: username
      }

      let token = jwt.sign(payload);
      res.send({ ok: true, token: token, code: HttpStatus.OK });
    } else {
      res.send({ ok: false, error: 'Login failed!', code: HttpStatus.UNAUTHORIZED });
    }
  } catch (error) {
    res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
  }

});

export default router;