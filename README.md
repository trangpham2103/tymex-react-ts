# TymeX Assignment

A frontend assignment project built using React, TypeScript, and Vite. 

## 🔗 Live Demo

- Frontend: [https://tymex-react-ts.vercel.app](https://tymex-react-ts.vercel.app)
- Backend (Mock API): [https://tymex-react-ts.onrender.com/products](https://tymex-react-ts.onrender.com/products)

## 🧩 Features

- Fetch product data from API
- Search and filter by multiple criteria
- Load more
- Responsive UI
- Handle:
  - Loading state
  - Empty / No data
  - Error scenarios
- Unit Test Coverage > 40% (Current: **56.11%** using Vitest)
- Prettier + ESLint for consistent code style

## 🛠️ Tech Stack

- React + TypeScript
- Vite
- JSON Server (as mock API)
- Prettier + ESLint
- Vitest (for testing)
- Deployment: Vercel (Frontend) & Render (Backend)

## 📦 Setup Instructions

### 1. Clone the Repository

   ```
   git clone https://github.com/trangpham2103/tymex-react-ts.git
   cd tymex-react-ts
   ```

### 2. Install Dependencies

   ```
   npm install
   ```

### 3. Configure Environment Variables

Create a `.env` file in the root directory with the following content:

   ```
   VITE_API_BASE_URL=http://localhost:5005
   ```

This URL points to the local mock server for development.

### 4. Run the Project Locally

Run both the frontend and backend concurrently using:

   ```
   npm run dev
   ```

- Frontend: http://localhost:5173  
- Backend API: http://localhost:5005/products

### 5. Run Tests

To execute all unit tests:

   ```
   npm run test
   ```

To check test coverage:
   ```
   npm run test:coverage
   ```

## 📁 Resources

### Design

- [Wireframe](https://github.com/trangpham2103/tymex-react-ts/raw/main/resources/Wireframe.png)


### Mock Data

- API Endpoint: [https://tymex-react-ts.onrender.com/products](https://tymex-react-ts.onrender.com/products)
- Local JSON mock: `server/db.json`




