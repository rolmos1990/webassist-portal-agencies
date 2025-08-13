export default {
  weassist: {
    input: 'https://dev.weassistgroup.com/admin/site/openapi.yaml',
    output: {
      target: './src/api/generated.ts',
      schemas: './src/api/schemas',
      client: 'react-query',
      override: {  // aquí dentro de output
        mutator: {
          path: './src/api/custom-fetcher.ts',
          name: 'customFetch',
        },
      },
    },
  },
};
