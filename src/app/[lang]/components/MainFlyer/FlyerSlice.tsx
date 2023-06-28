import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface flyerState {
  flyers: any[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: flyerState = {
  flyers: [],
  status: "idle",
  error: null,
};

export const flyerSlice = createSlice({
  name: "flyer",
  initialState,
  reducers: {
    addFlyer: (state, action: PayloadAction<any>) => {
        console.log(action.payload)
        state.flyers = action.payload;
    },
    
  },
});

export const {
    addFlyer,
} = flyerSlice.actions;

export default flyerSlice.reducer;
