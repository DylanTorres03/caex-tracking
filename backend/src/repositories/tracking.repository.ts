import { prisma } from '../db/prisma';

export async function findGuiaByNumero(numeroGuia: string) {
  return prisma.guia.findUnique({
    where: { numeroGuia: numeroGuia.toUpperCase() },
    include: {
      historial: {
        orderBy: { fechaHora: 'desc' },
      },
    },
  });
}
