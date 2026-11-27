import * as pendo from "pendo-server-sdk";
import { createApp } from "./app.js";

// Pendo Agent Analytics records the Tripwise Assistant's conversations. Set PENDO_DISABLED=true to turn it off.
pendo.init({
  apiKey: "97d387b6-a009-4d27-902c-9ebdae991de6",
  agentId: "pQjNyIDyzzev2cxdCfgqUVlDUfA",
  endpoint: "https://app.pendo-dev.pendo-dev.com",
  autoPatch: true,
});

const port = Number(process.env.PORT) || 3001;
const corsOrigin = process.env.CORS_ORIGIN ?? "http://localhost:5173";

createApp(corsOrigin).listen(port, () => {
  console.log(`Tripwise API on port ${port}, allowing ${corsOrigin}`);
});

// Send the Pendo events still buffered before the process exits.
for (const signal of ["SIGINT", "SIGTERM"] as const) {
  process.on(signal, async () => {
    await pendo.shutdown();
    process.exit(0);
  });
}
