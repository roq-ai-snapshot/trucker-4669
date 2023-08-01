import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { transporterValidationSchema } from 'validationSchema/transporters';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.transporter
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getTransporterById();
    case 'PUT':
      return updateTransporterById();
    case 'DELETE':
      return deleteTransporterById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getTransporterById() {
    const data = await prisma.transporter.findFirst(convertQueryToPrismaUtil(req.query, 'transporter'));
    return res.status(200).json(data);
  }

  async function updateTransporterById() {
    await transporterValidationSchema.validate(req.body);
    const data = await prisma.transporter.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteTransporterById() {
    const data = await prisma.transporter.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}
