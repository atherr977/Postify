# Postify

A minimal full-stack CRUD web app for creating, viewing, editing, and deleting posts — built with Node.js, Express, and EJS.

## Features

- **List** all posts on the home feed
- **Create** a new post with a username and content
- **View** a single post in detail
- **Edit** a post's content in place
- **Delete** a post
- RESTful routing with `method-override` for PATCH/DELETE support via HTML forms
- Server-rendered views using EJS templating

## Tech Stack

| Layer      | Technology |
|------------|------------|
| Runtime    | Node.js |
| Server     | Express |
| Templating | EJS |
| Routing    | `method-override` (PATCH/DELETE over POST) |
| IDs        | `uuid` (v4) |

## Project Structure

```
postify/
├── views/
│   ├── index.ejs      # All posts feed
│   ├── new.ejs         # Create post form
│   ├── show.ejs         # Single post detail view
│   └── edit.ejs         # Edit post form
├── public/
│   └── style.css        # Static styling
├── index.js              # App entry point & routes
└── package.json
```

## Routes

| Method | Route              | Description              |
|--------|---------------------|---------------------------|
| GET    | `/posts`            | List all posts            |
| GET    | `/posts/new`        | Show form to create a post |
| POST   | `/posts`            | Create a new post          |
| GET    | `/posts/:id`        | View a single post         |
| GET    | `/posts/:id/edit`   | Show form to edit a post   |
| PATCH  | `/posts/:id`        | Update a post's content    |
| DELETE | `/posts/:id`        | Delete a post              |

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm

### Installation

```bash
git clone https://github.com/<your-username>/postify.git
cd postify
npm install
```

### Run the app

```bash
node index.js
```

The server starts on **http://localhost:8080**.

## Notes

- Posts are stored **in-memory** (a JS array) — data resets on every server restart. There is no database layer yet.
- No authentication — any visitor can create, edit, or delete any post.

## Roadmap / Known Limitations

- [ ] Add input validation (empty username/content are currently accepted)
- [ ] Add 404 handling for invalid post IDs
- [ ] Persist posts to a database (e.g. MongoDB)
- [ ] Add user authentication and post ownership

## License

MIT
