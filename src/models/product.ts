import * as Knex from 'knex';

export class Product {
  productList(db: Knex, limit: number, offset: number) {
    return db('product')
      .limit(limit).offset(offset)
  }

  productListTotal(db: Knex) {
    return db('product')
      .count('* as total');
  }

  productListSearch(db: Knex, limit: number, offset: number, query: string) {
    const _query = `%${query}%`;
    return db('product')
      .where(w => {
        w.where('product_name_th', 'like', _query)
          .orWhere('product_name_en', 'like', _query)
      })
      .limit(limit).offset(offset)
  }

  productListSearchTotal(db: Knex, query: string) {
    const _query = `%${query}%`;
    return db('product')
      .where(w => {
        w.where('product_name_th', 'like', _query)
          .orWhere('product_name_en', 'like', _query)
      })
      .count('* as total');
  }

}