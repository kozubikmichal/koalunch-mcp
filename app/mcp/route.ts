import { createMcpHandler } from "mcp-handler";
import { registerTools } from "../../src/tools";

const handler = createMcpHandler(
  (server) => registerTools(server),
  {},
  { basePath: "/" }
);

export { handler as GET, handler as POST, handler as DELETE };
