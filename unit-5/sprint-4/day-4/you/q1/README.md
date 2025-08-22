# Fullstack RBAC Application

A comprehensive fullstack application implementing role-based user authentication and protected CRUD operations on user and resource data, built with Node.js/Express backend, React frontend, and MongoDB Atlas database.

## 🚀 Features

### Authentication & Authorization
- **JWT-based Authentication** - Secure token-based login system
- **Role-Based Access Control (RBAC)** - Three user roles: admin, moderator, and user
- **Protected Routes** - API endpoints and frontend routes secured by authentication and role permissions
- **Password Security** - Bcrypt hashing with salt for secure password storage

### User Management
- **User Registration & Login** - Complete authentication flow with form validation
- **Profile Management** - Users can view and update their profiles
- **Admin User Management** - Admins can view all users, change roles, and delete accounts
- **Role-based UI** - Dynamic interface based on user permissions

### Resource Management
- **CRUD Operations** - Create, read, update, delete resources with proper permissions
- **Resource Categories** - Organize resources by type (task, post, item, document, other)
- **Search & Filtering** - Find resources by title, description, category, and status
- **Privacy Controls** - Public/private resource visibility settings
- **Tagging System** - Add multiple tags to resources for better organization

### Technical Features
- **Responsive Design** - Mobile-friendly interface using CSS Grid and Flexbox
- **Real-time Validation** - Client-side and server-side input validation
- **Error Handling** - Comprehensive error messages and user feedback
- **Pagination** - Efficient data loading with pagination support
- **Security Middleware** - Input validation, XSS protection, and CORS handling

## 🛠️ Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web application framework
- **MongoDB Atlas** - Cloud database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation middleware
- **cors** - Cross-origin resource sharing

### Frontend
- **React** - Frontend library
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client for API calls
- **CSS3** - Custom styling with Grid and Flexbox
- **Context API** - Global state management for authentication

### Deployment
- **Backend**: Render / Railway / Cyclic / Fly.io
- **Frontend**: Netlify / Vercel / GitHub Pages
- **Database**: MongoDB Atlas (Cloud)

## 📁 Project Structure

```
fullstack-rbac-app/
├── backend/
│   ├── middleware/
│   │   ├── auth.js              # JWT authentication & authorization
│   │   └── validation.js        # Input validation rules
│   ├── models/
│   │   ├── User.js              # User data model
│   │   └── Resource.js          # Resource data model
│   ├── routes/
│   │   ├── auth.js              # Authentication routes
│   │   ├── users.js             # User management routes
│   │   ├── profile.js           # Profile management routes
│   │   └── resources.js         # Resource CRUD routes
│   ├── .env                     # Environment variables
│   ├── .gitignore              # Git ignore rules
│   ├── package.json            # Dependencies and scripts
│   ├── render.yaml             # Render deployment config
│   └── server.js               # Express server setup
├── frontend/
│   ├── public/
│   │   └── index.html          # HTML template
│   ├── src/
│   │   ├── components/
│   │   │   ├── Admin/
│   │   │   │   └── UserManagement.js
│   │   │   ├── Auth/
│   │   │   │   ├── Login.js
│   │   │   │   └── Register.js
│   │   │   ├── Dashboard/
│   │   │   │   └── Dashboard.js
│   │   │   ├── Profile/
│   │   │   │   └── Profile.js
│   │   │   ├── Resources/
│   │   │   │   ├── ResourceList.js
│   │   │   │   ├── ResourceForm.js
│   │   │   │   └── ResourceDetail.js
│   │   │   ├── Navbar.js
│   │   │   └── ProtectedRoute.js
│   │   ├── contexts/
│   │   │   └── AuthContext.js   # Authentication context
│   │   ├── services/
│   │   │   └── api.js           # API service layer
│   │   ├── App.js               # Main app component
│   │   ├── index.js            # React entry point
│   │   └── index.css           # Global styles
│   ├── .env                    # Environment variables
│   ├── .gitignore             # Git ignore rules
│   ├── netlify.toml           # Netlify deployment config
│   └── package.json           # Dependencies and scripts
└── README.md                  # Project documentation
```

## ⚙️ Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB Atlas account
- Git

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   # Copy .env file and update with your values
   cp .env.example .env
   ```

   Update `.env` with your actual values:
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/fullstack-rbac?retryWrites=true&w=majority
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   NODE_ENV=development
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The backend will be available at `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   # Create .env file
   echo "REACT_APP_API_URL=http://localhost:5000/api" > .env
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

   The frontend will be available at `http://localhost:3000`

### MongoDB Atlas Setup

1. **Create a MongoDB Atlas account** at https://www.mongodb.com/atlas
2. **Create a new cluster** (free tier available)
3. **Create a database user** with read/write permissions
4. **Whitelist your IP address** (or use 0.0.0.0/0 for development)
5. **Get your connection string** and update `MONGODB_URI` in backend `.env`

## 📊 API Documentation

### Authentication Endpoints

| Endpoint | Method | Access | Description |
|----------|--------|--------|-------------|
| `/api/auth/register` | POST | Public | Register new user account |
| `/api/auth/login` | POST | Public | Login user and get JWT token |

### User Management Endpoints

