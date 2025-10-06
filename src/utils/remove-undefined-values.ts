export const removeUndefinedValues = <T extends Record<string, any>>(
  obj: T,
): Partial<T> =>
  Object.entries(obj)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    .filter(([_, value]) => value !== undefined)
    .reduce((acc, [key, value]) => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      acc[key] = value;
      return acc;
    }, {});
