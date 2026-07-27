import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

if (process.platform === "linux") {
  const muslPath = path.join(projectRoot, "node_modules", "@rollup", "rollup-linux-x64-musl");

  // 1. Ensure musl binary is installed
  if (!fs.existsSync(muslPath)) {
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

  // 2. Patch Rollup's native.js to fallback to musl if gnu (GLIBC 2.29) fails
  const rollupNativeJs = path.join(projectRoot, "node_modules", "rollup", "dist", "native.js");
  if (fs.existsSync(rollupNativeJs)) {
    try {
      let content = fs.readFileSync(rollupNativeJs, "utf-8");
      if (!content.includes("linux-x64-musl")) {
        content = content.replace(
          "const requireWithFriendlyError = id => {",
          `const requireWithFriendlyError = id => {
	try {
		return require(id);
	} catch (origErr) {
		if (typeof id === 'string' && id.includes('linux-x64-gnu')) {
			try {
				return require(id.replace('linux-x64-gnu', 'linux-x64-musl'));
			} catch (muslErr) {}
		}
	}`
        );
        fs.writeFileSync(rollupNativeJs, content, "utf-8");
        console.log("[ensure-rollup] Successfully patched Rollup native.js for GLIBC musl fallback.");
      }
    } catch (patchErr) {
      console.error("[ensure-rollup] Warning: Failed to patch Rollup native.js:", patchErr);
    }
  }
}
