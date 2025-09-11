export type findOneQuery<EntityModel> = {
  [key in keyof EntityModel]?: EntityModel[key];
};
