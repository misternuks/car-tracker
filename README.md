# Demonstration Web Application
This simple full-stack web application demonstrates RESTful design, CRUD APIs, and database integration using Node.js for backend, Next.js for the framework, React.js for the frontend, TypeScript as the main language, Prisma as the ORM for the PostgreSQL database.

The app was created in Ubuntu, ZSH, and VSCode, and version tracked with Git.

## Installation

You need Node.JS 14 or higher and PostgreSQL installed before setting up the app.

1. Clone the repository: git clone https://github.com/misternuks/car-tracker.git

2. Navigate to the directory

3. Install required dependencies: npm install

4. Set up a PostgreSQL database: createdb car_tracker_db

Add an .env file in the root directory and configure the environment variables for Prisma to use: DATABASE_URL="postgresql://<username>:<password>@localhost:5432/<your_database_name>?schema=public"

Replace username, password, and your_database_name accordingly.

5. Set up Prisma: npx prisma migrate dev --name init , then generate the client: npx prisma generate

6. Run the development server: npm run dev

7. Open the browser and go to http://localhost:3000

8. Run the TypeScript build as necessary: npm run build

## Additional Features
Custom CSS classes
Tailwind CSS classes
