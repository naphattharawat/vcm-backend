import * as Knex from 'knex';

export class MachineModel {
  productList(db: Knex, limit: number, offset: number) {
    return db('machines')
      .limit(limit).offset(offset)
      .where('status', 1)
      .whereNot('machine_id', '00000000');
  }

  productListTotal(db: Knex) {
    return db('machines')
      .count('* as total')
      .where('status', 1)
      .whereNot('machine_id', '00000000');;
  }

  productListSearch(db: Knex, limit: number, offset: number, query: string) {
    const _query = `%${query}%`;
    return db('machines')
      .where(w => {
        w.where('machine_name_th', 'like', _query)
          .orWhere('machine_name_en', 'like', _query)
      })
      .where('status', 1)
      .whereNot('machine_id', '00000000')
      .limit(limit).offset(offset);
  }

  productListSearchTotal(db: Knex, query: string) {
    const _query = `%${query}%`;
    return db('machines')
      .where(w => {
        w.where('machine_name_th', 'like', _query)
          .orWhere('machine_name_en', 'like', _query)
      })
      .count('* as total')
      .whereNot('machine_id', '00000000')
      .where('status', 1);
  }

  saveUpload(knex: Knex, data: any, machineId) {
    const picture = data[0].picture.substr(7, data[0].picture.length - 7);
    console.log(data[0].picture);

    console.log('picture', picture);

    return knex('product')
      .update({ 'picture': picture })
      .where('machine_id', machineId);
  }

  save(knex: Knex, data: any) {
    return knex('machines')
      .insert(data);
  }

  update(knex: Knex, machineId, data: any) {
    return knex('machines')
      .update(data)
      .where('machine_id', machineId);
  }

  info(knex: Knex, machineId) {
    return knex('machines')
      .where('machine_id', machineId);
  }

  delete(knex: Knex, machineId) {
    return knex('machines')
      .update({ 'status': 0 })
      .where('machine_id', machineId);
  }
}