import { Inject, Injectable } from '@nestjs/common';
import { StoreItemEntity } from './models/store-item.entity';
import { CreateEntityInput } from './models/create-entity-input.type';
import { UpdateEntityInput } from './models/update-entity-input.type';
import { findAllQuery } from './models/find-all-query.type';
import { findOneQuery } from './models/find-one-query.type';
import { DB_SEED_DATA_TOKEN } from 'src/utils/constants';

@Injectable()
export class InMemoryDbService {
  private store: Map<string, any[]> = new Map();

  //* Modified
  constructor(
    @Inject(DB_SEED_DATA_TOKEN)
    private readonly seedData: Record<string, StoreItemEntity[]>,
  ) {
    this.store = new Map(Object.entries(this.seedData));
  }

  private getEntityStoreByName<EntityModel extends StoreItemEntity>(
    entityName: string,
  ) {
    if (!this.store.has(entityName)) {
      this.store.set(entityName, []);
    }

    return this.store.get(entityName) as EntityModel[];
  }

  create<EntityModel extends StoreItemEntity>(
    entityName: string,
    input: CreateEntityInput<EntityModel>,
  ): EntityModel {
    const entityModel = {
      ...input,
      id: new Date().getTime(),
    } as EntityModel;

    this.getEntityStoreByName<EntityModel>(entityName).push(entityModel);

    return entityModel;
  }

  deleteOneBy<EntityModel extends StoreItemEntity>(
    entityName: string,
    query: findOneQuery<EntityModel>,
  ): EntityModel | undefined {
    const entities = this.getEntityStoreByName<EntityModel>(entityName);

    const entityIndex = entities.findIndex((entity) => {
      return Object.keys(query).every((key) => entity[key] === query[key]);
    });

    if (entityIndex === -1) {
      return undefined;
    }

    const deletedEntity = entities[entityIndex];
    entities.splice(entityIndex, 1);

    return deletedEntity;
  }

  findAll<EntityModel extends StoreItemEntity>(
    entityName: string,
    query: findAllQuery<EntityModel>,
  ): EntityModel[] {
    const { limit, sortBy } = query;
    const results = this.getEntityStoreByName<EntityModel>(entityName);

    if (sortBy) {
      results.sort((a, b) => {
        if (a[sortBy] < b[sortBy]) {
          return -1;
        }
        if (a[sortBy] > b[sortBy]) {
          return 1;
        }
        return 0;
      });
    }

    if (limit) {
      return results.slice(0, limit);
    }

    return results;
  }

  findOneBy<EntityModel extends StoreItemEntity>(
    entityName: string,
    query: findOneQuery<EntityModel>,
  ): EntityModel | undefined {
    const entities = this.getEntityStoreByName<EntityModel>(entityName);

    return entities.find((entity) => {
      const isMatchingFilter = Object.keys(query).every(
        (key) => entity[key] === query[key],
      );

      return isMatchingFilter;
    });
  }

  updateOneBy<EntityModel extends StoreItemEntity>(
    entityName: string,
    query: findOneQuery<EntityModel>,
    updatedInput: UpdateEntityInput<EntityModel>,
  ): EntityModel | undefined {
    const entities = this.getEntityStoreByName<EntityModel>(entityName);

    const entityIndex = entities.findIndex((entity) => {
      return Object.keys(query).every((key) => entity[key] === query[key]);
    });

    console.log('entityIndex: ', entityIndex);

    if (entityIndex === -1) {
      return undefined;
    }

    const updatedEntity = { ...entities[entityIndex], ...updatedInput };
    entities[entityIndex] = updatedEntity;

    return updatedEntity;
  }
}
