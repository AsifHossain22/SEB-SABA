import app from './app';
import 'dotenv/config';

import { prisma } from './lib/prisma';

const PORT = process.env.PORT;

async function main() {
  try {
    // await prisma.$connect();
    console.log('Prisma database connected successfully!');

    app.listen(PORT, () => {
      console.log(`Prisma Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error starting the server', error);

    // await prisma.$disconnect();

    process.exit(1);
  }
}
main();
