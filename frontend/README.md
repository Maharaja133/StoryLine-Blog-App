# Storyline Blog App

A full-stack MERN blog app with user authentication and role-based post management.

## Features
- Register/Login with JWT Auth
- Create, edit, delete posts
- Role-based access (users manage only their posts)
- Responsive UI with Tailwind CSS

## Tech Stack
- MongoDB, Express, React, Node.js
- Tailwind CSS
- Axios, React Router

## Setup
1. Clone the repo
2. Create `.env` files in backend and frontend
3. Run:
   - `npm install` in both frontend & backend
   - `npm run dev` for frontend
   - `nodemon` or `node server.js` for backend


# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
