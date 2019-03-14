import {Entity, model, property} from '@loopback/repository';

@model({settings: {"strict":false}})
export class Ventas extends Entity {
  @property({
    type: 'number',
    id: true,
    autoIncrement:100000,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  product: string;

  @property({
    type: 'number',
    required: true,
    default: 0,
  })
  price: number;

  @property({
    type: 'number',
    required: true,
    default: 0,
  })
  existence: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  [prop: string]: any;

  constructor(data?: Partial<Ventas>) {
    super(data);
  }
}
