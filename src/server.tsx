import express from 'express';
import { OpenAPIBackend } from 'openapi-backend';

const api = new OpenAPIBackend({
  definition: './openapi.yaml',
  quick: true,              // compila rápido
});

api.register({
  notFound: (c, req, res) => res.status(404).json({ error: 'Not Found' }),
  validationFail: (c, req, res) => res.status(400).json({ error: c.validation.errors }),
  // mock por defecto usando examples/schema:
  // si quieres controlar endpoint por endpoint, registra aquí tus handlers
});

const app = express();
app.use(express.json());

app.use((req, res) => api.handleRequest(req as any, req, res));

api.init().then(() => {
  const port = process.env.PORT || 4010;
  app.listen(port, () => console.log(`Mock API on http://localhost:${port}`));
});
