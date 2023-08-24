import { createSlice } from "@reduxjs/toolkit"

const blogsSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setAll(state, action) {
      return action.payload
    },
    addBlog(state, action) {
      return state.concat(action.payload)
    },
    removeBlog(state, action) {
      return state.filter(blog => blog.id !== action.payload)
    },
    changeBlog(state, action) {
      const blogToChange = action.payload
      return state.map(blog => blog.id === blogToChange.id ? blogToChange : blog)
    },
    // sortBlogs(state) {
    //   {/* blogs are sorted in descending order according to the number of likes, comparator function is reversed bc of that */}
    //   const blogs = [...state]
    //   console.log(state)
    //   return blogs.sort((a, b) => {return b.likes - a.likes})
    // }
  }
})

export const { setAll, addBlog, removeBlog, changeBlog } = blogsSlice.actions

export default blogsSlice.reducer