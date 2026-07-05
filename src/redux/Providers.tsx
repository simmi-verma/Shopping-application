"use client";

import React, { createContext, useReducer, ReactNode } from "react";
import { Cart, IAllProducts, IProduct, IUser } from "@/lib/interface";

// Initial States for sub-reductions
const initialCartState = {
  cart: [],
  totalPrice: 0,
  totalQuantity: 0,
  editCartMode: false,
  selectCart: [],
  selectAll: false,
};

const initialFilterState = {
  brand: [],
  openFilter: false,
  sort: { field: "", order: "" },
  rating: "",
  offer: "",
  price: [0, 2000] as [number, number],
};

const initialOrderState = {
  orders: null,
};

const initialProductState = {
  allProducts: {
    page: 0,
    totalPages: 0,
    totalProducts: 0,
    products: [],
  } as IAllProducts,
  product: {
    _id: "",
    brand: "",
    category: "",
    description: "",
    images: [],
    price: 0,
    thumbnail: "",
    title: "",
    colors: [],
    discountPercentage: 0,
    discountPrice: 0,
    highlights: [],
    rating: 0,
    sizes: [],
    stock: 0,
    type: "",
  } as IProduct,
  allProductLoading: false,
  productLoading: false,
};

const initialUserState = {
  authStatus: false,
  user: null as IUser | null,
};

const localStorageCart = () => {
  if (typeof window !== "undefined") {
    let getCart = localStorage.getItem("myCart");
    let parsedCart;
    if (getCart) {
      parsedCart = JSON.parse(getCart);
    }
    return !Array.isArray(parsedCart) ? [] : parsedCart;
  }
  return [];
};

const getInitialState = () => ({
  cart: {
    ...initialCartState,
    cart: localStorageCart(),
  },
  filter: initialFilterState,
  order: initialOrderState,
  product: initialProductState,
  user: initialUserState,
});

// App Contexts definitions
export const AppStateContext = createContext<any>(null);
export const AppDispatchContext = createContext<any>(null);

