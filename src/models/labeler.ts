import * as Knex from 'knex';

export class LabelerModel {
  labelerAutoComplete(db: Knex, query: string) {
    const _query = `%${query}%`;
    return db('supplier')
      .where(w => {
        w.where('supplier_name', 'like', _query)
          .orWhere('note', 'like', _query)
      })
      .where('status', 1);
  }
}