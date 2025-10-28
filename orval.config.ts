import * as mocks from "./src/api/mocks";
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
          getIdiomas:                               { mock: { data: () => mocks.idiomas } },
          getLangStrings:                           { mock: { data: () => mocks.lang_strings } },
          getLangStringsVersion:                    { mock: { data: () => mocks.lang_strings_version } },
          postAgenteLogin:                       { mock: { data: () => mocks.agente_login } },
          postLogout:                               { mock: { data: () => mocks.agente_logout } },
          getAgentesAgencia:                        { mock: { data: () => mocks.agentes_agencia } },
          getReporteVentasAgencia:                  { mock: { data: () => mocks.reporte_ventas_agencia } },
          getReporteVentasAgenciaFiltrado:          { mock: { data: () => mocks.reporte_ventas_agencia_filtrado } },
          getPerfilAgencia:                         { mock: { data: () => mocks.perfil_agencia } },
          getPerfilAgente:                          { mock: { data: () => mocks.perfil_agente } },
          getCotizacionesAgenteAgencia:             { mock: { data: () => mocks.cotizaciones_agente_agencia } },
          getPerfil:                                { mock: { data: () => mocks.perfil } },
          getAsistenciasAgenteAgencia:              { mock: { data: () => mocks.asistencias_agente_agencia } },
        }
        },
      },
    },
};
