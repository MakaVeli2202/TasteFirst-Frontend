
Of course. A detailed checklist with commands is a great way to track progress and ensure no steps are missed. It serves as an excellent practical guide to complement the more descriptive weekly plans.

Here is the comprehensive checklist for the entire 10-week roadmap, structured with commands as you requested.

---

## **10-WEEK ROADMAP CHECKLIST: TasteFirst - ZERO TO PRODUCTION (REACT)**

This checklist provides a step-by-step guide with the necessary commands for building the `TasteFirst` application from scratch.

### **✅ Week 0: Prerequisites & Project Initialization**

*   **Environment Setup:**
    *   [x] Install Git.
    *   [x] Install Node.js & npm.
    *   [x] Install Visual Studio Code (VS Code).
*   **Git Configuration:**
    *   [x] Run `git config --global user.name "Your Name"`.
    *   [x] Run `git config --global user.email "your.email@example.com"`.
*   **React Project Creation:**
    *   [x] Navigate to your desired development directory.
    *   [x] Run `npm create vite@latest TasteFirst -- --template react`.
    *   [x] Run `cd TasteFirst`.
    *   [x] Run `npm install`.
*   **Initial Folder Structure:**
    *   [x] Run `mkdir src/{components,pages,context,services,hooks,utils,constants,types,styles}`.
    *   [x] Run `mkdir public/images`.
    *   [x] Run `mkdir -p .github/workflows`.
*   **Git Repository Setup:**
    *   [x] Run `git init`.
    *   [x] add necessary exclusions  to the `.gitignore` file.
    *   [x] Run `git add .`.
    *   [x] Create a new empty GitHub repository (e.g., `TasteFirst-Frontend`).
    *   [x] Run `git commit -m "feat: Initial React project setup with Vite and folder structure"`.
    *   [x] Run `git remote add origin <https://github.com/MakaVeli2202/TasteFirst-Frontend.git>`.
    *   [x] Run `git push -u origin main`.

### **✅ Week 1: App Overview, Core Frontend Architecture & Initial Pages**

*   **Install Core Frontend Dependencies:**
    *   [x] Run `npm install react-router-dom axios lucide-react`.
*   **Install Development Dependencies:**
    *   [x] Run `npm install -D tailwindcss@3 postcss autoprefixer eslint eslint-plugin-react`.
*   **Tailwind CSS Configuration:**
    *   [x] Run `npx tailwindcss init -p`.
    *   [x] Edit `tailwind.config.js` to include `content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"]`.
    *   [x] Add Tailwind directives (`@tailwind base;`, etc.) to `src/index.css`.
*   **Create Utility & Configuration Files:**
    *   [x] Create `src/utils/logger.js`.
    *   [x] Create `.env.example`.
    *   [x] Create `.env` (copying content from `.env.example`).
    *   [x] Create `src/constants/config.js`.
*   **Create API & Global Context Files:**
    *   [x] Create `src/services/api.js`.
    *   [ ] Create `src/services/auth.js` (with mock data).
    *   [ ] Create `src/services/products.js` (with mock data).
    *   [ ] Create `src/context/CartContext.jsx`.
    *   [ ] Create `src/context/AuthContext.jsx`.
*   **Create Core & Page Components:**
    *   [ ] Create `src/components/Header.jsx`.
    *   [ ] Create `src/components/Footer.jsx`.
    *   [ ] Create `src/components/ErrorBoundary.jsx`.
    *   [ ] Create `src/pages/HomePage.jsx`.
    *   [ ] Create `src/pages/ProductCatalog.jsx`.
    *   [ ] Create `src/pages/Cart.jsx`.
    *   [ ] Create `src/pages/LoginPage.jsx`.
    *   [ ] Create `src/pages/RegisterPage.jsx`.
    *   [ ] Create `src/pages/NotFound.jsx`.
*   **Update `App.jsx`:**
    *   [ ] Update `src/App.jsx` to include `ErrorBoundary`, `AuthProvider`, `CartProvider`, `Router`, `Header`, `Footer`, and initial `Routes`.

### **✅ Week 2: Backend API Foundation**

*   **Install Backend Tools:**
    *   [ ] Install .NET 8 SDK.
    *   [ ] Install PostgreSQL.
*   **Create .NET Project & Install Packages:**
    *   [ ] Run `mkdir TasteFirst-api && cd TasteFirst-api`.
    *   [ ] Run `dotnet new webapi -n TasteFirstAPI --output TasteFirstAPI`.
    *   [ ] Run `cd TasteFirstAPI`.
    *   [ ] Run `dotnet add package Microsoft.EntityFrameworkCore.PostgreSQL`.
    *   [ ] Run `dotnet add package Microsoft.EntityFrameworkCore.Tools`.
    *   [ ] Run `dotnet add package Microsoft.EntityFrameworkCore.Design`.
    *   [ ] Run `dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL`.
    *   [ ] Run `dotnet add package Microsoft.AspNetCore.Cors`.
    *   [ ] Run `dotnet add package System.IdentityModel.Tokens.Jwt`.
    *   [ ] Run `dotnet add package Microsoft.IdentityModel.Tokens`.
    *   [ ] Run `dotnet add package BCrypt.Net-Core`.
    *   [ ] Run `dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer`.
    *   [ ] Run `dotnet add package DotNetEnv`.
