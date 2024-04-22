import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function populaBanco() {
  // Criar uma empresa
  prisma.company.create({
    data: {
      nickname: 'Minha Empresa Teste',
      trade_name: 'Empresa Teste Ltda',
      legal_name: 'Empresa de Teste Ltda',
      cnpj: '12345678901234',
      uf: 'SP',
      city: 'São Paulo',
      logo: 'logo.png',
    },
  });

  // Criar dois departamentos
  prisma.department.createMany({
    data: [{ name: 'Departamento A' }, { name: 'Departamento B' }],
  });

  // Criar três serviços
  prisma.service.createMany({
    data: [{ name: 'Compra' }, { name: 'Venda' }, { name: 'Troca' }],
  });

  // Criar um usuário
  prisma.user.create({
    data: {
      email: 'usuario@example.com',
      password: 'senha',
      name: 'Usuário Teste',
    },
  });
}

populaBanco()
  .catch((err) => console.log(err))
  .finally(async () => {
    prisma.$disconnect();
  });
