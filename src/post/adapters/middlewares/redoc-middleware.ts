import redoc from 'redoc-express';

export function setupRedoc(app: any) {
  const redocOptions = {
    title: 'Blog - Techchallenge2',

    version: '1.0',

    specUrl: '/api-json',
  };

  app.use('/docs', redoc(redocOptions));
}
