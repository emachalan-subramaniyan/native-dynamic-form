import { createSlice } from '@reduxjs/toolkit'
export const formSlice = createSlice({
    name: 'form',
    initialState: {
      value: 0,
      formData: null
    },
    reducers: {
      addForm: (state, {payload}) => {
        console.log('payload....', payload)
        state.formData = payload;
      },
    }
  })
  
  // Action creators are generated for each case reducer function
  export const { addForm } = formSlice.actions
  
  export default formSlice.reducer
  
  