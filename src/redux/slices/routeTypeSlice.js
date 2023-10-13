import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  type: 'pedestrian'
}

export const routeTypeSlice = createSlice({
  name: 'routes',
  initialState,
  reducers: {
    changeType: (state, action) => {
      state.type = state.type === 'auto' ? 'pedestrian' : 'auto'
    },
  },
})

export const { changeType } = routeTypeSlice.actions;

export default routeTypeSlice.reducer;