const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const { blogsImg } = require("../middleware/upload");

const {
  getAllBlogs,
  getBlogs,
  getBlog,
  createBlogs,
  editBlog,
  deleteBlog,
  filterByTitle,
  filteredBlogs,
  filteredBlogsWithPagination,
  slugValidation,
} = require("../controller/blog");

router.post("/alls", getAllBlogs);
router.get("/all", getBlogs);
router.get("/:slug", getBlog);
router.post("/add", auth, blogsImg("picture"), createBlogs);
router.patch("/edit", auth, blogsImg("picture"), editBlog);
router.delete("/:id", auth, deleteBlog);
router.post("/search", filterByTitle);
router.post("/cats", filteredBlogsWithPagination);
router.post("/cat", filteredBlogs);
router.post("/cats", filteredBlogsWithPagination);
router.post("/slug", slugValidation);

module.exports = router;
