const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
(async () => {
  try {
    const v = await p.$queryRaw`SELECT version(), current_database(), current_user`;
    console.log('CONNECTED OK');
    console.log('DB:', v[0].current_database, '| USER:', v[0].current_user);
    const counts = {};
    for (const m of ['user', 'shipment', 'container', 'invoice', 'customer']) {
      try {
        counts[m] = await p[m].count();
      } catch {
        counts[m] = 'table missing';
      }
    }
    console.log('Counts:', JSON.stringify(counts));
  } catch (e) {
    console.error('CONNECTION FAILED:', e.message);
    process.exitCode = 1;
  } finally {
    await p.$disconnect();
  }
})();
