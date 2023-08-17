import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0,
    },
    reducers: {
        addItem: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);

            if (!existingItem) {
                state.items.push(newItem);
            }
            state.totalQuantity += 1;
        },
        removeItem: (state, action) => {
            const itemIdToRemove = action.payload;
            state.items = state.items.filter(item => item.id !== itemIdToRemove);
            state.totalQuantity -= 1;
        },
    },
});

export const { addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;


