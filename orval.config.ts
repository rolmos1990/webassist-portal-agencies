import { agents} from './src/api/mocks/agents.ts';
import { idiomas } from './src/api/mocks/idiomas.ts';
import { lang_strings } from './src/api/mocks/lang_strings.ts';
import { lang_strings_version } from './src/api/mocks/lang_strings_version.ts';
import { login } from './src/api/mocks/login.ts';

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
      tsconfig: './tsconfig.orval.json',
      override: {  // aquí dentro de output
        mutator: {
          path: './src/api/custom-fetcher.ts',
          name: 'customFetch',
        },

        mock: {
          useExamples: false,            // usa example/examples del spec si existen
          generateEachHttpStatus: true, // mocks para todos los responses del spec
          properties: {
            '/.*\\.id$/': () => faker.string.uuid(),      // cualquier propiedad que termine en "id"
            email: () => faker.internet.email(),          // propiedad "email"
            '/user\\.name/': 'Ramon',                     // ruta exacta user.name
          },
        },

        operations: {
          getIdiomas:                 { mock: { data: () => idiomas } },
          getLangStrings:             { mock: { data: () => lang_strings } },
          getLangStringsVersion:      { mock: { data: () => lang_strings_version } },
          postAgenteLogin:            { mock: { data: () => login } },
          postLogout:                 { mock: { data: () => agents } },
          getAgentesAgencia:          { mock: { data: () => agents } },
        },

          createAgent: {
            mock: {
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
