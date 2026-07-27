import fs from "node:fs";
import path from "node:path";
import { execSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

if (process.platform === "linux") {
  // 1. Ensure lightningcss linux binaries are installed
  const lightningPath = path.join(projectRoot, "node_modules", "lightningcss-linux-x64-gnu");
  if (!fs.existsSync(lightningPath)) {
    console.log("[ensure-rollup] Installing lightningcss linux binaries for Tailwind v4...");
    try {
      execSync("npm install lightningcss-linux-x64-gnu lightningcss-linux-x64-musl --no-save --force", {
        cwd: projectRoot,
        stdio: "inherit"
      });
      console.log("[ensure-rollup] lightningcss linux binaries installed successfully!");
    } catch (err) {
      console.error("[ensure-rollup] Warning installing lightningcss binaries:", err);
    }
  }

  // 2. Ensure @tailwindcss/oxide linux binaries are installed
  const oxidePath = path.join(projectRoot, "node_modules", "@tailwindcss", "oxide-linux-x64-gnu");
  if (!fs.existsSync(oxidePath)) {
    console.log("[ensure-rollup] Installing @tailwindcss/oxide linux binaries for Tailwind v4...");
    try {
      execSync("npm install @tailwindcss/oxide-linux-x64-gnu @tailwindcss/oxide-linux-x64-musl --no-save --force", {
        cwd: projectRoot,
        stdio: "inherit"
      });
      console.log("[ensure-rollup] @tailwindcss/oxide linux binaries installed successfully!");
    } catch (err) {
      console.error("[ensure-rollup] Warning installing oxide binaries:", err);
    }
  }

  // 3. Configure Rollup WASM Fallback
  const rollupNativeJs = path.join(projectRoot, "node_modules", "rollup", "dist", "native.js");

  if (fs.existsSync(rollupNativeJs)) {
    try {
      const gnuPath = path.join(projectRoot, "node_modules", "@rollup", "rollup-linux-x64-gnu", "rollup.linux-x64-gnu.node");
      let needWasmFallback = false;

      if (fs.existsSync(gnuPath)) {
        try {
          process.dlopen({ exports: {} }, gnuPath);
          console.log("[ensure-rollup] Linux GLIBC check passed for native binary.");
        } catch (err) {
          console.log("[ensure-rollup] Linux GLIBC 2.29 check failed:", err.message);
          needWasmFallback = true;
        }
      } else {
        needWasmFallback = true;
      }

      if (needWasmFallback) {
        console.log("[ensure-rollup] Enabling WebAssembly (@rollup/wasm-node) fallback for Rollup...");
        const wasmShim = `const {
	parse,
	xxhashBase64Url,
	xxhashBase36,
	xxhashBase16
} = require('@rollup/wasm-node/dist/wasm-node/bindings_wasm.js');

exports.parse = parse;
exports.parseAsync = async (code, allowReturnOutsideFunction, jsx, _signal) =>
	parse(code, allowReturnOutsideFunction, jsx);
exports.xxhashBase64Url = xxhashBase64Url;
exports.xxhashBase36 = xxhashBase36;
exports.xxhashBase16 = xxhashBase16;
`;
        fs.writeFileSync(rollupNativeJs, wasmShim, "utf-8");
        console.log("[ensure-rollup] Successfully replaced Rollup native.js with WASM fallback!");
      }
    } catch (err) {
      console.error("[ensure-rollup] Error configuring WASM fallback:", err);
    }
  }
}
