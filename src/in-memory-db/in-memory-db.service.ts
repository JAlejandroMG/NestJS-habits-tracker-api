import * as fs from 'fs';

import { Inject, Injectable, Optional } from '@nestjs/common';
import { StoreItemEntity } from './models/store-item.entity';
import { CreateEntityInput } from './models/create-entity-input.type';
import { UpdateEntityInput } from './models/update-entity-input.type';
import { FindAllQuery } from './models/find-all-query.type';
import { FindOneQuery } from './models/find-one-query.type';
import {
  DB_SEED_DATA_TOKEN,
  PERSIST_DATA_PATH_TOKEN,
} from 'src/utils/constants';

@Injectable()
export class InMemoryDbService {
  private store: Map<string, any[]> = new Map();

  constructor(
    @Inject(DB_SEED_DATA_TOKEN)
    private readonly seedData: Record<string, StoreItemEntity[]>,
    @Optional()
    @Inject(PERSIST_DATA_PATH_TOKEN)
    private readonly persistDataPath: string,
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

  private saveStore() {
    if (this.persistDataPath) {
      fs.writeFileSync(
        this.persistDataPath,
        JSON.stringify(Object.fromEntries(this.store.entries()), null, 2),
      );
    }
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
    this.saveStore();

    return entityModel;
  }

  deleteOneBy<EntityModel extends StoreItemEntity>(
    entityName: string,
    query: FindOneQuery<EntityModel>,
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
    this.saveStore();

    return deletedEntity;
  }

  findAll<EntityModel extends StoreItemEntity>(
    entityName: string,
    query: FindAllQuery<EntityModel>,
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
    query: FindOneQuery<EntityModel>,
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
    query: FindOneQuery<EntityModel>,
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
    this.saveStore();

    return updatedEntity;
  }
}
