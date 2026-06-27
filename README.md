# Golf Cart Manager

## Overview
A full-stack web application built to manage a live database of golf carts. It features a responsive frontend UI that communicates with a custom REST API to perform live Create, Read, Update, and Delete (CRUD) operations on a PostgreSQL database.


Managing an internal transportation fleet manually often leads to confusion, scheduling conflicts, and inefficient routing. Without a real-time tracking system, dispatchers and facility managers struggle to keep up with which carts are available, their specific passenger capacities, and their current assigned pickup and drop-off points.

## How It Is Useful
This application replaces manual logs with a live, centralized dashboard. It gives managers a real-time overview of the entire fleet. Using the interface, you can instantly add new carts to the system, update their active routes and capacities, or delete carts that are out of service. This ensures smooth, organized logistics for large campuses or facilities.

## How to Use It

### 1. Database Configuration
Before running the application, you must connect it to your own local PostgreSQL database. 

Open `server.js` and locate the database connection block. You will need to change the `database` name, `user`, and `password` to match your local setup:

```javascript
const pool = new Pool({
    user: 'postgres',              // Change to your Postgres username
    host: 'localhost',
    database: 'security_database', // Change to your database name
    password: 'YOUR_PASSWORD',     // Change to your actual password
    port: 5432,                
});

## How to Run Locally
1. Clone the repository.
2. Ensure PostgreSQL is running locally.
3. Install backend dependencies:
   ```bash
   npm install
4. open the golfcart.html in your browser.
