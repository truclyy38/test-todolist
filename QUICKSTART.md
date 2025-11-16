# Quick Start Guide

## Prerequisites Installation

### 1. Install Required Software
- [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- [Node.js 18+](https://nodejs.org/)
- [Azure CLI](https://docs.microsoft.com/cli/azure/install-azure-cli) (optional, for Azure deployment)
- MySQL Server (local) or Azure MySQL (cloud)

### 2. Verify Installations
```powershell
dotnet --version    # Should show 8.0.x
node --version      # Should show 18.x or higher
npm --version       # Should show 9.x or higher
az --version        # Optional, for Azure deployments
```

## Local Development Setup

### Step 1: Setup MySQL Database

#### Option A: Local MySQL
1. Install MySQL Server on your machine
2. Create database and run migration:
```powershell
# Connect to MySQL
mysql -u root -p

# Run the init script
mysql -u root -p < database\init.sql
```

#### Option B: Azure MySQL (see SETUP.md for detailed instructions)

### Step 2: Configure Backend

1. Navigate to backend folder:
```powershell
cd backend\TodoApi
```

2. Update connection string in `appsettings.Development.json`:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=TodoDB;User=root;Password=YOUR_PASSWORD;"
  }
}
```

3. Restore dependencies and run:
```powershell
dotnet restore
dotnet run
```

4. Verify backend is running:
   - Open browser to `http://localhost:5000/swagger`
   - You should see the Swagger API documentation

### Step 3: Setup Frontend

1. Open new terminal and navigate to frontend:
```powershell
cd frontend\todo-app
```

2. Install dependencies:
```powershell
npm install
```

3. Start the development server:
```powershell
npm start
```

4. Open browser to `http://localhost:4200`

## Testing the Application

### Test Backend API (using Swagger)
1. Go to `http://localhost:5000/swagger`
2. Try the following:
   - **GET /api/todos** - Fetch all todos
   - **POST /api/todos** - Create a new todo
   ```json
   {
     "title": "Test Todo",
     "description": "This is a test",
     "status": "pending"
   }
   ```

### Test Frontend
1. Go to `http://localhost:4200`
2. Add a new todo using the form
3. See the todo appear in the list below

## Common Commands

### Backend
```powershell
# Run backend
cd backend\TodoApi
dotnet run

# Build for production
dotnet publish -c Release

# Watch mode (auto-restart on changes)
dotnet watch run
```

### Frontend
```powershell
# Run frontend
cd frontend\todo-app
npm start

# Build for production
npm run build

# The output will be in dist/todo-app/browser/
```

### Database
```powershell
# Connect to local MySQL
mysql -u root -p

# Show databases
SHOW DATABASES;

# Use TodoDB
USE TodoDB;

# Show all todos
SELECT * FROM Todos;
```

## Project Structure

```
test-todolist/
├── backend/
│   └── TodoApi/
│       ├── Controllers/      # API endpoints
│       ├── Models/          # Data models
│       ├── DTOs/            # Data transfer objects
│       ├── Data/            # Database context
│       ├── Program.cs       # Application entry point
│       └── appsettings.json # Configuration
├── frontend/
│   └── todo-app/
│       └── src/
│           ├── app/
│           │   ├── components/  # UI components
│           │   ├── services/    # API services
│           │   └── models/      # TypeScript models
│           ├── environments/    # Environment configs
│           └── styles.scss      # Global styles
└── database/
    └── init.sql             # Database schema
```

## Troubleshooting

### Backend won't start
- Check if port 5000 is already in use
- Verify MySQL is running and accessible
- Check connection string in appsettings.Development.json

### Frontend won't start
- Delete `node_modules` and run `npm install` again
- Check if port 4200 is available
- Clear npm cache: `npm cache clean --force`

### CORS errors
- Ensure backend is running on `http://localhost:5000`
- Verify CORS policy in `Program.cs` allows `http://localhost:4200`

### Database connection errors
- Verify MySQL service is running
- Check username and password in connection string
- Ensure TodoDB database exists

## Next Steps

1. **Add more features**: Implement UPDATE and DELETE operations
2. **Add authentication**: Secure your API with JWT tokens
3. **Deploy to Azure**: Follow SETUP.md for deployment instructions
4. **Add unit tests**: Write tests for both backend and frontend
5. **Improve UI**: Add more styling and animations

## Useful Links

- [ASP.NET Core Documentation](https://docs.microsoft.com/aspnet/core)
- [Angular Documentation](https://angular.io/docs)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Azure Documentation](https://docs.microsoft.com/azure)
