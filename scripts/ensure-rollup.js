import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

if (process.platform === "linux") {
  const rollupLinuxPath = path.join(projectRoot, "node_modules", "@rollup", "rollup-linux-x64-gnu");

  if (!fs.existsSync(rollupLinuxPath)) {
    console.log("[ensure-rollup] Installing Linux binary for Rollup on Hostinger...");
    try {
      execSync("npm install @rollup/rollup-linux-x64-gnu @esbuild/linux-x64 --no-save --force", {
        cwd: projectRoot,
        stdio: "inherit"
      });
      console.log("[ensure-rollup] Linux binary installed successfully!");
    } catch (err) {
      console.error("[ensure-rollup] Warning: Failed to install linux binary:", err);
    }
  } else {
    console.log("[ensure-rollup] Linux binary already present.");
  }
}
