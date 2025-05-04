export interface DataBaseConfig {
  DB_HOST: string;
  DB_PORT: number;
  DB_NAME: string;
  DB_USERNAME: string;
  DB_PASSWORD?: string;
  ssl?: boolean;
  schema?: string;
}
