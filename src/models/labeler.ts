import * as Knex from 'knex';

export class LabelerModel {

  labelerAutoComplete(db: Knex, query: string) {
    const _query = `%${query}%`;
    return db('supplier')
      .where(w => {
        w.where('supplier_name', 'like', _query)
          .orWhere('note', 'like', _query)
      });
  }

  list(knex: Knex) {
    return knex('supplier')
      .orderBy('supplier_name', 'DESC')
  }
  update(knex: Knex, labelerId, data) {
    return knex('supplier')
      .update(data)
      .where('supplier_id', labelerId);
  }
  save(knex: Knex, data) {
    return knex('supplier')
      .insert(data, 'supplier_id');
  }

  removeTel(knex: Knex, labelerId) {
    return knex('supplier_tel')
      .where('supplier_id', labelerId)
      .del();
  }

  saveTel(knex: Knex, data) {
    return knex('supplier_tel')
      .insert(data);
  }

  removeFax(knex: Knex, labelerId) {
    return knex('supplier_fax')
      .where('supplier_id', labelerId)
      .del();
  }

  saveFax(knex: Knex, data) {
    return knex('supplier_fax')
      .insert(data);
  }

  removeContact(knex: Knex, labelerId) {
    return knex('supplier_contact')
      .where('supplier_id', labelerId)
      .del();
  }

  saveContact(knex: Knex, data) {
    return knex('supplier_contact')
      .insert(data);
  }

  info(knex: Knex, labelerId) {
    return knex('supplier')
      .where('supplier_id', labelerId)
  }

  getTelephone(knex: Knex, labelerId) {
    return knex('supplier_tel')
      .where('supplier_id', labelerId)
  }

  getFax(knex: Knex, labelerId) {
    return knex('supplier_fax')
      .where('supplier_id', labelerId)
  }

  getContact(knex: Knex, labelerId) {
    return knex('supplier_contact')
      .where('supplier_id', labelerId)
  }

  getProduct(knex: Knex, labelerId) {
    let subIn = knex('receives as r')
      .select('rd.product_id')
      .join('receive_details as rd', 'rd.receive_id', 'r.receive_id')
      .groupBy('rd.product_id')
      .where('r.supplier_id', labelerId);

    let sql = knex('product')
      .whereIn('product_id', subIn)
    console.log(sql.toString());
    return sql;


  }

  removeMachine(knex: Knex, machineId) {
    return knex('machines')
      .update({ 'supplier_id': null })
      .where('machine_id', machineId)
  }

  // listTotal(knex: Knex) {
  //   return knex('supplier')
  //     .count('*').as('count')
  //     .orderBy('name', 'DESC')
  // }

  listSearch(knex: Knex, query) {
    const q = `%${query}%`;
    return knex('supplier')
      .orderBy('supplier_name', 'DESC')
      .where((w) => {
        w.orWhere('supplier_name', 'LIKE', q)
        w.orWhere('address', 'LIKE', q)
        w.orWhere('note', 'LIKE', q)
      })
  }
  // listSearchTotal(knex: Knex, query) {
  //   const q = `%${query}%`;
  //   return knex('supplier')
  //     .count('*').as('count')
  //     .where((w) => {
  //       w.where('name', 'LIKE', q)
  //       w.where('address', 'LIKE', q)
  //       w.where('note', 'LIKE', q)
  //     })
  // }


  delete(knex: Knex, labelerId) {
    return knex('supplier')
      .update({ 'status': 0 })
      .where('supplier_id', labelerId);
  }


}