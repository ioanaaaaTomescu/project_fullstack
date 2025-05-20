import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const user = await prisma.user.upsert({
    where: { email: 'admin@test.com' },
    update: {},
    create: {
      email: 'admin@test.com',
      password: 'password123',
      name: 'Admin User',
    },
  });

  // Clear old invoices for this user
  await prisma.invoice.deleteMany({ where: { userId: user.id } });

  // Create 10 invoices with realistic data
  await prisma.invoice.createMany({
    data: [
      {
        vendor_name: 'Amazon Web Services',
        amount: 112.35,
        due_date: new Date('2025-05-15'),
        description: 'Monthly AWS infrastructure bill',
        paid: true,
        userId: user.id,
      },
      {
        vendor_name: 'Google Workspace',
        amount: 45.00,
        due_date: new Date('2025-05-10'),
        description: 'Business email and storage subscription',
        paid: true,
        userId: user.id,
      },
      {
        vendor_name: 'GitHub',
        amount: 20.00,
        due_date: new Date('2025-06-01'),
        description: 'Team plan for private repositories',
        paid: false,
        userId: user.id,
      },
      {
        vendor_name: 'Slack',
        amount: 80.00,
        due_date: new Date('2025-05-28'),
        description: 'Team communication subscription',
        paid: true,
        userId: user.id,
      },
      {
        vendor_name: 'Figma',
        amount: 30.99,
        due_date: new Date('2025-06-05'),
        description: 'Design tool license',
        paid: false,
        userId: user.id,
      },
      {
        vendor_name: 'Notion',
        amount: 10.00,
        due_date: new Date('2025-05-22'),
        description: 'Knowledge base and project management',
        paid: true,
        userId: user.id,
      },
      {
        vendor_name: 'Zoom',
        amount: 14.99,
        due_date: new Date('2025-06-10'),
        description: 'Pro account subscription',
        paid: false,
        userId: user.id,
      },
      {
        vendor_name: 'DigitalOcean',
        amount: 55.25,
        due_date: new Date('2025-05-30'),
        description: 'Droplet and storage hosting',
        paid: true,
        userId: user.id,
      },
      {
        vendor_name: 'Mailchimp',
        amount: 65.40,
        due_date: new Date('2025-06-12'),
        description: 'Marketing campaign email service',
        paid: false,
        userId: user.id,
      },
      {
        vendor_name: 'Stripe',
        amount: 5.00,
        due_date: new Date('2025-05-20'),
        description: 'Transaction fee settlement',
        paid: true,
        userId: user.id,
      },
    ],
  });

}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
