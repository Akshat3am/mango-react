export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
    REGISTER: '/register',
    CART: '/cart',
    CHECKOUT: '/checkout',
    ORDER_CONFIRMATION: '/order-confirmation',
    MENU_MANAGEMENT: '/menu-management',
    ORDER_MANAGEMENT: '/order-management',
    MENU_DETAIL: "/menu/:id"
};
export const API_BASE_URL = "https://localhost:7086"

export const CATEGORY = [
    "Appetizer",
    "Entree",
    "Dessert",
   
];
export const ROLES ={
    CUSTOMER: "Customer",
    ADMIN: "Admin",
}
export const SPECIAL_TAG = [
    "",
    "Chef's Special",
    "Top Rated",
    "Best Seller",
    "New",
];

export const STORAGE_KEYS = {
TOKEN:"token-mango",
USER:"user-mango",

}

export const ORDER_STATUS = {
    CONFIRMED: "Confirmed",
    READY_FOR_PICKUP : "Ready for Pickup",
    COMPLETED: "Completed",
    CANCELLED: "Cancelled",
}