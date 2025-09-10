import { Injectable } from '@nestjs/common';
import { StoreItemEntity } from './models/store-item.entity';

//* Modified
@Injectable()
export class InMemoryDbService {
  private store: Map<string, any[]> = new Map();

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
    input,
  ): EntityModel {
    this.getEntityStoreByName<EntityModel>(entityName).push({
      ...input,
      id: new Date().getTime(),
    });

    return input;
  }

  deleteOneBy<EntityModel extends StoreItemEntity>(
    entityName: string,
    filter: { [key: string]: any },
  ): EntityModel | undefined {
    const entities = this.getEntityStoreByName<EntityModel>(entityName);

    const entityIndex = entities.findIndex((entity) => {
      return Object.keys(filter).every((key) => entity[key] === filter[key]);
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
    query: { limit?: number; sortBy?: string } = {},
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
    filter: { [key: string]: any },
  ): EntityModel | undefined {
    const entities = this.getEntityStoreByName<EntityModel>(entityName);

    return entities.find((entity) => {
      const isMatchingFilter = Object.keys(filter).every(
        (key) => entity[key] === filter[key],
      );

      return isMatchingFilter;
    });
  }

  updateOneBy<EntityModel extends StoreItemEntity>(
    entityName: string,
    filter: { [key: string]: any },
    updatedInput,
  ): EntityModel | undefined {
    const entities = this.getEntityStoreByName<EntityModel>(entityName);

    const entityIndex = entities.findIndex((entity) => {
      return Object.keys(filter).every((key) => entity[key] === filter[key]);
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