*   **Create Models, Services, and Data Context:**
    *   [ ] Create `Models` folder and all entity `.cs` files (`User`, `Product`, etc.).
    *   [ ] Create `Services` folder and `ITokenService.cs`, `IPasswordService.cs`.
    *   [ ] Create `TokenService.cs` and `PasswordService.cs`.
    *   [ ] Create `Data` folder and `AppDbContext.cs` with seed data.
*   **Configure & Migrate Database:**
    *   [ ] Update `appsettings.json` with JWT settings and `ConnectionStrings`.
    *   [ ] Update `Program.cs` to configure DB, CORS, JWT, and services.
    *   [ ] Create `.env` file with `DATABASE_URL`, `JWT_SECRET`, etc.
    *   [ ] Create the `TasteFirst` database in PostgreSQL.
    *   [ ] Run `dotnet ef migrations add InitialCreate`.
    *   [ ] Run `dotnet ef database update`.
*   **Test Backend:**
    *   [ ] Run `dotnet run` and verify Swagger UI at `https://localhost:5001/swagger`.

### **✅ Week 3: Backend Controllers & React Integration**

*   **Backend Development:**
    *   [ ] Create `Dtos/AuthDtos.cs` and `Dtos/ProductDtos.cs`.
    *   [ ] Create `Controllers/AuthController.cs` and `Controllers/ProductsController.cs`.
*   **Backend Testing:**
    *   [ ] Run `dotnet run` and test all new endpoints with Swagger.
*   **React Frontend Integration:**
    *   [ ] Update `src/services/auth.js` and `src/services/products.js` to use real API calls.
    *   [ ] Verify `src/context/AuthContext.jsx` works with the real backend.
    *   [ ] Update `src/components/Header.jsx` to reflect live authentication state.
    *   [ ] Update `src/pages/ProductCatalog.jsx` to fetch live data.
    *   [ ] Create `src/pages/ProductDetailPage.jsx`.
    *   [ ] Update `src/App.jsx` with the `/products/:id` route.

### **✅ Week 4: User Features API & React Integration**

*   **Backend Development:**
    *   [ ] Create `Dtos/SavedAddressDtos.cs`, `Dtos/WishlistDtos.cs`, and `Dtos/OrderDtos.cs`.
    *   [ ] Create `Controllers/SavedAddressesController.cs`, `Controllers/WishlistController.cs`, and `Controllers/OrdersController.cs`.
*   **React Frontend Development:**
    *   [ ] Create `src/components/ProtectedRoute.jsx`.
    *   [ ] Create `src/services/address.js`, `src/services/orders.js`, and `src/services/wishlist.js`.
    *   [ ] Create `src/pages/ProfilePage.jsx`, `src/pages/OrdersPage.jsx`, `src/pages/WishlistPage.jsx`, and `src/pages/SavedAddressesPage.jsx`.
*   **React Integration:**
    *   [ ] Update `src/App.jsx` to include new protected routes.
    *   [ ] Update `src/components/Header.jsx` with new navigation links.
    *   [ ] Update `src/pages/ProductDetailPage.jsx` with wishlist functionality.
    *   [ ] Update `src/pages/Checkout.jsx` to use the real orders API.

### **✅ Week 5: Docker Containerization**

*   **Docker Setup:**
    *   [ ] Install Docker Desktop.
*   **Frontend Dockerization:**
    *   [ ] Create `Dockerfile` in `TasteFirst` root.
    *   [ ] Create `.dockerignore` in `TasteFirst` root.
*   **Backend Dockerization:**
    *   [ ] Create `Dockerfile` in `TasteFirstAPI` root.
    *   [ ] Create `.dockerignore` in `TasteFirstAPI` root.
*   **Docker Compose Setup:**
    *   [ ] Create a new `docker-compose` directory.
    *   [ ] Create `docker-compose/docker-compose.yml`.
    *   [ ] Create `docker-compose/.env`.
*   **Test Docker Environment:**
    *   [ ] Run `docker compose build`.
    *   [ ] Run `docker compose up`.
    *   [ ] Run `docker compose exec api dotnet ef database update`.
    *   [ ] Verify the full stack works locally via Docker.
    *   [ ] Run `docker compose down`.

### **✅ Week 6: Azure Cloud Deployment**

*   **Azure CLI & Infrastructure:**
    *   [ ] Run `az login`.
    *   [ ] Run `az group create ...` to create a resource group.
    *   [ ] Run `az appservice plan create ...` to create an App Service Plan.
    *   [ ] Run `az postgres flexible-server create ...` to create the database server.
    *   [ ] Create the `TasteFirst` database on the Azure PostgreSQL server.
