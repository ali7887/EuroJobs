function getEnvVariable(key: string): string {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Environment variable ${key} is not defined`);
  }

  return value;
}

export const env = {
  JWT_RESET_SECRET: () => getEnvVariable("JWT_RESET_SECRET"),
};
