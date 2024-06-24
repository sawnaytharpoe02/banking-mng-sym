---

# Banking Management System

## Overview

  This app is for practicing the foundations of Next.js and building a fully functional mini banking management system that utilizes all the latest features. It allows for efficient handling of customer accounts, transactions, and other basic banking-related activities. I gained practical experience from scratch to deployment.

## Features

- **📊 Dashboard Metrics**
- **📍 State and Township setup**
- **👥 Customers**
- **💼 Account Management**
- **💸 Transfer, Deposit, Withdraw**
- **📜 Transaction History**
- **🔍 Server-side pagination, searching**
- **⏳ Loading Skeleton**

## Tech Stack

- **Frontend**: Next.js(App router), TypeScript, Chadcn ui
- **Database**: PostgreSQL
- **Deployment**: Vercel, Render

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/sawnaytharpoe02/banking-mng-sym.git
   cd banking-mng-sym
   ```

2. Install dependencies:
   ```bash
   yarn install or npm install
   ```

3. Set up the database:
   - Ensure you have PostgreSQL installed.
   - Create a `.env` file in the root directory and configure your database URL:
     ```env
     DATABASE_URL="postgresql://user:password@localhost:5432/banking"
     ```

4. Run Prisma migrations:
   ```bash
   npx prisma migrate dev
   ```

5. Start the development server:
   ```bash
   yarn dev or npm run dev
   ```

## Usage

- Visit `http://localhost:3000` to view the application.
- Use the dashboard to manage accounts and transactions.

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

Feel free to modify or add any additional information as needed!