| Endpoint | Method | Access | Description |
|----------|--------|--------|-------------|
| `/api/users` | GET | Admin | Get all users with pagination |
| `/api/users/:id` | GET | Admin, Moderator | Get user by ID |
| `/api/users/:id/role` | PUT | Admin | Update user role |
| `/api/users/:id` | DELETE | Admin | Delete user account |

### Profile Endpoints

| Endpoint | Method | Access | Description |
|----------|--------|--------|-------------|
| `/api/profile` | GET | Authenticated | Get current user profile |
| `/api/profile` | PUT | Authenticated | Update user profile |
| `/api/profile/password` | PUT | Authenticated | Change user password |

### Resource Endpoints

| Endpoint | Method | Access | Description |
|----------|--------|--------|-------------|
| `/api/resources` | GET | Authenticated | Get resources with filters/pagination |
| `/api/resources` | POST | Authenticated | Create new resource |
| `/api/resources/:id` | GET | Authenticated | Get resource by ID |
| `/api/resources/:id` | PUT | Owner/Admin/Moderator | Update resource |
| `/api/resources/:id` | DELETE | Owner/Admin/Moderator | Delete resource |

### Request/Response Examples

#### Register User
```bash
POST /api/auth/register
Content-Type: application/json

{
  \"username\": \"johndoe\",
  \"email\": \"john@example.com\",
  \"password\": \"securePassword123\",
  \"role\": \"user\"
}
```

#### Create Resource
```bash
POST /api/resources
Authorization: Bearer <jwt-token>
Content-Type: application/json

{
  \"title\": \"My First Task\",
  \"description\": \"This is a sample task description\",
  \"category\": \"task\",
  \"tags\": [\"work\", \"important\"],
  \"metadata\": {
    \"priority\": \"high\",
    \"isPublic\": true
  }
}
```

## 🔒 Role-Based Access Control

### User Roles

1. **Admin**
   - Full system access
   - Manage all users (view, edit roles, delete)
   - View and manage all resources
   - Access admin dashboard and user management

2. **Moderator**
   - View user profiles
   - Moderate all resources (view, edit, delete)
   - Cannot manage user roles or delete users

3. **User**
   - Manage own profile and password
   - Create and manage own resources
   - View public resources from other users
   - Cannot access admin features

### Permission Matrix

| Action | Admin | Moderator | User |
|--------|-------|-----------|------|
| View all users | ✅ | ❌ | ❌ |
| Change user roles | ✅ | ❌ | ❌ |
| Delete users | ✅ | ❌ | ❌ |
| View user profiles | ✅ | ✅ | Own only |
| Create resources | ✅ | ✅ | ✅ |
| Edit any resource | ✅ | ✅ | Own only |
| Delete any resource | ✅ | ✅ | Own only |
| View private resources | ✅ | ✅ | Own only |

## 🚀 Deployment

### Backend Deployment (Render)

1. **Push your backend code to GitHub**
2. **Connect Render to your GitHub repository**
3. **Configure environment variables** in Render dashboard:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: A secure secret key
   - `NODE_ENV`: production
4. **Deploy** - Render will automatically build and deploy your app

### Frontend Deployment (Netlify)

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Drag and drop the `build` folder to Netlify dashboard, or
   - Connect your GitHub repository for automatic deployments

3. **Configure environment variables**
   - Add `REACT_APP_API_URL` with your backend deployment URL

### Environment Variables for Production

**Backend (.env):**
```env
PORT=10000
MONGODB_URI=mongodb+srv://username:password@cluster0.mongodb.net/fullstack-rbac?retryWrites=true&w=majority
JWT_SECRET=your-production-jwt-secret-key
NODE_ENV=production
```

**Frontend (.env):**
```env
REACT_APP_API_URL=https://your-backend-app.onrender.com/api
```

## 🔧 Development Commands

### Backend Commands
```bash
npm start          # Start production server
npm run dev        # Start development server with nodemon
npm test           # Run tests (if implemented)
```

### Frontend Commands
```bash
npm start          # Start development server
npm run build      # Build for production
npm test           # Run tests
npm run eject      # Eject from create-react-app (one-way operation)
```

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Verify MongoDB Atlas connection string
   - Check IP whitelist settings
   - Ensure database user has correct permissions

2. **CORS Issues**
   - Verify frontend URL is allowed in backend CORS configuration
   - Check that API URLs match between frontend and backend

3. **JWT Token Issues**
   - Ensure JWT_SECRET is set and consistent
   - Check token expiration time
   - Verify token is being sent with requests

4. **Frontend Build Issues**
   - Clear node_modules and reinstall dependencies
   - Check for syntax errors in components
   - Verify all imports and exports

### Development Tips

- Use browser DevTools Network tab to debug API calls
- Check backend console logs for detailed error messages
- Use MongoDB Atlas dashboard to monitor database operations
- Enable React Developer Tools for component debugging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔗 Live Links

- **Backend Deployment URL**: [Update with your deployed backend URL]
- **Frontend Deployment URL**: [Update with your deployed frontend URL]
- **GitHub Repo (Backend)**: [Update with your backend repository URL]
- **GitHub Repo (Frontend)**: [Update with your frontend repository URL]

## 📸 Screenshots

[Add screenshots of your application here showing:
- Login/Register forms
- Dashboard for different user roles
- Resource management interface
- User management (admin view)
- Profile settings]

## 🎥 Video Walkthrough

[Add a link to a video demonstration of your application if available]

---

**Built with ❤️ using Node.js, React, and MongoDB**