*   **Deploy Frontend:**
    *   [ ] Run `az webapp create ...` for the frontend App Service.
    *   [ ] Run `az webapp config appsettings set ...` to configure a placeholder `VITE_API_URL`.
*   **Deploy Backend:**
    *   [ ] Run `az webapp create ...` for the backend App Service.
    *   [ ] Run `az webapp config appsettings set ...` to configure `DATABASE_URL`, `JWT_SECRET`, and `CORS_ALLOWED_ORIGINS`.
*   **Finalize Deployment:**
    *   [ ] Run `az webapp restart ...` on the backend to apply migrations.
    *   [ ] Update the frontend's `VITE_API_URL` to the real backend URL.
    *   [ ] Run `az webapp update --set httpsOnly=true` for both apps.
*   **Verification:**
    *   [ ] Perform a full end-to-end test on the live Azure URLs.

### **✅ Week 7: CI/CD Pipeline Automation**

*   **GitHub Actions Workflow:**
    *   [ ] Create `.github/workflows/deploy.yml` file in your React project.
    *   [ ] Define jobs for `frontend` build, `backend` build, `deploy`, and `integration-tests`.
*   **GitHub Secrets:**
    *   [ ] Run `az webapp deployment list-publishing-profiles ...` for both frontend and backend.
    *   [ ] Add the contents as `AZURE_WEBAPP_PUBLISH_PROFILE_FRONTEND` and `AZURE_WEBAPP_PUBLISH_PROFILE_BACKEND` secrets in GitHub.
*   **Trigger & Monitor:**
    *   [ ] Commit and push `deploy.yml` to the `main` branch.
    *   [ ] Monitor the workflow execution in the GitHub Actions tab.

### **✅ Week 8: Monitoring & Observability**

*   **Backend Monitoring Setup:**
    *   [ ] Run `az monitor app-insights component create ...` for the backend.
    *   [ ] Run `az webapp config appsettings set ...` to add `APPINSIGHTS_INSTRUMENTATIONKEY` to the backend.
    *   [ ] Run `dotnet add package Microsoft.ApplicationInsights.AspNetCore`.
    *   [ ] Update `Program.cs` to include Application Insights.
    *   [ ] Add custom `TrackEvent` and `TrackException` calls to controllers.
*   **Frontend Monitoring Setup:**
    *   [ ] Run `az monitor app-insights component create ...` for the frontend.
    *   [ ] Run `az webapp config appsettings set ...` to add `VITE_APPINSIGHTS_KEY` to the frontend.
    *   [ ] Run `npm install @microsoft/applicationinsights-web`.
    *   [ ] Create `src/services/insights.js` to initialize App Insights.
    *   [ ] Update `App.jsx` for page view tracking.
    *   [ ] Add custom `trackEvent` calls to `CartContext.jsx` and `Checkout.jsx`.
*   **Deploy & Review:**
    *   [ ] Push all changes to trigger CI/CD deployment.
    *   [ ] Explore metrics, logs, and events in the Azure Portal for both Application Insights resources.

### **✅ Week 9: Automated Alerts & Dashboards**

*   **Alerts Setup:**
    *   [ ] Run `az monitor action-group create ...` to create an Action Group.
    *   [ ] Run `az monitor metrics alert create ...` to set up alerts for high CPU, error rates, slow responses, and database memory.
*   **Dashboard Setup:**
    *   [ ] Create `TasteFirst-dashboard.json` file.
    *   [ ] Run `az portal dashboard create ...` to deploy the dashboard.
*   **Log Analytics Setup:**
    *   [ ] Run `az monitor log-analytics workspace create ...`.
    *   [ ] Run `az monitor diagnostic-settings create ...` to connect App Service logs.
    *   [ ] Practice KQL queries in the Log Analytics workspace.
*   **Documentation:**
    *   [ ] Update `MONITORING.md` with details on new alerts and dashboards.

### **✅ Week 10: Optimization, Security & Final Polish**

*   **Performance Optimization:**
    *   [ ] Run `EXPLAIN ANALYZE` on database queries and create indexes as needed.
    *   [ ] Run `VACUUM ANALYZE` on the database.
    *   [ ] Analyze frontend bundle size.
    *   [ ] (Conceptual) Review CDN benefits.
*   **Security Hardening:**
    *   [ ] Create `Middleware/SecurityHeadersMiddleware.cs` in the backend.
    *   [ ] Create `Middleware/RateLimitMiddleware.cs` in the backend.
    *   [ ] Update `Program.cs` to register the new security middlewares.
    *   [ ] (Conceptual) Review WAF setup with Azure Front Door.
*   **Documentation:**
    *   [ ] Create `DISASTER_RECOVERY_PLAN.md`.
    *   [ ] Create `PRODUCTION_OPERATIONS_GUIDE.md`.
    *   [ ] Create `AZURE_TROUBLESHOOTING.md`.
*   **Cost Optimization & Final Review:**
    *   [ ] Review cost analysis in Azure Portal and set budget alerts.
    *   [ ] Perform a final end-to-end health check of the deployed application.
    *   [ ] Ensure all documentation is complete and accurate.

---