import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CAEX Tracking API',
      version: '1.0.0',
      description: 'API para consulta de estado e historial de envíos logísticos.',
    },
    servers: [{ url: 'http://localhost:3001' }],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        TokenRequest: {
          type: 'object',
          required: ['username', 'password'],
          properties: {
            username: { type: 'string', example: 'admin' },
            password: { type: 'string', example: 'caex2024' },
          },
        },
        TokenResponse: {
          type: 'object',
          properties: {
            token: { type: 'string', example: 'eyJhbGci...' },
            expires_in: { type: 'number', example: 86400 },
          },
        },
        HistorialEntry: {
          type: 'object',
          properties: {
            ubicacion: { type: 'string', example: 'Hub Quetzaltenango' },
            estado: { type: 'string', example: 'En Tránsito' },
            descripcion: { type: 'string', nullable: true, example: 'Paquete en camino.' },
            fecha_hora: { type: 'string', format: 'date-time' },
          },
        },
        TrackingResponse: {
          type: 'object',
          properties: {
            numero_guia: { type: 'string', example: 'CAEX-002' },
            estado_actual: { type: 'string', example: 'En Tránsito' },
            ubicacion_actual: { type: 'string', example: 'Hub Quetzaltenango' },
            destinatario: { type: 'string', nullable: true, example: 'Carlos Pérez' },
            historial: {
              type: 'array',
              items: { $ref: '#/components/schemas/HistorialEntry' },
            },
          },
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            error: { type: 'string' },
          },
        },
      },
    },
    paths: {
      '/health': {
        get: {
          tags: ['Sistema'],
          summary: 'Health check',
          responses: {
            '200': {
              description: 'Servicio operativo',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      status: { type: 'string', example: 'ok' },
                      service: { type: 'string', example: 'caex-tracking-api' },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/auth/token': {
        post: {
          tags: ['Autenticación'],
          summary: 'Obtener JWT',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: { $ref: '#/components/schemas/TokenRequest' },
              },
            },
          },
          responses: {
            '200': {
              description: 'Token generado',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/TokenResponse' },
                },
              },
            },
            '401': {
              description: 'Credenciales inválidas',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' },
                },
              },
            },
          },
        },
      },
      '/api/tracking/{guia}': {
        get: {
          tags: ['Tracking'],
          summary: 'Consultar estado e historial de una guía',
          security: [{ bearerAuth: [] }],
          parameters: [
            {
              name: 'guia',
              in: 'path',
              required: true,
              description: 'Número de guía (letras, números y guiones, 3–20 caracteres)',
              schema: { type: 'string', example: 'CAEX-001' },
            },
          ],
          responses: {
            '200': {
              description: 'Datos del envío',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/TrackingResponse' },
                },
              },
            },
            '400': {
              description: 'Número de guía inválido',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' },
                },
              },
            },
            '401': {
              description: 'Token inválido o expirado',
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/ErrorResponse' },
                },
              },
            },
            '404': {
              description: 'Guía no encontrada',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      error: { type: 'string', example: 'Guía no encontrada' },
                      codigo: { type: 'string', example: 'GUIA_NOT_FOUND' },
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  apis: [],
};

export const swaggerSpec = swaggerJsdoc(options);
