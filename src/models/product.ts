import * as Knex from 'knex';

export class Product {
  productList(db: Knex, limit: number, offset: number) {
    return db('product')
      .limit(limit).offset(offset)
      .where('status', 1);
  }

  productListTotal(db: Knex) {
    return db('product')
      .count('* as total')
      .where('status', 1);
  }

  productAutoComplete(db: Knex, query: string) {
    const _query = `%${query}%`;
    return db('product')
      .where(w => {
        w.where('product_name_th', 'like', _query)
          .orWhere('product_name_en', 'like', _query)
      })
      .where('status', 1)
      .limit(20);
  }

  productListSearch(db: Knex, limit: number, offset: number, query: string) {
    const _query = `%${query}%`;
    return db('product')
      .where(w => {
        w.where('product_name_th', 'like', _query)
          .orWhere('product_name_en', 'like', _query)
      })
      .where('status', 1)
      .limit(limit).offset(offset);
  }

  productListSearchTotal(db: Knex, query: string) {
    const _query = `%${query}%`;
    return db('product')
      .where(w => {
        w.where('product_name_th', 'like', _query)
          .orWhere('product_name_en', 'like', _query)
      })
      .count('* as total')
      .where('status', 1);
  }

  saveUpload(knex: Knex, data: any, productId) {
    const picture = data[0].picture.substr(7, data[0].picture.length - 7);
    console.log(data[0].picture);

    console.log('picture', picture);

    return knex('product')
      .update({ 'picture': picture })
      .where('product_id', productId);
  }

  save(knex: Knex, data: any) {
    return knex('product')
      .insert(data);
  }

  update(knex: Knex, productId, data: any) {
    return knex('product')
      .update(data)
      .where('product_id', productId);
  }

  info(knex: Knex, productId) {
    return knex('product')
      .where('product_id', productId);
  }

  delete(knex: Knex, productId) {
    return knex('product')
      .update({ 'status': 0 })
      .where('product_id', productId);
  }
}