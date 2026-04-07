const BASE_URL = "https://www.koalunch.cz";

export interface Position {
  lat: string;
  lng: string;
}

export interface Restaurant {
  id: string;
  name: string;
  url: string;
  position: Position;
  dateAdded?: string;
}

export interface Meal {
  name: string;
  price: string;
}

export interface MenuSection {
  name?: string;
  meals: Meal[];
}

export enum MenuType {
  Today = 0,
  Weekly = 1,
}

/** type 0 = today's offer, type 1 = weekly offer */
export interface RestaurantMenu {
  restaurant: Restaurant;
  /** Each element is a menu section (flat menus have one unnamed section) */
  menus: MenuSection[];
  type: MenuType;
}

async function apiFetch<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { Accept: "application/json" },
  });
  if (!res.ok) {
    throw new Error(`Koalunch API error ${res.status} for ${path}`);
  }
  return res.json() as Promise<T>;
}

export function getRestaurants(): Promise<Restaurant[]> {
  return apiFetch<Restaurant[]>("/api/restaurant");
}

export function getAllMenus(): Promise<RestaurantMenu[]> {
  return apiFetch<RestaurantMenu[]>("/api/menu");
}

export function getMenuById(id: string): Promise<RestaurantMenu> {
  return apiFetch<RestaurantMenu>(`/api/menu/${id}`);
}
