import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

if (process.platform === "linux") {
  const gnuPath = path.join(projectRoot, "node_modules", "@rollup", "rollup-linux-x64-gnu");
  const muslPath = path.join(projectRoot, "node_modules", "@rollup", "rollup-linux-x64-musl");

  let gnuWorks = false;
  if (fs.existsSync(gnuPath)) {
    try {
      const gnuModulePath = path.join(gnuPath, "rollup.linux-x64-gnu.node");
      process.dlopen({ exports: {} }, gnuModulePath);
      gnuWorks = true;
      console.log("[ensure-rollup] GLIBC check passed for rollup-linux-x64-gnu.");
    } catch (err) {
      console.log("[ensure-rollup] GLIBC check failed for rollup-linux-x64-gnu:", err.message);
      try {
        fs.rmSync(gnuPath, { recursive: true, force: true });
        console.log("[ensure-rollup] Removed incompatible gnu binary.");
      } catch (rmErr) {}
    }
  }

  if (!gnuWorks || !fs.existsSync(muslPath)) {
    console.log("[ensure-rollup] Installing @rollup/rollup-linux-x64-musl for GLIBC compatibility...");
    try {
      execSync("npm install @rollup/rollup-linux-x64-musl @esbuild/linux-x64 --no-save --force", {
        cwd: projectRoot,
        stdio: "inherit"
      });
      console.log("[ensure-rollup] musl binary installed successfully!");
    } catch (err) {
      console.error("[ensure-rollup] Warning: Failed to install musl binary:", err);
    }
  }
}
