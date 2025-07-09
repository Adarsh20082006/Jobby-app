
# 📘 Jobby App

A fully responsive job search web application built with **React**, **React Router**, and **REST APIs**. It allows users to search and apply for jobs, view company details, and filter jobs based on employment type, salary, and keywords.

---

## 🚀 Features

### ✅ Authentication
- Secure login using JWT token.
- Only authenticated users can access Home, Jobs, and Job Details routes.
- Redirects unauthenticated users to the Login page.
- Prevents logged-in users from accessing the Login page again.

### 🏠 Home Route (`/`)
- Displays welcome content and a “Find Jobs” button.
- Clicking the button navigates to the Jobs page.

### 🔍 Jobs Route (`/jobs`)
- **Profile Fetch**: Fetches and displays the user profile using `https://apis.ccbp.in/profile`.
- **Job Listings**: Fetches job data from `https://apis.ccbp.in/jobs`.
- **Filters**:
  - Employment Types (e.g., Full Time, Part Time)
  - Salary Range (e.g., 10 LPA and above)
  - Keyword Search
- **Retry Logic** for failed API calls.
- **No Jobs View** when no jobs match the applied filters.

### 📄 Job Details Route (`/jobs/:id`)
- Fetches detailed job information by ID.
- Displays:
  - Company logo, title, rating
  - Job description and external company site
  - Required skills
  - Life at company section
  - Similar job listings
- Retry on API failure.

### ❌ Not Found Route (`/not-found`)
- Handles unmatched routes and shows a custom 404 page.

### 🔐 Protected Routes
- `Home`, `Jobs`, and `JobDetails` are protected.
- Access control handled using cookies and redirects.

---

## 🛠 Tech Stack

- **React** (18)
- **React Router DOM** (v6)
- **Vite**
- **JavaScript (ES6+)**
- **CSS3**
- **JS Cookies** for JWT token management
- **RESTful APIs** provided by CCBP

---

## 🔐 Login Credentials (Demo)
  -  Use the following demo credentials to login:
```  
    Username: rahul  
    Password: rahul@2021  
```  

## 📁 Folder Structure

jobby-app/  
│  
├── components/  
│   ├── Login/  
│   ├── Home/  
│   ├── Jobs/  
│   ├── JobDetails/  
│   ├── JobItem/  
│   ├── Navbar/  
│   ├── ProtectedRoute/  
│   └── NotFound/  
│  
├── App.jsx  
├── main.jsx  
├── index.css  
└── package.json  
