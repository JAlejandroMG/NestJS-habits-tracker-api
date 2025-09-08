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

  findAll(entityName: string) {
    return this.getEntityStoreByName(entityName);
  }
}
