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

  saveUpload(knex: Knex, data: any, productId) {
    return knex('product')
      .update(data[0])
      .where('product_id', productId);
  }

  save(knex: Knex, data: any) {
    return knex('product')
      .insert(data);
  }
  getFiles(knex: Knex, productId) {
    return knex('product')
      .where('product_id', productId);
  }
}