import { createSlice } from "@reduxjs/toolkit"

const allUsersSlice = createSlice({
  name: "allUsers",
  initialState: [],
  reducers: {
    setAll(state, action) {
      return action.payload
    },
  }
})

export const { setAll } = allUsersSlice.actions
export default allUsersSlice.reducer