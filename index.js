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

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

// fallback posts if database is completely empty
const initialPosts = [
    {
        id: uuidv4(),
        username: "naturelover",
        content: "Went on an early morning hike today. The fresh air and beautiful views made my day!"
    },
    {
        id: uuidv4(),
        username: "bookworm",
        content: "Just finished reading 'Atomic Habits'. Highly recommend it to anyone looking to build better habits."
    },
    {
        id: uuidv4(),
        username: "travel_diaries",
        content: "Nothing beats watching the sunrise from the mountains. Nature really is the best therapy."
    },
    {
        id: uuidv4(),
        username: "fitness_journey",
        content: "Completed my first 5 km run this morning. Small progress every day leads to big results."
    },
    {
        id: uuidv4(),
        username: "foodie_corner",
        content: "Tried making homemade pizza today, and it turned out surprisingly good! 🍕"
    },
    {
        id: uuidv4(),
        username: "technews",
        content: "AI tools are changing the way developers write, test, and debug code. Exciting times ahead!"
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

if (process.env.NODE_ENV !== "production") {
    app.listen(8080, () => {
        console.log("Listening on port 8080");
    });
}

module.exports = app;
