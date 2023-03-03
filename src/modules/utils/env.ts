import { WithoutEnvError } from "./error";

export const EnvironmentalVariables = {
  prod: "prod",
  stg: "stg",
  dev: "dev",
  local: "local",
} as const;

export type EnvironmentalVariableType =
  (typeof EnvironmentalVariables)[keyof typeof EnvironmentalVariables];

const stub = (variableName: string): never => {
  throw new WithoutEnvError(variableName);
};

type Env = {
  clientEnv: EnvironmentalVariableType;
  domain: string;
  apiUrl: string;
  apiKey: string;
  isMaintenance: boolean;
};

export const env: Env = {
  clientEnv: Object.values(EnvironmentalVariables).some(
    (v) => v === process.env.NEXT_PUBLIC_CLIENT_ENV
  )
    ? (process.env.NEXT_PUBLIC_CLIENT_ENV as EnvironmentalVariableType)
    : stub("CLIENT_ENV"),
  domain: process.env.NEXT_PUBLIC_DOMAIN || stub("DOMAIN"),
  apiUrl: process.env.NEXT_PUBLIC_API_URL || stub("API_URL"),
  apiKey: process.env.NEXT_PUBLIC_API_KEY || stub("API_KEY"),
  isMaintenance: process.env.NEXT_PUBLIC_IS_MAINTENANCE === "true",
};
