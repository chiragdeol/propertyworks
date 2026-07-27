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
  } else {
    console.log("[ensure-rollup] musl binary already present.");
  }

  // 2. Patch Rollup's native.js to fallback to musl package if GLIBC fails
  const rollupNativeJs = path.join(projectRoot, "node_modules", "rollup", "dist", "native.js");
  if (fs.existsSync(rollupNativeJs)) {
    try {
      let content = fs.readFileSync(rollupNativeJs, "utf-8");
      if (!content.includes("// PATCHED_GLIBC_FALLBACK_V2")) {
        content = content.replace(
          "const requireWithFriendlyError = id => {",
          `// PATCHED_GLIBC_FALLBACK_V2
const requireWithFriendlyError = id => {
	try {
		return require(id);
	} catch (error) {
		if (error && error.code === 'ERR_DLOPEN_FAILED') {
			try {
				return require('@rollup/rollup-linux-x64-musl');
			} catch (muslErr) {}
		}`
        );

        content = content.replace(
          "if ('musl' in imported && isMusl()) {",
          `if ('musl' in imported) {
		try {
			require('@rollup/rollup-' + imported.base);
		} catch (glibcErr) {
			if (glibcErr && glibcErr.code === 'ERR_DLOPEN_FAILED') {
				return imported.musl;
			}
		}
	}
	if ('musl' in imported && isMusl()) {`
        );

        fs.writeFileSync(rollupNativeJs, content, "utf-8");
        console.log("[ensure-rollup] Successfully applied GLIBC musl package fallback patch to Rollup native.js!");
      } else {
        console.log("[ensure-rollup] Rollup native.js already patched.");
      }
    } catch (patchErr) {
      console.error("[ensure-rollup] Warning: Failed to patch Rollup native.js:", patchErr);
    }
  }
}
