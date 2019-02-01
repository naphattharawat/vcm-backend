import Knex = require('knex');
import * as moment from 'moment';

export class SerialModel {

  getSerialInfo(knex: Knex, type: string, year: string) {
    return knex('serials as sr')
      .where('sr.type', type)
      .where('sr.year', year)
      .limit(1);
  }

  insertSerialInfo(knex: Knex, data) {
    return knex('serials')
      .insert(data);
  }

  getSerialDetail(knex: Knex, type: string) {
    return knex('serials as sr')
      .where('sr.type', type)
      .limit(1);
  }

  async getSerial(knex: Knex, type: string, year) {
    let serialInfo = await this.getSerialInfo(knex, type, year);

    if (serialInfo.length) {
      let currentNo = serialInfo[0].no;
      let serialLength = 4;
      let serialPrefix = serialInfo[0].code;
      let serialYear = +year + 543;
      let _serialYear = serialYear.toString().substring(2);
      let newSerialNo = this.paddingNumber(currentNo, serialLength);
      let serialCode = 'PREFIX-YY-##';
      let sr: any = null;
      sr = serialCode.replace('PREFIX', serialPrefix).replace('YY', _serialYear).replace('##', newSerialNo);


      // update serial
      await this.updateSerial(knex, type, year);
      return sr;

    } else {
      let serialDetail = await this.getSerialDetail(knex, type);
      const obj = {
        type: serialDetail[0].type,
        code: serialDetail[0].code,
        no: 1,
        year: year
      }
      await this.insertSerialInfo(knex, obj);


      let currentNo = serialInfo[0].no;
      let serialLength = 4;
      let serialPrefix = serialInfo[0].code;
      let serialYear = +year + 543;
      let _serialYear = serialYear.toString().substring(2);
      let newSerialNo = this.paddingNumber(currentNo, serialLength);
      let serialCode = 'PREFIX-YY-##';
      let sr: any = null;
      sr = serialCode.replace('PREFIX', serialPrefix).replace('YY', _serialYear).replace('##', newSerialNo);


      // update serial
      await this.updateSerial(knex, type, year);

      // return serial
      return sr;
    }
  }

  paddingNumber(currentNo: number, serialLength: number) {
    if (currentNo.toString().length > serialLength) {
      serialLength = currentNo.toString().length;
    }
    var pad_char = '0';
    var pad = new Array(1 + serialLength).join(pad_char);
    return (pad + currentNo).slice(-pad.length);
  }

  async updateSerial(knex: Knex, type: string, year) {
    return knex('serials')
      .increment('no', 1)
      .where('type', type)
      .where('year', year);
  }
}