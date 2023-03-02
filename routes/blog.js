const express = require("express");
const db = require("../db/db.js");

const router = express.Router();

router.get("/blog", async (req, res) => {
  try {
    const blogs = await db.select("*").from("blog");
    res.send(blogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/blog/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const blogs = await db("blog").where({ id });
    if (blogs.length !== 0) {
      res.send(blogs);
    } else {
      res.status(404).json({ error: "Blog not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/blog/new", async (req, res) => {
  const { title, content, author } = req.body;

  try {
    const blog = await db("blog").insert({ title, content, author });
    res.status(201).send(blog);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.put("/blog/:id", async (req, res) => {
  const { id } = req.params;
  const { title, content, author } = req.body;

  try {
    const blog = await db("blog")
      .where({ id })
      .update({ title, content, author }, ["id", "title", "content", "author"]);
    if (blog.length !== 0) {
      res.status(201).send(blog);
    } else {
      res.status(404).json({ error: "Blog not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/blog/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await db("blog").where({ id }).del();
    if (blog) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: "Blog not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
