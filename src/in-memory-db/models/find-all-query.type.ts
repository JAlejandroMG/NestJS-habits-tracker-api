export type findAllQuery<EntityModel> = {
  limit?: number;
  sortBy?: keyof EntityModel;
};
