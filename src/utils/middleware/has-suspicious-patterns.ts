export const hasSuspiciousPatterns = (value: string | Record<string, any>) => {
  if (!value) return false;

  if (typeof value === 'string') {
    const suspiciousPatterns = [
      /(javascript:|data:)/i,
      /(<script|<iframe)/i,
      /(onclick|onerror|onload)=/i,
    ];

    return suspiciousPatterns.some((pattern) => pattern.test(value));
  } else if (typeof value === 'object') {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.keys(value).some((key) => hasSuspiciousPatterns(value[key]));
  }

  return false;
};
