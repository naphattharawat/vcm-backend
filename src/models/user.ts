import * as Knex from 'knex';

export class UserModel {

  list(knex: Knex) {
    return knex('user')
  }

  save(knex: Knex, data) {
    return knex('user')
      .insert(data)
  }

  update(knex: Knex, userId, data) {
    return knex('user')
      .update(data)
      .where('user_id', userId)
  }

  delete(knex: Knex, userId) {
    return knex('user')
      .del()
      .where('user_id', userId)
  }



}