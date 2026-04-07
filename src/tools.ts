import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";
import { getAllMenus, getMenuById, getRestaurants } from "./api.js";
import { formatRestaurantMenu } from "./format.js";

export function registerTools(server: McpServer): void {
  server.registerTool(
    "get_restaurants",
    {
      title: "Get Restaurants",
      description:
        "List all restaurants tracked by Koalunch in Brno, Czech Republic. " +
        "Returns each restaurant's id, name, website URL, and GPS coordinates.",
      inputSchema: z.object({}),
    },
    async () => {
      const restaurants = await getRestaurants();
      const text = restaurants
        .map(
          (r) =>
            `• ${r.name} (id: ${r.id})\n  Web: ${r.url}\n  GPS: ${r.position.lat}, ${r.position.lng}`
        )
        .join("\n\n");
      return { content: [{ type: "text", text }] };
    }
  );

  server.registerTool(
    "get_today_menu",
    {
      title: "Get Today's Menu",
      description:
        "Get today's lunch menu for a specific restaurant by its id. " +
        "Use get_restaurants first to discover valid restaurant ids. " +
        "Returns menu sections with meal names and prices in CZK.",
      inputSchema: z.object({
        restaurant_id: z
          .string()
          .describe(
            "The restaurant id, e.g. 'kometaPubArena'. Use get_restaurants to list all ids."
          ),
      }),
    },
    async ({ restaurant_id }) => {
      const rm = await getMenuById(restaurant_id);
      return { content: [{ type: "text", text: formatRestaurantMenu(rm) }] };
    }
  );

  server.registerTool(
    "get_all_menus_today",
    {
      title: "Get All Menus Today",
      description:
        "Get today's lunch menus for all Koalunch restaurants at once. " +
        "Useful for comparing options, finding dishes by name, or filtering by price. " +
        "All prices are in CZK.",
      inputSchema: z.object({}),
    },
    async () => {
      const menus = await getAllMenus();
      const text = menus.map(formatRestaurantMenu).join("\n\n---\n\n");
      return { content: [{ type: "text", text }] };
    }
  );
}
