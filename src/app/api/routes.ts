export const DASHBOARD_BASE_ROUTE = "/dashboard" as const;

export const ROUTES = {
  HOME: "/",
  SEARCH: "/search",
  PRODUCTS: "/products",
  DASHBOARD: {
    HOME: `${DASHBOARD_BASE_ROUTE}`,
    PRODUCTS: `${DASHBOARD_BASE_ROUTE}/products`,
    MANAGE_PRODUCT: `${DASHBOARD_BASE_ROUTE}/products/manage-product`,
    CATEGORIES: `${DASHBOARD_BASE_ROUTE}/categories`,
    MANAGE_CATEGORY: `${DASHBOARD_BASE_ROUTE}/categories/manage-category`,
    SPECIFICATIONS: `${DASHBOARD_BASE_ROUTE}/specifications`,
    MANAGE_SPECIFICATIONS: `${DASHBOARD_BASE_ROUTE}/specifications/manage-specifications`,
  },
} as const;

export const API_BASE_ROUTE = "/api" as const;

export const API_ROUTES = {
  PRODUCTS: `${API_BASE_ROUTE}/products`,
  CATEGORIES: `${API_BASE_ROUTE}/categories`,
  SPECIFICATIONS: `${API_BASE_ROUTE}/specifications`,
  UPLOADTHING: `${API_BASE_ROUTE}/uploadthing`,
} as const;
