# Institution Management System (IMS)

A production-ready institution management web application built with Next.js, Prisma, PostgreSQL, Tailwind CSS, and shadcn/ui.

## Setup Instructions

### Prerequisites
- Node.js 18+ installed
- PostgreSQL 14+ running locally or accessible remotely

### Database Setup

#### Option 1: Local PostgreSQL (macOS)
```bash
# Install PostgreSQL
brew install postgresql@17

# Start the service
brew services start postgresql@17

# Create database
createdb ims_db
```

#### Option 2: Cloud PostgreSQL
Use Supabase, Neon, or Railway for hosting.

### Application Setup

1. **Update `.env.local`** with your PostgreSQL connection string:
```bash
DATABASE_URL="postgresql://username:password@localhost:5432/ims_db"
```

2. **Run Prisma migrations**:
```bash
npx prisma migrate dev --name init
```

This will:
- Create all database tables
- Generate Prisma Client

3. **Start the development server**:
```bash
npm run dev
```

Visit `http://localhost:3000`

## Database Schema

### Hierarchy
```
Institution
├── Shifts
├── Programs (GRADUATE | UNDERGRADUATE)
└── Departments
    └── Teachers
```

### Key Features
- ✅ Strict parent-child relationships (cascade delete)
- ✅ Full CRUD for all entities
- ✅ Type-safe with TypeScript + Prisma
- ✅ Tailwind CSS + shadcn/ui for styling
- ✅ Nested routing (App Router)

## Project Structure
```
/app              # Next.js App Router pages
/components       # Reusable React components
/lib              # Utility functions
/prisma           # Database schema & migrations
/public           # Static assets
```
