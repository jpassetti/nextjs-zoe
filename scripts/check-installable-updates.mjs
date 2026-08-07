import { spawnSync } from "node:child_process";

const result = spawnSync(
  "npm",
  ["outdated", "--json", "--depth=0"],
  {
    encoding: "utf8",
    env: {
      ...process.env,
      npm_config_cache: ".npm-cache",
    },
  }
);

let updates = {};

if (result.stdout && result.stdout.trim()) {
  try {
    updates = JSON.parse(result.stdout);
  } catch (error) {
    console.error("Failed to parse npm outdated output:", error);
    process.exit(1);
  }
}

const installableUpdates = Object.entries(updates).filter(([, info]) => {
  return info && typeof info === "object" && info.current !== info.wanted;
});

if (installableUpdates.length > 0) {
  console.error("Installable package updates found:");
  for (const [name, info] of installableUpdates) {
    console.error(`- ${name}: ${info.current} -> ${info.wanted}`);
  }
  process.exit(1);
}

process.exit(0);
