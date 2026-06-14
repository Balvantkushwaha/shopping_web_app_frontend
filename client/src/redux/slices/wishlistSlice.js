import { createSlice } from '@reduxjs/toolkit';

const loadWishlistFromStorage = () => {
  const savedWishlist = localStorage.getItem('wishlist');
  return savedWishlist ? JSON.parse(savedWishlist) : [];
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: loadWishlistFromStorage(),
  reducers: {
    toggleWishlist: (state, action) => {
      const index = state.findIndex(item => item.id === action.payload.id);
      if (index === -1) {
        state.push(action.payload);
      } else {
        state.splice(index, 1);
      }
      localStorage.setItem('wishlist', JSON.stringify(state));
    },
  },
});

export const { toggleWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;