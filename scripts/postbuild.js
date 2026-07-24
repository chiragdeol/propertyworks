import fs from "node:fs";
import path from "node:path";

const srcDir = "dist";
const targets = ["build", ".output", ".output/public", "public_html", "backend/dist"];

if (fs.existsSync(srcDir)) {
  for (const target of targets) {
    try {
      if (target.includes("/")) {
        fs.mkdirSync(target, { recursive: true });
      }
      fs.cpSync(srcDir, target, { recursive: true });
      console.log(`[postbuild] Successfully synced output to '${target}'`);
    } catch (err) {
      console.error(`[postbuild] Failed to copy to '${target}':`, err);
    }
  }

  // Create Nitro entry file shims so Hostinger's default 'server/index.mjs' works seamlessly
  try {
    fs.mkdirSync(".output/server", { recursive: true });
    fs.writeFileSync(
      ".output/server/index.mjs",
      `import app from "../../backend/server.js";\nexport default app;\n`
    );
    fs.mkdirSync("server", { recursive: true });
    fs.writeFileSync(
      "server/index.mjs",
      `import app from "../backend/server.js";\nexport default app;\n`
    );
    console.log("[postbuild] Created Nitro entry shims server/index.mjs & .output/server/index.mjs");
  } catch (err) {
    console.error("[postbuild] Failed to write entry shims:", err);
  }
}
