# Nuegas — Real-Time AI-Powered Task Management System

**Nuegas** is a scalable, real-time task management and collaboration platform designed for modern teams. Built on the MERN stack and powered by WebSocket, WebRTC, Cloudinary, and Gemini AI, it provides seamless task management, chat, file sharing,real-time notifications, analytics, and AI assistance. It supports secure user authentication, email-based OTP verification, and scalable microservices-friendly architecture.

---

## 👥 User Roles & Panel Responsibilities

### 👑 Admin Panel

- Full access to all data and activities across the platform
- Manage coordinators and users
- View system-wide analytics and user reports
- Assign coordinators to projects
- Broadcast announcements to all users
- Monitor weekly and monthly task trends
- Admin dashboard with charts, stats, and logs

### 🧑‍💼 Coordinator Panel

- Assign tasks to users
- Create, update, and track team tasks
- Moderate project-related chats and calls
- Get analytics of team productivity
- Upload files/documents for tasks
- Initiate or join video/audio calls
- Receive system and task-specific notifications

### 👤 User Panel (User = Employee)

- Register/Login with OTP verification
- Update personal profile and credentials
- View assigned tasks in real-time
- Mark tasks complete/in-progress
- Upload and preview task files
- Use AI to auto-generate todos from task titles
- Chat with coordinators or teammates
- Participate in video/audio calls
- View weekly task progress with charts
- Receive real-time notifications and email alerts
- Reset password using OTP email verification

---

## 📦 Core Modules & Features

### ✅ Task Management

- Create, edit, delete tasks
- Add deadline, priority, status, description
- Tagging and categorization
- Assign to users with role-based control
- Subtasks with progress tracker
- Kanban drag-and-drop interface
- Upload documents, images to Cloudinary
- Track task completion %

### 🔔 Notification System

- Instant Notifications using nodemailer
- Each user has their own notification record
- Email alerts for:
  - Task assigned/updated
  - Important announcements

### 💬 Chat Module

- One-to-one or task-based group chats
- Upload files inside chat (image)
- Read receipts, timestamps
<!-- 
### 📞 Video & Audio Calling

- WebRTC-powered calling between users & coordinators
- Task-specific or general room calls
- Real-time connection and disconnection events
- Notification on incoming calls
- Mic/Camera toggle support -->

### 🤖 AI Assistant

- Auto-generate todos from task titles
- Gemini 1.5 via LangChain for prompt-based AI tasks
- Future: Suggest due dates, optimize workload

### 📊 Analytics & Charts

- Weekly and monthly stats (bar & pie charts)
- Compare completed vs pending tasks
- Individual and team productivity stats
- Admin/coordinator dashboards with charts

### 🔐 Authentication & Security

- JWT for session-based secure login
- OTP email verification via NodeMailer
- Rate-limiting and encrypted token handling
- Password reset via OTP + secure update route
- Role-based API and route access control

### 📁 File Uploading

- Cloudinary-based secure file storage
- Upload images, documents, PDFs
- Real-time upload progress indicator
- File previews (image/document)

---

## ⚙️ Tech Stack

### Frontend

- React.js
- Tailwind CSS
- Shadcn UI
- TanStack Query
- Framer Motion
- Recharts

### Backend

- Node.js
- Express.js
- MongoDB
- JWT (Authentication)
- Socket.io (Real-time)
- Cloudinary (File upload)
- NodeMailer (OTP email)

### AI Integration

- Gemini 1.5
- LangChain tool wrapper

### Deployment & DevOps

- Render (Backend Deployment)
- Vercel (Frontend Hosting)

---

## 📁 Full Folder Structure

### Frontend

```
/src
│
├── components
│   ├── Chat
│   
├── Pages
│
├── Api
│ 
├── Common
│ 
├── Config
│ 
├── Data
│ 
├── Layout
│ 
├── Context
│ 
├── Security
│ 
├── UI
│ 
├── Hooks
│   └── Animation
│   └── Function
│
├── Utils
│   └── api.js
│
├── Assets
│
└── main.jsx
```

### Backend

```

├── Controllers
│   
├── Models
│  
├── Routes
│
├── Middleware
│   
├── Config
│   
├── Services
│
├── Services
│
└── server.js
```

---
