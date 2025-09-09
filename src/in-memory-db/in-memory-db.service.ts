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
    this.getEntityStoreByName(entityName).push(input);

    return input;
  }

  //* Added
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

  findAll(entityName: string) {
    return this.getEntityStoreByName(entityName);
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

  //* Added
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
