# 🔐 PassOP - Password Manager

A full-stack web application to securely save, edit, and manage your website credentials. Built using **React**, **Express**, and **MongoDB**, deployed on **Render**.

## 📸 Screenshots

![image](https://github.com/user-attachments/assets/5dba903c-81f8-47fb-a9c5-804097915d76)


---

## 🛠 Tech Stack

**Frontend**:
- React (with Hooks)
- Tailwind CSS
- Vite
- react-hot-toast
- uuid

**Backend**:
- Express.js
- MongoDB
- dotenv
- cors
- body-parser

**Deployment**:
- Render (for both backend + frontend)
- MongoDB Atlas

---

## 🚀 Features

- 📝 Add, edit, and delete passwords
- 🔐 Masked and toggleable password field
- 📋 Click-to-copy credentials
- 🔁 Persists data in MongoDB
- 🌐 Deployed under a single Render URL
- ⚡ Responsive UI with smooth interactions

---

## 📁 Folder Structure

project-root/
├── backend/ # Express server + MongoDB logic
│ ├── server.js
│ └── package.json
├── frontend/ # React + Vite frontend
│ ├── src/
│ ├── dist/ # Production build
│ └── package.json
├── build-and-start.sh
├── README.md

---

## ⚙️ Environment Variables

In `/backend/.env`:

```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/
PORT=3000
NODE_ENV=production
```
Replace <username> and <password> with your actual MongoDB credentials.

💻 Local Development
1. Clone the Repository
```
git clone https://github.com/<your-username>/Password_Manager.git
cd Password_Manager
```
2. Install Frontend
```
cd frontend
npm install
npm run dev
```
App runs at http://localhost:5173

3. Install Backend
```
cd ../backend
npm install
npm start
```
Backend runs at http://localhost:3000

📦 Production Build
```
cd frontend
npm run build

cd ../backend
npm install
npm start
```
The Express server will serve your React build + handle API.

🌐 Deployment (on Render)

Push your code to GitHub

Create a new Web Service on Render.com

Set:
```
Root Directory: backend
Build Command: npm run heroku-postbuild
Start Command: npm start
```
Add environment variables on Render:
```
MONGODB_URI
NODE_ENV=production
```

Render will serve both API and frontend from the same URL :

https://password-manager-aoiz.onrender.com

## 📋 License
This project is open-source and available under the MIT License.

## 🤝 Contributions
Contributions, issues and feature requests are welcome!
Feel free to open a pull request.

## ⭐ Credits
Made with 💚 by Mohammed Affaq

---
