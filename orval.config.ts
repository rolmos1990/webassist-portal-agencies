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
      },
    },
  },
};
