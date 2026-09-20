// Quick env-parse diagnostics for the seed script issue
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '..', '.env');
for (const line of fs.readFileSync(envPath, 'utf8').split(/\r?\n/)) {
  if (!line || line.startsWith('#')) continue;
  const idx = line.indexOf('=');
  if (idx === -1) continue;
  const key = line.slice(0, idx).trim();
  let value = line.slice(idx + 1).trim();
  // Strip surrounding quotes (the seed script's original parser did NOT do this)
  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    value = value.slice(1, -1);
  }
  process.env[key] = value;
}

const u = process.env.amprator_DATABASE_URL || '';
console.log('parsed len:', u.length);
console.log('first 12:', JSON.stringify(u.slice(0, 12)));
console.log('last 12:', JSON.stringify(u.slice(-12)));
console.log('starts with postgres://:', u.startsWith('postgres://'));

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient({ datasourceUrl: u });
(async () => {
  try {
    const c = await prisma.user.count();
    console.log('SUCCESS - users:', c);
  } catch (e) {
    console.error('FAIL:', e.message.split('\n').slice(0, 3).join(' | '));
  } finally {
    await prisma.$disconnect();
  }
})();
