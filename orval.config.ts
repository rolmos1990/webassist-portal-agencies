import langStrings from './src/api/mocks/lang_strings.json'; // fixture JSON propia
import langStringsVersion from './src/api/mocks/lang_strings_version.json'; // fixture JSON propia
import idiomas from './src/api/mocks/idiomas.json'; // fixture JSON propia
import login from './src/api/mocks/login.json'; // fixture JSON propia
import { faker } from '@faker-js/faker';

export default {
  weassist: {
    input: './openapi.yaml',
    output: {
      target: './src/api/generated.ts',
      schemas: './src/api/schemas',
      client: 'react-query',
      mock: true, 
      mode: 'split', 
      override: {  // aquí dentro de output
        mutator: {
          path: './src/api/custom-fetcher.ts',
          name: 'customFetch',
        },

        mock: {
          useExamples: true,            // usa example/examples del spec si existen
          generateEachHttpStatus: true, // mocks para todos los responses del spec
          properties: {
            '/.*\\.id$/': () => faker.string.uuid(),      // cualquier propiedad que termine en "id"
            email: () => faker.internet.email(),          // propiedad "email"
            '/user\\.name/': 'Ramon',                     // ruta exacta user.name
          },
        },

        operations: {
          getIdiomaLangStrings: {
            mock: {
              // opción A: fixture estática desde JSON
              data: () => langStrings,
            },
          },
          getIdiomaLangStringsVersion: {
            mock: {
              // opción A: fixture estática desde JSON
              data: () => langStringsVersion,
            },
          },
          getIdiomas: {
            mock: {
              // opción A: fixture estática desde JSON
              data: () => idiomas,
            },
          },
          postIdiomaLogin: {
            mock: {
              // opción A: fixture estática desde JSON
              data: () => login,
            },
          },
        },

          createAgente: {
            mock: {
              // opción B: función dinámica con acceso al request
              data: () => ({
                ok: true,
                data: {
                  id: faker.string.uuid(),
                  createdAt: new Date().toISOString(),
                },
              }),
            },
          },
      },
    },
  },
};
