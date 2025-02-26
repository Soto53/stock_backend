import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  const user = await prisma.user.create({
    data: { name, email },
  });
  res.json(user);
};

export const getUsers = async (req: Request, res: Response) => {
    const users = await prisma.user.findMany();
    res.json(users);
  };
    

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, email } = req.body;
    const user = await prisma.user.update({
      where: { id: Number(id) },
      data: { name, email },
    });
    res.json(user);
  };


export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    await prisma.user.delete({ where: { id: Number(id) } });
    res.json({ message: 'User deleted' });
  };

