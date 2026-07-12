// import { configureStore } from '@reduxjs/toolkit';
// import cartReducer from './slices/cartSlice';
// import authReducer from './slices/authSlice';

// export const store = configureStore({
//   reducer: {
//     cart: cartReducer,   
//     auth: authReducer,
//   },
// });



import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
  },
});

// Custom hooks
import { useDispatch, useSelector } from 'react-redux';

export const useAppDispatch = useDispatch;
export const useAppSelector = useSelector;