// config/env.ts
export const getEnvVariable = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is not defined`);
  }
  return value;
};

export const config = {
  mongodb: {
    url: getEnvVariable('MONGODB_URL'),
  },
  
};
