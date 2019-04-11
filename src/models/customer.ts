import * as Knex from 'knex';

export class CustomerModel {
  list(knex: Knex) {
    return knex('customer')
      .orderBy('name', 'DESC')
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