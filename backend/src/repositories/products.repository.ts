import {DefaultCrudRepository} from '@loopback/repository';
import {Products} from '../models';
import {PostgresDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ProductsRepository extends DefaultCrudRepository<
  Products,
  typeof Products.prototype.id
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(Products, dataSource);
  }
}
