const { getDefaultConfig } = require("@expo/metro-config");
const path = require("path");

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "..");

const config = getDefaultConfig(projectRoot);

config.resolver.alias = {
    "@shared": path.resolve(workspaceRoot, "shared"),
    "@expo": path.resolve(workspaceRoot, "expo"),
};

config.watchFolders = [
    workspaceRoot, // モノレポの上位も監視対象に入れる（必須）
];

module.exports = config;
