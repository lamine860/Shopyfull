const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      const newState = {
        ...state,
        items: state.items.find((item) => item.id == action.payload.id)
          ? state.items.map((item) =>
              item.id == action.payload.id ? action.payload : item
            )
          : [...state.items, action.payload],
      };
      localStorage.setItem("cart", JSON.stringify(newState));
      return newState;
    case "REMOVE_FROM_CART":
      const filteredItems = state.items.filter(
        (item) => item.id != action.payload
      );
      const filteredState = { ...state, items: filteredItems };
      localStorage.setItem("cart", JSON.stringify(filteredState));
      return filteredState;
    case "CLEAR_CART":
      localStorage.removeItem("cart");
      return {
        items: [],
      };
    default:
      return state;
  }
};
export default cartReducer;
