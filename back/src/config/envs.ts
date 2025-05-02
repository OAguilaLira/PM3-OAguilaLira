import "dotenv/config";

let enviromentVariable = null;
let missingRequiredEnvVars: string[] = [];
function addEnviromentVariable(
  enviaromentVariableName: string,
  required: boolean = false
) {
  enviromentVariable = process.env[enviaromentVariableName];
  if (!enviromentVariable && required) {
    missingRequiredEnvVars.push(enviaromentVariableName);
  }
  return enviromentVariable;
}

export const config = {
  PORT: addEnviromentVariable("PORT", true),
  DB_HOST: addEnviromentVariable("DB_HOST", true),
  DB_PORT: addEnviromentVariable("DB_PORT", true),
  DB_USERNAME: addEnviromentVariable("DB_USERNAME", true),
  DB_PASSWORD: addEnviromentVariable("DB_PASSWORD", true),
  DB_NAME: addEnviromentVariable("DB_NAME", true),
};

if (missingRequiredEnvVars.length) {
  throw new Error(
    `Falta establecer las siguientes variables de entorno: ${missingRequiredEnvVars.join(
      ", "
    )}`
  );
}
