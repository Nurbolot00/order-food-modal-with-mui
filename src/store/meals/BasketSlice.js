import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchApi } from "../../lib/fetchApi";

export const basketActionTypes = {
  ADD_ITEM_SUCCESS: " ADD_ITEM_SUCCESS",
  GET_BASKET_SUCCESS: "GET_BASKET_SUCCESS",
};

const initialState = {
  items: [],
  error: "",
  isLoading: false,
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    getBasketSuccess(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addToBasket.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(updateBasketItem.rejected, (state, action) => {
      state.error = action.payload;
    });
    builder.addCase(deleteBasketItem.rejected, (state, action) => {
      state.error = action.payload;
    });

    builder.addCase(getBasket.fulfilled, (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
      state.error = "";
    });

    builder.addCase(getBasket.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(getBasket.rejected, (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
    });
  },
});


export const basketActions = basketSlice.actions;

export const getBasket = createAsyncThunk(
  "basket/getBasket",
  async (_, {rejectWithValue }) => {
    try {
      const { data } = await fetchApi("basket");
      return data.items;
      // dispatch(basketActions.getBasketSuccess(data.items));
    } catch (error) {
      return rejectWithValue("Something went wrong");
    }
  }
);



export const submitOrder = createAsyncThunk(
  "basket/addToBasket",
  async ({orderData}, { dispatch, rejectWithValue }) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/posts`, {
        method: "POST",
        body: orderData,
      });
      dispatch(getBasket());
      // afterSuccessDoThis()
      // console.log('success');
    // } catch (error) {
    //   afterFailDoThis()
    //   console.log('failed');
      return rejectWithValue("Something went wrong");
    }catch(error){

    }
  }
);

export const addToBasket = createAsyncThunk(
  "basket/addToBasket",
  async (newItem, { dispatch, rejectWithValue }) => {
    try {
      await fetchApi(`foods/${newItem.id}/addToBasket`, {
        method: "POST",
        body: { amount: newItem.amount },
      });
      dispatch(getBasket());
    } catch (error) {
      return rejectWithValue("Something went wrong");
    }
  }
);

export const updateBasketItem = createAsyncThunk(
  "basket/updateBasketItem",
  async ({ id, amount }, { dispatch, rejectWithValue }) => {
    try {
      await fetchApi(`basketitem/${id}/update`, {
        method: "PUT",
        body: { amount },
      });
      dispatch(getBasket());
    } catch (error) {
      return rejectWithValue("Something went wrong");
    }
  }
);

export const deleteBasketItem = createAsyncThunk(
  "basket/deleteBasketItem",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await fetchApi(`basketitem/${id}/delete`, {
        method: "DELETE",
      });

      dispatch(getBasket());
    } catch (error) {
      rejectWithValue("Something went wrong");
    }
  }
);


// export const BasketReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case basketActionTypes.GET_BASKET_SUCCESS:
//       return {
//         ...state,
//         items: action.payload,
//       };

//     default:
//       return state;
//   }
// };



// export const getBasket = () => async (dispatch) => {
//   try {
//     const { data } = await fetchApi("basket");
//     dispatch(basketActions.getBasketSuccess(data.items));
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const addToBasket = (newItem) => async (dispatch) => {
//   try {
//     await fetchApi(`foods/${newItem.id}/addToBasket`, {
//       method: "POST",
//       body: { amount: newItem.amount },
//     });
//     dispatch(getBasket());
//   } catch (error) {
//     console.log(error);
//   }
// };

//  export const updateBasketItem = ({ id, amount }) => async (dispatch ) => {
//     try {
//          await fetchApi(`basketitem/${id}/update`, {
//         method: "PUT",
//         body: { amount },
//       });
//       dispatch(getBasket())
//     } catch (error) {
//       console.log(error);
//     }
//   };

// export const deleteBasketItem = (id)=>async (dispatch) => {
//   try {
//      await fetchApi(`basketitem/${id}/delete`, {
//       method: "DELETE",
//     });

//     dispatch(getBasket())
//   } catch (error) {
//     console.log(error);
//   }
// };
