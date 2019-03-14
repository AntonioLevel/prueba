import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getFilterSchemaFor,
  getWhereSchemaFor,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {Products} from '../models';
import {ProductsRepository} from '../repositories';

export class ProductsController {
  constructor(
    @repository(ProductsRepository)
    public productsRepository : ProductsRepository,
  ) {}

  @post('/products', {
    responses: {
      '200': {
        description: 'Products model instance',
        content: {'application/json': {schema: {'x-ts-type': Products}}},
      },
    },
  })
  async create(@requestBody() products: Products): Promise<Products> {
    return await this.productsRepository.create(products);
  }

  @get('/products/count', {
    responses: {
      '200': {
        description: 'Products model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Products)) where?: Where,
  ): Promise<Count> {
    return await this.productsRepository.count(where);
  }

  @get('/products', {
    responses: {
      '200': {
        description: 'Array of Products model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Products}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Products)) filter?: Filter,
  ): Promise<Products[]> {
    return await this.productsRepository.find(filter);
  }

  @patch('/products', {
    responses: {
      '200': {
        description: 'Products PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() products: Products,
    @param.query.object('where', getWhereSchemaFor(Products)) where?: Where,
  ): Promise<Count> {
    return await this.productsRepository.updateAll(products, where);
  }

  @get('/products/{id}', {
    responses: {
      '200': {
        description: 'Products model instance',
        content: {'application/json': {schema: {'x-ts-type': Products}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Products> {
    return await this.productsRepository.findById(id);
  }

  @patch('/products/{id}', {
    responses: {
      '204': {
        description: 'Products PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() products: Products,
  ): Promise<void> {
    await this.productsRepository.updateById(id, products);
  }

  @put('/products/{id}', {
    responses: {
      '204': {
        description: 'Products PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() products: Products,
  ): Promise<void> {
    await this.productsRepository.replaceById(id, products);
  }

  @del('/products/{id}', {
    responses: {
      '204': {
        description: 'Products DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.productsRepository.deleteById(id);
  }
}