// Unified State Reducer
const appReducer = (state: any, action: any) => {
  switch (action.type) {
    // --- CART ACTIONS ---
    case "cart/addToCart": {
      let { _id, quantity } = action.payload;
      let newCart = [...state.cart.cart];
      let existingItem = newCart.find((item) => item._id === _id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        newCart.push(action.payload);
      }

      localStorage.setItem("myCart", JSON.stringify(newCart));
      return {
        ...state,
        cart: {
          ...state.cart,
          cart: newCart,
        },
      };
    }

    case "cart/setTotal": {
      const { totalPrice, totalQuantity } = state.cart.cart.reduce(
        (accumulator: any, currentValue: any) => {
          let { price, quantity } = currentValue;
          accumulator.totalPrice += price * quantity;
          accumulator.totalQuantity += quantity;
          return accumulator;
        },
        { totalPrice: 0, totalQuantity: 0 }
      );

      return {
        ...state,
        cart: {
          ...state.cart,
          totalPrice,
          totalQuantity,
        },
      };
    }

    case "cart/removeCart": {
      const updateCart = state.cart.cart.filter(
        (item: any) => item._id !== action.payload
      );
      localStorage.setItem("myCart", JSON.stringify(updateCart));
      return {
        ...state,
        cart: {
          ...state.cart,
          cart: updateCart,
        },
      };
    }

    case "cart/handleEditCartMode": {
      return {
        ...state,
        cart: {
          ...state.cart,
          editCartMode: action.payload,
        },
      };
    }

    case "cart/handleSelectCart": {
      let { id, cartLength } = action.payload;
      let selectCart = [...state.cart.selectCart];
      let index = selectCart.indexOf(id);

      if (index > -1) {
        selectCart.splice(index, 1);
      } else {
        selectCart.push(id);
      }

      return {
        ...state,
        cart: {
          ...state.cart,
          selectCart,
          selectAll: selectCart.length === cartLength,
        },
      };
    }

    case "cart/handleSelectAll": {
      let match = action.payload;
      let selectCart = [...state.cart.selectCart];
      const compareFn = (a: string[], b: string[]) =>
        a.length === b.length && a.every((elm, index) => elm === b[index]);

      const newSelectCart = compareFn(selectCart, match) ? [] : match;

      return {
        ...state,
        cart: {
          ...state.cart,
          selectCart: newSelectCart,
          selectAll: !state.cart.selectAll,
        },
      };
    }

    case "cart/removeSelectedCart": {
      const filteredCart = state.cart.cart.filter(
        (item: any) => !state.cart.selectCart.includes(item._id)
      );

      localStorage.setItem("myCart", JSON.stringify(filteredCart));
      return {
        ...state,
        cart: {
          ...state.cart,
          cart: filteredCart,
          selectCart: [],
        },
      };
    }

    case "cart/incItem": {
      let updatedCart = state.cart.cart.map((product: any) => {
        if (product._id === action.payload) {
          let quantity = product.quantity + 1;
          let midPrice = 20000;

          quantity =
            product.price <= midPrice && quantity >= 5
              ? 5
              : product.price > midPrice && quantity >= 3
              ? 3
              : quantity;

          return {
            ...product,
            quantity: quantity,
          };
        } else {
          return product;
        }
      });

      localStorage.setItem("myCart", JSON.stringify(updatedCart));
      return {
        ...state,
        cart: {
          ...state.cart,
          cart: updatedCart,
        },
      };
    }

    case "cart/decItem": {
      const updatedCart = state.cart.cart.map((product: any) => {
        if (product._id === action.payload) {
          let quantity = product.quantity - 1;
          if (quantity <= 1) {
            quantity = 1;
          }
          return {
            ...product,
            quantity: quantity,
          };
        } else {
          return product;
        }
      });

      localStorage.setItem("myCart", JSON.stringify(updatedCart));
      return {
        ...state,
        cart: {
          ...state.cart,
          cart: updatedCart,
        },
      };
    }

    // --- FILTER ACTIONS ---
    case "filter/setBrand": {
      let brand = action.payload;
      let newBrand = [...state.filter.brand];
      let index = newBrand.indexOf(brand);

      if (index > -1) {
        newBrand.splice(index, 1);
      } else {
        newBrand.push(brand);
      }

      return {
        ...state,
        filter: {
          ...state.filter,
          brand: newBrand,
        },
      };
    }

    case "filter/setOpenFilter": {
      const openFilter = action.payload;
      if (typeof window !== "undefined") {
        if (openFilter) {
          document.body.style.overflow = "hidden";
        } else {
          document.body.style.overflow = "visible";
        }
      }
      return {
        ...state,
        filter: {
          ...state.filter,
          openFilter,
        },
      };
    }

    case "filter/setSort": {
      return {
        ...state,
        filter: {
          ...state.filter,
          sort: action.payload,
        },
      };
    }

    case "filter/setRating": {
      const rating = action.payload === state.filter.rating ? "" : action.payload;
      return {
        ...state,
        filter: {
          ...state.filter,
          rating,
        },
      };
    }

    case "filter/setOffer": {
      const offer = action.payload === state.filter.offer ? "" : action.payload;
      return {
        ...state,
        filter: {
          ...state.filter,
          offer,
        },
      };
    }

    case "filter/setPrice": {
      return {
        ...state,
        filter: {
          ...state.filter,
          price: action.payload,
        },
      };
    }

    // --- ORDER ACTIONS ---
    case "order/setOrder": {
      if (typeof window !== "undefined") {
        const items = localStorage.getItem("order");
        const parsed = items ? JSON.parse(items) : null;
        return {
          ...state,
          order: {
            ...state.order,
            orders: parsed,
          },
        };
      }
      return state;
    }

    // --- PRODUCT ACTIONS ---
    case "product/setAllProducts": {
      return {
        ...state,
        product: {
          ...state.product,
          allProducts: action.payload,
        },
      };
    }

    case "product/setAllProductLoading": {
      return {
        ...state,
        product: {
          ...state.product,
          allProductLoading: action.payload,
        },
      };
    }

    case "product/setProduct": {
      return {
        ...state,
        product: {
          ...state.product,
          product: action.payload,
        },
      };
    }

    case "product/setProductLoading": {
      return {
        ...state,
        product: {
          ...state.product,
          productLoading: action.payload,
        },
      };
    }

    // --- USER ACTIONS ---
    case "user/setUser": {
      return {
        ...state,
        user: {
          ...state.user,
          user: action.payload,
        },
      };
    }

    case "user/setAuthStatus": {
      return {
        ...state,
        user: {
          ...state.user,
          authStatus: action.payload,
        },
      };
    }

    default:
      return state;
  }
};

export const Providers = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(appReducer, null, getInitialState);

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
};
