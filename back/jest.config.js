module.exports = {
    preset: 'ts-jest', // Usa ts-jest para que Jest entienda TypeScript
    testEnvironment: 'node', // Usamos un entorno de Node.js
    transform: {
      '^.+\\.ts$': 'ts-jest', // Transforma archivos .ts a JavaScript
    },
    globals: {
      'ts-jest': {
        tsconfig: 'tsconfig.json', // Usa tu archivo de configuración de TypeScript
      },
    },
  };
  