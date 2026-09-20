const { PrismaClient } = require('@prisma/client');
const p = new PrismaClient();
(async () => {
  try {
    const tables = await p.$queryRaw`
      SELECT table_name FROM information_schema.tables
      WHERE table_schema = 'public' ORDER BY table_name`;
    console.log('TABLES IN PUBLIC SCHEMA:', tables.length);
    for (const t of tables) console.log(' -', t.table_name);
    const names = tables.map(t => t.table_name);
    console.log('NAMES:', names.join(', '));
    const checks = ['User', 'Shipment', 'Container', 'Invoice', 'Customer'];
    console.log('Model table check:');
    for (const c of checks) console.log(` ${c}:`, names.includes(c) ? 'EXISTS' : 'MISSING');
  } catch (e) {
    console.error('FAILED:', e.message);
    process.exitCode = 1;
  } finally {
    await p.$disconnect();
  }
})();
