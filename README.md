# Postify

A minimal full-stack CRUD web application for creating, viewing, editing, and deleting posts — built with **Node.js**, **Express**, **EJS**, and **Upstash Redis** for persistent data storage.

## Features

- 📝 Create new posts
- 📋 View all posts on the home feed
- 🔍 View individual post details
- ✏️ Edit existing posts
- 🗑️ Delete posts
- 💾 Persistent storage with Upstash Redis
- 🔄 RESTful routing using `method-override`
- 🎨 Server-side rendering with EJS

## Tech Stack

| Layer | Technology |
|-------|------------|
| Runtime | Node.js |
| Server | Express |
| Templating | EJS |
| Database | Upstash Redis |
| Routing | `method-override` |
| IDs | Node.js `crypto.randomUUID()` |

## Project Structure

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
└── README.md
```

## Routes

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/` | Redirect to all posts |
| GET | `/posts` | Display all posts |
| GET | `/posts/new` | Show create post form |
| POST | `/posts` | Create a new post |
| GET | `/posts/:id` | View a single post |
| GET | `/posts/:id/edit` | Show edit form |
| PATCH | `/posts/:id` | Update a post |
| DELETE | `/posts/:id` | Delete a post |

## Getting Started

### Prerequisites

- Node.js (v16 or later)
- npm
- Upstash Redis database

### Installation

```bash
git clone https://github.com/<your-username>/postify.git
cd postify
npm install
```

### Environment Variables

Create a `.env.local` file (or pull them using the Vercel CLI) and add your Upstash Redis credentials:

```env
UPSTASH_REDIS_REST_URL=your_upstash_redis_rest_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_rest_token
```

If you're deploying on **Vercel**, simply connect your Upstash Redis database to the project. Vercel will automatically provide these environment variables.

### Run Locally

```bash
node index.js
```

Visit:

```
http://localhost:8080
```

## Deployment

This project is deployed on **Vercel** and uses **Upstash Redis** to persist data across serverless function invocations.

## Notes

- Posts are stored in Upstash Redis.
- The application automatically seeds a few sample posts if the database is empty.
- No authentication is implemented, so anyone can create, edit, or delete posts.

## Future Improvements

- [ ] Input validation
- [ ] 404 page for invalid post IDs
- [ ] User authentication
- [ ] User-specific posts
- [ ] Search and filtering
- [ ] Rich text editor
- [ ] Pagination
- [ ] Image uploads

## License

MIT
