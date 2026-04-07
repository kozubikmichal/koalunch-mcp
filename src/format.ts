import { MenuType, type Meal, type MenuSection, type RestaurantMenu } from "./api.js";

export function formatMeal(meal: Meal): string {
  if (!meal.price) return `  ${meal.name}`;
  return `  ${meal.name} — ${meal.price}`;
}

export function formatSection(section: MenuSection): string {
  const header = section.name ? `${section.name}:\n` : "";
  return header + section.meals.map(formatMeal).join("\n");
}

export function formatRestaurantMenu(rm: RestaurantMenu): string {
  const label = rm.type === MenuType.Weekly ? " (weekly offer)" : "";
  const sections = rm.menus.map(formatSection).join("\n\n");
  return `### ${rm.restaurant.name}${label}\n${sections || "  No menu available today."}`;
}
