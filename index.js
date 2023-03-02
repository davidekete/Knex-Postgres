const express = require("express");
const app = express();
const port = 3000;
const blogRouter = require("./routes/blog.js");

app.use(express.json());
app.use(blogRouter);

app.listen(port, () => {
  console.log(`App listening at port:${port}`);
});
