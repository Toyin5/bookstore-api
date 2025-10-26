# Getting Started with Bookstore API

This guide provides detailed instructions for setting up the Bookstore API development environment on your local machine.

## Detailed Setup Instructions

### 1. System Requirements

- Node.js v16 or higher
- PostgreSQL 12 or higher
- npm v7 or higher (comes with Node.js)
- Git

### 2. PostgreSQL Setup

1. Download and install PostgreSQL from [official website](https://www.postgresql.org/download/) or spin off a postgres container or just get a free one on supabase. The last option is the easiest
2. Create a new database:
   ```sql
   CREATE DATABASE bookstore;
   ```
3. Note down your PostgreSQL connection string, it should look like:
   ```
   postgresql://username:password@localhost:5432/bookstore
   ```

### 3. Project Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/Toyin5/bookstore-api.git
   cd bookstore-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create environment variables:
   copy the variables in `.env.example` to a `.env` file and replace the values

### 4. Database Migration and Seeding

1. Run database migrations:

   ```bash
   npm run migrate:up -- --url your_db_url
   ```

2. Seed the database with sample data (optional):
   ```bash
   npm run seed -- --url your_db_url
   ```

### 5. Starting the Development Server

1. Start the server in development mode:

   ```bash
   npm run dev
   ```

2. Verify the installation:
   - Open your browser or Postman
   - Visit `http://localhost:3000/health`
   - You should see a response indicating the API is running

3. Access the API documentation:
   - Visit `http://localhost:3000/api-docs`
   - You should see the Swagger documentation interface

## Troubleshooting Common Issues

### Database Connection Issues

1. Check SSL connection

Check whether your databse accepts non-ssl connections or not

### Node.js Issues

1. Verify Node.js version:

   ```bash
   node --version
   ```

   Should be v16 or higher

2. Clear npm cache if having dependency issues:
   ```bash
   npm cache clean --force
   rm -rf node_modules
   npm install
   ```

### TypeScript Compilation Issues

1. Check for TypeScript errors:

   ```bash
   npm run build
   ```

2. Update TypeScript dependencies:
   ```bash
   npm update typescript @types/node
   ```

## Development Tools

### Recommended VSCode Extensions

1. ESLint
2. Prettier
3. TypeScript and JavaScript Language Features
4. GitLens
5. Thunder Client (for API testing)

### API Testing Tools

1. Postman
2. Swagger UI (built-in at `/api-docs`)
3. Thunder Client VSCode extension

### Database Management

1. pgAdmin 4 (PostgreSQL GUI)
2. DBeaver (Universal Database Tool)

## Development Workflow

1. Create a new feature branch:

   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and ensure:
   - TypeScript compiles: `npm run build`
   - All tests pass: `npm test`

3. Commit your changes:

   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

4. Push and create a pull request

## Need Help?

- Check the [README.md](README.md) for project overview
- Review the API documentation at `/api-docs`
- Create an issue in the GitHub repository
- Contact the development team
