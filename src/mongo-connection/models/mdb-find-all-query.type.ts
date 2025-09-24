export type FindAllQuery<EntityModel> = {
  limit?: number;
  sortBy?: Extract<keyof EntityModel, string>; //* Only sort by property that are string
};
