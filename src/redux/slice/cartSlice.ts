export const addToCart = (payload: any) => ({ type: "cart/addToCart", payload });
export const setTotal = () => ({ type: "cart/setTotal" });
export const removeCart = (payload: any) => ({ type: "cart/removeCart", payload });
export const handleEditCartMode = (payload: any) => ({ type: "cart/handleEditCartMode", payload });
export const handleSelectCart = (payload: any) => ({ type: "cart/handleSelectCart", payload });
export const handleSelectAll = (payload: any) => ({ type: "cart/handleSelectAll", payload });
export const removeSelectedCart = () => ({ type: "cart/removeSelectedCart" });
export const incItem = (payload: any) => ({ type: "cart/incItem", payload });
export const decItem = (payload: any) => ({ type: "cart/decItem", payload });
