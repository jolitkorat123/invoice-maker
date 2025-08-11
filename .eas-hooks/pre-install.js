module.exports = async function (ctx) {
  console.log("⚡ Running npm install with legacy-peer-deps to avoid i18next conflict...");
  const { spawnSync } = require("child_process");
  const result = spawnSync("npm", ["install", "--legacy-peer-deps"], { stdio: "inherit" });
  if (result.status !== 0) {
    throw new Error("npm install failed");
  }
};
