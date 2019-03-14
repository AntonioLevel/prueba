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
import {Ventas} from '../models';
import {VentasRepository} from '../repositories';

export class VentasController {
  constructor(
    @repository(VentasRepository)
    public ventasRepository : VentasRepository,
  ) {}

  @post('/ventas', {
    responses: {
      '200': {
        description: 'Ventas model instance',
        content: {'application/json': {schema: {'x-ts-type': Ventas}}},
      },
    },
  })
  async create(@requestBody() ventas: Ventas): Promise<Ventas> {
    return await this.ventasRepository.create(ventas);
  }

  @get('/ventas/count', {
    responses: {
      '200': {
        description: 'Ventas model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.query.object('where', getWhereSchemaFor(Ventas)) where?: Where,
  ): Promise<Count> {
    return await this.ventasRepository.count(where);
  }

  @get('/ventas', {
    responses: {
      '200': {
        description: 'Array of Ventas model instances',
        content: {
          'application/json': {
            schema: {type: 'array', items: {'x-ts-type': Ventas}},
          },
        },
      },
    },
  })
  async find(
    @param.query.object('filter', getFilterSchemaFor(Ventas)) filter?: Filter,
  ): Promise<Ventas[]> {
    return await this.ventasRepository.find(filter);
  }

  @patch('/ventas', {
    responses: {
      '200': {
        description: 'Ventas PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody() ventas: Ventas,
    @param.query.object('where', getWhereSchemaFor(Ventas)) where?: Where,
  ): Promise<Count> {
    return await this.ventasRepository.updateAll(ventas, where);
  }

  @get('/ventas/{id}', {
    responses: {
      '200': {
        description: 'Ventas model instance',
        content: {'application/json': {schema: {'x-ts-type': Ventas}}},
      },
    },
  })
  async findById(@param.path.number('id') id: number): Promise<Ventas> {
    return await this.ventasRepository.findById(id);
  }

  @patch('/ventas/{id}', {
    responses: {
      '204': {
        description: 'Ventas PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody() ventas: Ventas,
  ): Promise<void> {
    await this.ventasRepository.updateById(id, ventas);
  }

  @put('/ventas/{id}', {
    responses: {
      '204': {
        description: 'Ventas PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() ventas: Ventas,
  ): Promise<void> {
    await this.ventasRepository.replaceById(id, ventas);
  }

  @del('/ventas/{id}', {
    responses: {
      '204': {
        description: 'Ventas DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.ventasRepository.deleteById(id);
  }
}
