import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0,
        totalPrice: 0,
    },
    reducers: {
        addItem: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);

            if (existingItem) {
                existingItem.count += 1;
            } else {
                state.items.push({ ...newItem, count: 1 });
                state.totalQuantity += 1;
            }

            // Ürün eklenince totalPrice'ı güncelle
            state.totalPrice += newItem.price;
        },
        removeItem: (state, action) => {
            const itemIdToRemove = action.payload;
            const existingItem = state.items.find(item => item.id === itemIdToRemove);

            if (existingItem) {
                if (existingItem.count === 1) {
                    state.items = state.items.filter(item => item.id !== itemIdToRemove);
                } else {
                    existingItem.count -= 1;
                }

                state.totalPrice -= existingItem.price;

                if (state.totalQuantity > 0) {
                    state.totalQuantity -= 1;
                }
            }
        },
    },
});

export const { addItem, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
