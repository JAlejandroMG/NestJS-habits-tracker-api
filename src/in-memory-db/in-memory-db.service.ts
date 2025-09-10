import { Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryDbService {
  private store: Map<string, any[]> = new Map();

  private getEntityStoreByName(entityName: string) {
    if (!this.store.has(entityName)) {
      this.store.set(entityName, []);
    }

    return this.store.get(entityName) as any[];
  }

  create(entityName: string, input) {
    this.getEntityStoreByName(entityName).push({
      ...input,
      id: new Date().getTime(),
    });

    return input;
  }

  deleteOneBy(entityName: string, filter: { [key: string]: any }) {
    const entities = this.getEntityStoreByName(entityName);

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

  findAll(entityName: string, query: { limit?: number; sortBy?: string } = {}) {
    const { limit, sortBy } = query;
    const results = this.getEntityStoreByName(entityName);

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

  findOneBy(entityName: string, filter: { [key: string]: any }) {
    const entities = this.getEntityStoreByName(entityName);

    return entities.find((entity) => {
      const isMatchingFilter = Object.keys(filter).every(
        (key) => entity[key] === filter[key],
      );

      return isMatchingFilter;
    });
  }

  updateOneBy(
    entityName: string,
    filter: { [key: string]: any },
    updatedInput,
  ) {
    const entities = this.getEntityStoreByName(entityName);

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
