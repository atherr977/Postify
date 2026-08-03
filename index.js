const express = require("express");
const app = express();
const port = 8080;
const path = require("path");

// Connect to Upstash Redis
const { Redis } = require('@upstash/redis');
const redis = Redis.fromEnv();

// const { v4: uuidv4 } = require('uuid');
const { randomUUID: uuidv4 } = require('crypto');
const methodOverride = require("method-override");
app.use(methodOverride('_method'))

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

// fallback posts if database is completely empty
const initialPosts = [
 {
    id: uuidv4(),
    username: "sarah.codes",
    content: "Spent almost three hours debugging a feature that refused to work, only to realize I had misspelled a variable name. It's frustrating in the moment, but every bug teaches you something new. Being a developer definitely requires patience more than anything else."
  },
  {
    id: uuidv4(),
    username: "aditya_travels",
    content: "Visited Jaipur this weekend and completely fell in love with the city's architecture. Walking through the narrow streets, trying local food, and watching the sunset from Nahargarh Fort made the trip unforgettable. Already planning my next visit."
  },
  {
    id: uuidv4(),
    username: "bookworm_amy",
    content: "Finally finished reading 'Atomic Habits' after putting it off for months. The biggest takeaway for me was that small improvements made consistently can completely change your life over time. Definitely one of those books I'll revisit every year."
  },
  {
    id: uuidv4(),
    username: "fit.life",
    content: "Completed my first 10 km run today without stopping once. A few months ago I could barely run for five minutes, so this feels like a huge milestone. Progress isn't always fast, but staying consistent really does pay off."
  },
  {
    id: uuidv4(),
    username: "foodie_journal",
    content: "Tried making butter chicken at home for the first time using a recipe I found online. It wasn't restaurant quality, but the flavors turned out much better than I expected. Cooking has become one of my favorite ways to relax after a busy day."
  }
];

// Helper to grab posts from Redis (seeds initial data if missing)
async function getPosts() {
    let posts = await redis.get("posts");
    if (!posts) {
        posts = initialPosts;
        await redis.set("posts", posts);
    }
    return posts;
}

app.get("/", (req, res) => {
  res.redirect("/posts");
});

// fetch all posts from Redis
app.get("/posts", async (req, res) => {
    const posts = await getPosts();
    res.render("index.ejs",{ posts });
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

// save a new post to Redis
app.post("/posts", async (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4();
    let posts = await getPosts();
    posts.push({ id, username, content });
    await redis.set("posts", posts);
    res.redirect("/posts");
});

// grab a single post by ID
app.get("/posts/:id", async (req, res) => {
    let { id } = req.params;
    let posts = await getPosts();
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", { post });
});

// Update post content in Redis
app.patch("/posts/:id", async (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    let posts = await getPosts();
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    await redis.set("posts", posts);
    console.log(post);
    res.redirect("/posts");
});

// Load edit form for a post
app.get("/posts/:id/edit", async (req, res) => {
    let { id } = req.params;
    let posts = await getPosts();
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", { post });
});

// remove post and save changes to Redis
app.delete("/posts/:id", async (req, res) => {
    let { id } = req.params;
    let posts = await getPosts();
    posts = posts.filter((p) => id !== p.id);
    await redis.set("posts", posts);
    res.redirect("/posts");
});
// Reset demo data
app.post("/reset-demo", async (req, res) => {
    const { key } = req.body;

    if (key !== process.env.RESET_KEY) {
        return res.status(403).json({
            success: false,
            message: "Invalid key"
        });
    }

    await redis.set("posts", initialPosts);

    res.json({
        success: true
    });
});

if (process.env.NODE_ENV !== "production") {
    app.listen(8080, () => {
        console.log("Listening on port 8080");
    });
}

module.exports = app;
