import * as Knex from 'knex';

export class ReceiveModel {
  receiveList(knex: Knex, limit: number, offset: number) {
    return knex('receives as r')
      .select('r.*', 's.supplier_name')
      .join('supplier as s', 's.supplier_id', 'r.supplier_id')
      .limit(limit).offset(offset)
      // .where('r.is_deleted', 'N')
      .orderBy('r.receive_code', 'DESC')
  }

  receiveListTotal(knex: Knex) {
    return knex('receives as r')
      .count('* as total')
      .join('supplier as s', 's.supplier_id', 'r.supplier_id')
    // .where('r.is_deleted', 'N');
  }

  productList(knex: Knex, receiveId) {
    return knex('receive_details as rd')
      .select('rd.*', 'p.product_name_th', 'p.product_name_en')
      .join('product as p', 'p.product_id', 'rd.product_id')
      .where({ 'rd.receive_id': receiveId });
  }

  receiveListSearch(knex: Knex, limit: number, offset: number, query: string) {
    const _query = `%${query}%`;
    return knex('receives as r')
      .select('r.*', 's.supplier_name')
      .join('supplier as s', 's.supplier_id', 'r.supplier_id')
      .where(w => {
        w.where('r.receive_code', 'like', _query)
        // .orWhere('machine_name_en', 'like', _query)
      })
      // .where('r.is_deleted', 'N')
      .orderBy('r.receive_code', 'DESC')
      .limit(limit).offset(offset);
  }

  receiveListSearchTotal(knex: Knex, query: string) {
    const _query = `%${query}%`;
    return knex('receives as r')
      .where(w => {
        w.where('receive_code', 'like', _query)
        // .orWhere('machine_name_en', 'like', _query)
      })
      .count('* as total')
      .join('supplier as s', 's.supplier_id', 'r.supplier_id')
    // .where('r.is_deleted', 'N');
  }


  save(knex: Knex, data: any) {
    return knex('receives')
      .insert(data);
  }

  update(knex: Knex, receiveId, data: any) {
    return knex('receives')
      .update(data)
      .where('receive_id', receiveId);
  }

  info(knex: Knex, receiveId) {
    return knex('receives')
      .where('receive_id', receiveId);
  }

  delete(knex: Knex, receiveId) {
    return knex('receives')
      .update({ 'is_deleted': 'Y' })
      .where('receive_id', receiveId);
  }
}