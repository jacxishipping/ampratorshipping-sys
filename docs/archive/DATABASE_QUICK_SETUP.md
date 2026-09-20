# 🗄️ Database Quick Setup Guide

## ✅ Environment File Created!

The `.env.local` file has been created with secure secrets. Now you need to set up your database connection.

## 🎯 Option 1: Local PostgreSQL (Recommended for Development)

### Step 1: Install PostgreSQL
- **Windows**: Download from https://www.postgresql.org/download/windows/
- Or use PostgreSQL installer for Windows
- Default port: `5432`

### Step 2: Create Database
```sql
CREATE DATABASE amprator_shipping;
```

### Step 3: Update `.env.local`
Open `.env.local` and update the `DATABASE_URL`:
```env
DATABASE_URL="postgresql://postgres:your_password@localhost:5432/amprator_shipping"
```
Replace:
- `postgres` with your PostgreSQL username
- `your_password` with your PostgreSQL password
- `amprator_shipping` with your database name

## 🌐 Option 2: Cloud PostgreSQL (Recommended for Production)

### Popular Options:
1. **Supabase** (Free tier available)
   - Visit: https://supabase.com
   - Create project → Get connection string
   - Copy to `DATABASE_URL`

2. **Neon** (Serverless PostgreSQL)
   - Visit: https://neon.tech
   - Create database → Get connection string
   - Copy to `DATABASE_URL`

3. **Railway** (Free tier available)
   - Visit: https://railway.app
   - Create PostgreSQL service → Get connection string
   - Copy to `DATABASE_URL`

4. **Render**
   - Visit: https://render.com
   - Create PostgreSQL database → Get connection string
   - Copy to `DATABASE_URL`

### Step 3: Update `.env.local`
Simply paste the connection string from your cloud provider into `DATABASE_URL`.

## ⚡ Option 3: Docker PostgreSQL (Quick Setup)

If you have Docker installed:

```bash
docker run --name amprator-postgres \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=amprator_shipping \
  -p 5432:5432 \
  -d postgres:15
```

Then update `.env.local`:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/amprator_shipping"
```

## 🚀 After Setting Up Database

Once your `DATABASE_URL` is configured, run:

```bash
npm run db:setup
```

This will:
- ✅ Generate Prisma Client
- ✅ Create all tables
- ✅ Seed initial data (admin user, sample data)

## ✅ Test Your Setup

After running `npm run db:setup`, test your connection:

```bash
npm run db:studio
```

This opens Prisma Studio (database GUI) where you can see all your tables and data.

## 🐛 Troubleshooting

### Error: "Connection refused"
- Make sure PostgreSQL is running
- Check if port 5432 is correct
- Verify firewall settings

### Error: "Authentication failed"
- Double-check username and password in `DATABASE_URL`
- Ensure user has permission to create databases

### Error: "Database does not exist"
- Create the database manually or update connection string

## 📝 Quick Test

To verify your `.env.local` is working:

```bash
npx prisma validate
```

If this passes, your environment is set up correctly!

---

**Next Step**: Once database is connected, run `npm run db:setup` to initialize everything! 🚀

