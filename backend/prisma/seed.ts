import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const existing = await prisma.guia.count();
  if (existing > 0) {
    console.log('Base de datos ya tiene datos. Seed omitido.');
    return;
  }

  console.log('Insertando guías de prueba...');

  const guias = [
    {
      numeroGuia: 'CAEX-001',
      estadoActual: 'Entregado',
      ubicacionActual: 'Zona 10, Guatemala Ciudad',
      destinatario: 'María López Fuentes',
      historial: [
        {
          ubicacion: 'Zona 10, Guatemala Ciudad',
          estado: 'Entregado',
          descripcion: 'Paquete entregado al destinatario. Firma confirmada.',
          fechaHora: new Date('2026-04-07T14:30:00Z'),
        },
        {
          ubicacion: 'Zona 10, Guatemala Ciudad',
          estado: 'En Reparto',
          descripcion: 'Paquete en ruta con mensajero para entrega final.',
          fechaHora: new Date('2026-04-07T08:00:00Z'),
        },
        {
          ubicacion: 'Bodega Central Mixco',
          estado: 'En Bodega',
          descripcion: 'Paquete procesado y listo para reparto.',
          fechaHora: new Date('2026-04-04T09:15:00Z'),
        },
        {
          ubicacion: 'Hub Central Mixco',
          estado: 'En Tránsito',
          descripcion: 'Paquete recibido en hub de distribución central.',
          fechaHora: new Date('2026-04-03T14:00:00Z'),
        },
        {
          ubicacion: 'Bodega Sur Escuintla',
          estado: 'Pendiente de Recolección',
          descripcion: 'Orden generada. En espera de recolección.',
          fechaHora: new Date('2026-04-01T08:00:00Z'),
        },
      ],
    },
    {
      numeroGuia: 'CAEX-002',
      estadoActual: 'En Tránsito',
      ubicacionActual: 'Hub Quetzaltenango',
      destinatario: 'Carlos Mendoza Ríos',
      historial: [
        {
          ubicacion: 'Hub Quetzaltenango',
          estado: 'En Tránsito',
          descripcion: 'Paquete en tránsito hacia hub central.',
          fechaHora: new Date('2026-04-07T16:00:00Z'),
        },
        {
          ubicacion: 'Bodega Quetzaltenango',
          estado: 'En Tránsito',
          descripcion: 'Paquete despachado desde bodega de origen.',
          fechaHora: new Date('2026-04-06T11:00:00Z'),
        },
        {
          ubicacion: 'Bodega Quetzaltenango',
          estado: 'Pendiente de Recolección',
          descripcion: 'Orden generada. En espera de recolección en origen.',
          fechaHora: new Date('2026-04-05T09:00:00Z'),
        },
      ],
    },
    {
      numeroGuia: 'CAEX-003',
      estadoActual: 'Retenido en Aduana',
      ubicacionActual: 'Aduana Puerto Quetzal',
      destinatario: 'Importaciones XYZ S.A.',
      historial: [
        {
          ubicacion: 'Aduana Puerto Quetzal',
          estado: 'Retenido en Aduana',
          descripcion: 'Paquete retenido por revisión de documentos aduaneros.',
          fechaHora: new Date('2026-04-03T10:00:00Z'),
        },
        {
          ubicacion: 'Puerto Quetzal',
          estado: 'En Tránsito',
          descripcion: 'Paquete ingresado a zona portuaria para inspección.',
          fechaHora: new Date('2026-04-02T08:00:00Z'),
        },
        {
          ubicacion: 'Aeropuerto Internacional La Aurora',
          estado: 'En Tránsito',
          descripcion: 'Paquete recibido en aduana aérea internacional.',
          fechaHora: new Date('2026-04-01T06:00:00Z'),
        },
      ],
    },
    {
      numeroGuia: 'CAEX-004',
      estadoActual: 'En Bodega',
      ubicacionActual: 'Bodega Central Mixco',
      destinatario: 'Roberto Ajú González',
      historial: [
        {
          ubicacion: 'Bodega Central Mixco',
          estado: 'En Bodega',
          descripcion: 'Paquete almacenado. Pendiente de programación de entrega.',
          fechaHora: new Date('2026-04-07T09:00:00Z'),
        },
        {
          ubicacion: 'Hub Chimaltenango',
          estado: 'En Tránsito',
          descripcion: 'Paquete en ruta desde hub occidental.',
          fechaHora: new Date('2026-04-06T12:00:00Z'),
        },
        {
          ubicacion: 'Bodega Xela',
          estado: 'Pendiente de Recolección',
          descripcion: 'Orden generada en bodega de origen Xela.',
          fechaHora: new Date('2026-04-05T08:00:00Z'),
        },
      ],
    },
    {
      numeroGuia: 'CAEX-005',
      estadoActual: 'Pendiente de Recolección',
      ubicacionActual: 'Bodega Sur Escuintla',
      destinatario: 'Fernanda Castillo',
      historial: [
        {
          ubicacion: 'Bodega Sur Escuintla',
          estado: 'Pendiente de Recolección',
          descripcion: 'Orden de envío generada. Esperando asignación de ruta.',
          fechaHora: new Date('2026-04-08T07:00:00Z'),
        },
      ],
    },
  ];

  for (const guia of guias) {
    await prisma.guia.create({
      data: {
        numeroGuia: guia.numeroGuia,
        estadoActual: guia.estadoActual,
        ubicacionActual: guia.ubicacionActual,
        destinatario: guia.destinatario,
        historial: {
          create: guia.historial,
        },
      },
    });
    console.log(`  ✓ ${guia.numeroGuia} - ${guia.estadoActual}`);
  }

  console.log('Seed completado.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
