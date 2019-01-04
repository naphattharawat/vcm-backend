import * as Knex from 'knex';

export class Login {
  doCustomerLogin(db: Knex, username: string, password: string) {
    return db('user as u')
      .where('username', username)
      .where('password', password)
      .limit(1);
  }

  doTechnicianLogin(db: Knex, username: string, password: string) {
    return db('technicians as t')
      .select('t.technician_id', 't.first_name', 't.last_name')
      .where('username', username)
      .where('password', password)
      .limit(1);
  }
}