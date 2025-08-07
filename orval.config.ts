// orval.config.ts
export default {
  weassist: {
    input: 'https://dev.weassistgroup.com/admin/site/openapi.yaml',
    output: {
      target: './src/api/generated.ts',
      schemas: './src/api/schemas',
      client: 'axios',
      override: {
        base: 'https://dev.weassistgroup.com',  // Aquí pones tu baseUrl
      },
    },
  },
};
