# Todo List App - Setup Instructions

## Prerequisites
- Azure Account (free tier works)
- .NET 8 SDK
- Node.js 18+ and npm
- Visual Studio Code or Visual Studio
- MySQL Workbench (optional)

## Step 1: Azure MySQL Database Setup

### Option A: Azure Database for MySQL Flexible Server (Recommended)

1. **Create MySQL Server on Azure:**
   ```powershell
   # Login to Azure
   az login
   
   # Create resource group
   az group create --name rg-todolist --location westus3
   
   # Create MySQL Flexible Server
   az mysql flexible-server create `
     --resource-group rg-todolist-02 `
     --name mysql-todolist-server `
     --location eastus `
     --admin-user dbadmin `
     --admin-password YourSecurePassword123! `
     --sku-name Standard_B1ms `
     --tier Burstable `
     --public-access 0.0.0.0 `
     --storage-size 32 `
     --version 8.0
   
   # Create database
   az mysql flexible-server db create `
     --resource-group rg-todolist-02 `
     --server-name mysql-todolist-server `
     --database-name TodoDB
   
   # Configure firewall (allow your IP)
   az mysql flexible-server firewall-rule create `
     --resource-group rg-todolist-02 `
     --name mysql-todolist-server `
     --rule-name AllowMyIP `
     --start-ip-address 192.168.2.240 `
     --end-ip-address 192.168.2.240
   ```

2. **Get Connection String:**
   - Server: `mysql-todolist-server.mysql.database.azure.com`
   - Username: `dbadmin`
   - Password: `YourSecurePassword123!`
   - Database: `TodoDB`

### Option B: Local MySQL Setup (For Development)

1. Install MySQL Server locally
2. Create database using `database/init.sql`
3. Update connection string in `backend/TodoApi/appsettings.Development.json`

## Step 2: Run Database Migration

1. Navigate to `database/` folder
2. Connect to your MySQL server using MySQL Workbench or command line
3. Run `init.sql` script

## Step 3: Backend Setup

1. Navigate to `backend/TodoApi`
2. Update `appsettings.json` with your MySQL connection string
3. Restore and run:
   ```powershell
   dotnet restore
   dotnet run
   ```
4. API will be available at `http://localhost:5000`
5. Swagger UI: `http://localhost:5000/swagger`

## Step 4: Frontend Setup

1. Navigate to `frontend/todo-app`
2. Install dependencies:
   ```powershell
   npm install
   ```
3. Update `src/environments/environment.ts` with backend URL if needed
4. Run:
   ```powershell
   npm start
   ```
5. App will be available at `http://localhost:4200`

## Step 5: Deploy to Azure (Optional)

### Deploy Backend as Azure App Service:
```powershell
# Create App Service Plan
az appservice plan create `
  --name plan-todoapi `
  --resource-group rg-todolist `
  --sku FREE `
  --is-linux

# Create Web App
az webapp create `
  --resource-group rg-todolist `
  --plan plan-todoapi `
  --name todoapi-yourname `
  --runtime "DOTNET|8.0"

# Deploy
cd backend/TodoApi
dotnet publish -c Release
cd bin/Release/net8.0/publish
Compress-Archive -Path * -DestinationPath deploy.zip
az webapp deploy --resource-group rg-todolist --name todoapi-yourname --src-path deploy.zip
```

### Deploy Frontend as Azure Static Web App:
```powershell
# Build Angular app
cd frontend/todo-app
npm run build

# Deploy to Azure Static Web Apps (via portal or CLI)
az staticwebapp create `
  --name todo-frontend `
  --resource-group rg-todolist `
  --location eastus `
  --source ./dist/todo-app/browser `
  --branch main
```

## Troubleshooting

### Backend issues:
- Ensure .NET 8 SDK is installed: `dotnet --version`
- Check MySQL connection string is correct
- Verify firewall rules allow your IP

### Frontend issues:
- Ensure Node.js is installed: `node --version`
- Clear npm cache: `npm cache clean --force`
- Check CORS settings in backend allow `http://localhost:4200`

### Database issues:
- Test connection using MySQL Workbench
- Verify database and table exist
- Check user permissions
