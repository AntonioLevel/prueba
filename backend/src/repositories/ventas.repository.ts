import {DefaultCrudRepository} from '@loopback/repository';
import {Ventas} from '../models';
import {PostgresDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class VentasRepository extends DefaultCrudRepository<
  Ventas,
  typeof Ventas.prototype.id
> {
  constructor(
    @inject('datasources.postgres') dataSource: PostgresDataSource,
  ) {
    super(Ventas, dataSource);
  }
}
