import service from "./config.services"
const listBlogService = () => {
    return service.get("blog/list")
}

const detailsBlogService = (blogId) => {
    return service.get(`blog/${blogId}/details`)
}

const createBlogService = (newBlog) => {
    return service.post("/blog/create", newBlog)
}

const updateBlogService = (blogId, blogUpdate) => {
    return service.patch(`blog/${blogId}/update`, blogUpdate)
}

const deleteBlog = (blogId) => {
    return service.delete(`blog/${blogId}/delete`)
}
export {
    listBlogService,
    detailsBlogService,
    createBlogService,
    updateBlogService,
    deleteBlog
}