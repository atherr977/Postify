# 🚀 Postify

**Postify** is a full-stack CRUD web application that allows users to create, view, edit, and delete posts. Built with **Node.js**, **Express**, **EJS**, and **Upstash Redis**, it demonstrates RESTful architecture, server-side rendering, and cloud-based persistent storage.

> 💡 Live Demo: **https://postify-sandy.vercel.app/posts**
>
> 📂 Source Code: **https://github.com/atherr977/Postify**

---

## ✨ Features

- 📝 Create new posts
- 📋 Browse all posts
- 🔍 View individual post details
- ✏️ Edit existing posts
- 🗑️ Delete posts
- 💾 Persistent cloud storage with Upstash Redis
- 🔄 RESTful CRUD operations using `method-override`
- 🎨 Server-side rendering with EJS
- 🔐 Protected **Demo Reset** feature to restore sample data
- ⚡ Deployed on Vercel

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Runtime | Node.js |
| Backend | Express.js |
| View Engine | EJS |
| Database | Upstash Redis |
| Routing | method-override |
| IDs | crypto.randomUUID() |
| Deployment | Vercel |

---

## 📁 Project Structure

```text
postify/
├── public/
│   └── style.css
├── views/
│   ├── index.ejs
│   ├── new.ejs
│   ├── show.ejs
│   └── edit.ejs
├── index.js
├── package.json
├── vercel.json
└── README.md
```

---

## 📌 REST API Routes

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/` | Redirect to posts |
| GET | `/posts` | Display all posts |
| GET | `/posts/new` | New post form |
| POST | `/posts` | Create a post |
| GET | `/posts/:id` | View a post |
| GET | `/posts/:id/edit` | Edit form |
| PATCH | `/posts/:id` | Update a post |
| DELETE | `/posts/:id` | Delete a post |
| POST | `/reset-demo` | Restore demo data *(protected by reset key)* |

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm
- Upstash Redis account

---

### Clone the Repository

```bash
git clone https://github.com/atherr977/Postify.git
cd Postify
```

---

### Install Dependencies

```bash
npm install
```

---

### Configure Environment Variables

Create a `.env.local` file and add:

```env
UPSTASH_REDIS_REST_URL=your_upstash_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_token

RESET_KEY=your_secret_reset_key
```

If deploying on **Vercel**, simply connect your Upstash Redis database and add the `RESET_KEY` environment variable in **Project Settings → Environment Variables**.

---

### Run Locally

```bash
node index.js
```

Visit:

```
http://localhost:8080
```

---

## 🌐 Deployment

Postify is deployed on **Vercel** using **serverless functions** with **Upstash Redis** as the cloud database.

---

## 🔄 Demo Reset

Since this is a public demo, anyone can create, edit, or delete posts.

To keep the demo usable, Postify includes a protected **Reset Demo Data** feature.

- Requires a secret reset key
- Restores the original sample posts
- Intended for demo environments only

---

## 💡 Key Learnings

This project helped me gain hands-on experience with:

- Express.js routing
- RESTful CRUD architecture
- Server-side rendering using EJS
- Cloud database integration with Upstash Redis
- Environment variables
- Serverless deployment on Vercel
- Git & GitHub workflow

---

## 🔮 Future Improvements

- [ ] User authentication
- [ ] User profiles
- [ ] Like & comment system
- [ ] Image uploads
- [ ] Search functionality
- [ ] Pagination
- [ ] Rich text editor
- [ ] Responsive mobile navigation
- [ ] Dark mode

---

## 👨‍💻 Author

**Athar Ashraf**

GitHub: https://github.com/atherr977

---

## 📄 License

This project is licensed under the **MIT License**.
