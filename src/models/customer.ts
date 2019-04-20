import * as Knex from 'knex';

export class CustomerModel {
  list(knex: Knex) {
    return knex('customer')
      .orderBy('name', 'DESC')
  }
  update(knex: Knex, customerId, data) {
    return knex('customer')
      .update(data)
      .where('customer_id', customerId);
  }
  save(knex: Knex, data) {
    return knex('customer')
      .insert(data, 'customer_id');
  }

  removeTel(knex: Knex, customerId) {
    return knex('customer_tel')
      .where('customer_id', customerId)
      .del();
  }

  saveTel(knex: Knex, data) {
    return knex('customer_tel')
      .insert(data);
  }

  removeFax(knex: Knex, customerId) {
    return knex('customer_fax')
      .where('customer_id', customerId)
      .del();
  }

  saveFax(knex: Knex, data) {
    return knex('customer_fax')
      .insert(data);
  }

  removeContact(knex: Knex, customerId) {
    return knex('customer_contact')
      .where('customer_id', customerId)
      .del();
  }

  saveContact(knex: Knex, data) {
    return knex('customer_contact')
      .insert(data);
  }

  info(knex: Knex, customerId) {
    return knex('customer')
      .where('customer_id', customerId)
  }

  getTelephone(knex: Knex, customerId) {
    return knex('customer_tel')
      .where('customer_id', customerId)
  }

  getFax(knex: Knex, customerId) {
    return knex('customer_fax')
      .where('customer_id', customerId)
  }

  getContact(knex: Knex, customerId) {
    return knex('customer_contact')
      .where('customer_id', customerId)
  }

  getMachine(knex: Knex, customerId) {
    return knex('machines')
      .where('customer_id', customerId)
  }

  removeMachine(knex: Knex, machineId) {
    return knex('machines')
      .update({ 'customer_id': null })
      .where('machine_id', machineId)
  }

  // listTotal(knex: Knex) {
  //   return knex('customer')
  //     .count('*').as('count')
  //     .orderBy('name', 'DESC')
  // }

  listSearch(knex: Knex, query) {
    const q = `%${query}%`;
    return knex('customer')
      .orderBy('name', 'DESC')
      .where((w) => {
        w.orWhere('name', 'LIKE', q)
        w.orWhere('address', 'LIKE', q)
        w.orWhere('note', 'LIKE', q)
      })
  }
  // listSearchTotal(knex: Knex, query) {
  //   const q = `%${query}%`;
  //   return knex('customer')
  //     .count('*').as('count')
  //     .where((w) => {
  //       w.where('name', 'LIKE', q)
  //       w.where('address', 'LIKE', q)
  //       w.where('note', 'LIKE', q)
  //     })
  // }


  delete(knex: Knex, customerId) {
    return knex('customer')
      .update({ 'status': 0 })
      .where('customer_id', customerId);
  }


}