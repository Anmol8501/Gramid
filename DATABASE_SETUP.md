# Database Setup Guide

## Current Status
The application now has a **development database fallback** that works without MongoDB installation.

## Development Mode (Current Setup)
- **In-Memory Database**: Users are stored in memory during development
- **No Installation Required**: Works out of the box
- **Data Persistence**: Data is lost when the server restarts (normal for development)

## Production Database Setup

### Option 1: Local MongoDB
1. **Install MongoDB**:
   ```bash
   # Windows (using Chocolatey)
   choco install mongodb
   
   # Or download from: https://www.mongodb.com/try/download/community
   ```

2. **Start MongoDB**:
   ```bash
   mongod
   ```

3. **Set Environment Variable**:
   Create `.env.local` file:
   ```
   MONGODB_URI=mongodb://localhost:27017
   ```

### Option 2: MongoDB Atlas (Cloud)
1. **Create Account**: Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. **Create Cluster**: Follow the setup wizard
3. **Get Connection String**: Copy your connection string
4. **Set Environment Variable**:
   ```
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/
   ```

### Option 3: Continue with Development Database
The application will automatically use the in-memory database if MongoDB is not available.

## Testing the Fix

1. **Start the server**: `npm run dev`
2. **Go to signup**: `http://localhost:3001/auth/signup`
3. **Create an account**: Enter details and complete OTP verification
4. **Go to login**: `http://localhost:3001/auth/login`
5. **Login**: Use the same credentials

## Troubleshooting

- **"No User Found"**: Check console logs for database connection errors
- **Signup fails**: Check if OTP verification completed successfully
- **Database errors**: The app will automatically fallback to development database

## Console Logs to Watch

Look for these messages in your terminal:
```
Connecting to MongoDB: mongodb://localhost:27017
Successfully connected to MongoDB
User inserted successfully: [ID]
Database query: { email: 'test@example.com' } Result: Found
```

Or for development mode:
```
MongoDB connection error: [error]
MongoDB insert error, using development database: [error]
User stored in development database: test@example.com
```
