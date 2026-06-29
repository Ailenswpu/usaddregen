import { cp, mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const sharedDir = join(root, "extension", "shared");

await mkdir(sharedDir, { recursive: true });
await cp(join(root, "src", "data"), join(sharedDir, "data"), { recursive: true });
await cp(join(root, "src", "lib"), join(sharedDir, "lib"), { recursive: true });

console.log("Copied shared generator modules into extension/shared.");
