import { idiomas } from './src/api/mocks/idiomas.ts';
import { lang_strings } from './src/api/mocks/lang_strings';
import { lang_strings_version } from './src/api/mocks/lang_strings_version';
import { agente_login } from './src/api/mocks/agente_login';
import { agente_logout } from './src/api/mocks/agente_logout';
import { agentes_agencia } from './src/api/mocks/agentes_agencia';
import { reporte_ventas_agencia } from './src/api/mocks/reporte_ventas_agencia';
import { reporte_ventas_agencia_filtrado } from './src/api/mocks/reporte_ventas_agencia_filtrado';
import { perfil_agencia } from './src/api/mocks/perfil_agencia';
import { perfil_agente } from './src/api/mocks/perfil_agente';
import { cotizaciones_agente_agencia } from './src/api/mocks/cotizaciones_agente_agencia';
import { asistencias_agente_agencia } from './src/api/mocks/asistencias_agente_agencia';
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
      override: {
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
          getIdiomas:                               { mock: { data: idiomas } },
          getLangStrings:                           { mock: { data: () => lang_strings } },
          getLangStringsVersion:                    { mock: { data: lang_strings_version } },
          postAgenteLogin:                       { mock: { data: agente_login } },
          postLogout:                               { mock: { data: agente_logout } },
          getAgentesAgencia:                        { mock: { data: agentes_agencia } },
          getReporteVentasAgencia:                  { mock: { data: reporte_ventas_agencia } },
          getReporteVentasAgenciaFiltrado:          { mock: { data: reporte_ventas_agencia_filtrado } },
          getPerfilAgencia:                         { mock: { data: perfil_agencia } },
          getPerfilAgente:                          { mock: { data: perfil_agente } },
          getCotizacionesAgenteAgencia:             { mock: { data: cotizaciones_agente_agencia } },
          getAsistenciasAgenteAgencia:              { mock: { data: asistencias_agente_agencia } },
          getStatusCodes:                           { mock: { properties: { '/.*\\.id$/': () => faker.number.int() } } },
        }
        },
      },
    },
};
