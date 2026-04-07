# Koalunch MCP

An MCP server that gives AI assistants access to daily lunch menus from restaurants in Brno, Czech Republic — powered by [Koalunch](https://www.koalunch.cz).

## What it does

Ask your AI assistant things like:
- *"What's for lunch today at Eatology?"*
- *"Which restaurant has soup under 50 Kč today?"*
- *"Show me all lunch menus for today."*
- *"Find me something with salmon today."*

## Available tools

| Tool | Description |
|---|---|
| `get_restaurants` | Lists all tracked restaurants with their name, website, and GPS location |
| `get_today_menu` | Returns today's menu for a specific restaurant |
| `get_all_menus_today` | Returns today's menus for all restaurants at once |

## Restaurants

15 restaurants in Brno, including Buddha 2, Buffalo American Steakhouse, Eatology, Grand Kitchen Vlněna, IL Paladar, Jean Paul's Bistro, Kometa Pub Arena, Milenium Kitchen, Rebio Holandská, Sharingham, Tusto Titanium, and more.

## Setup

### Claude Desktop / Claude Code

Add to your MCP configuration:

```json
{
  "mcpServers": {
    "koalunch": {
      "url": "https://mcp.koalunch.cz/mcp"
    }
  }
}
```

### Cursor

Add to `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "koalunch": {
      "url": "https://mcp.koalunch.cz/mcp"
    }
  }
}
```

## Data

All menu data comes from [koalunch.cz](https://www.koalunch.cz), which aggregates daily lunch menus from participating restaurants. Menus are updated daily. Prices are in CZK.
