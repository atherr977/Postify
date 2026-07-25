const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");
app.use(methodOverride('_method'))

app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
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

app.get("/posts", (req, res) => {
    res.render("index.ejs",{ posts });
});
app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

app.post("/posts", (req, res) => {
    let { username, content } = req.body;
    let id = uuidv4();
    posts.push({ id, username, content });
    res.redirect("/posts");
});

app.get("/posts/:id", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", { post });
});
app.patch("/posts/:id", (req, res) => {
    let { id } = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
});

app.get("/posts/:id/edit", (req, res) => {
    let { id } = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", { post });
});

app.delete("/posts/:id", (req, res) => {
    let { id } = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
});

app.listen(port, () => {
    console.log("listening to port : 8080");
});