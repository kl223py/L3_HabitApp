const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

config.resolver.sourceExts.push('cjs');

config.watchFolders = [
  path.resolve(__dirname, '../../L2HabitTracker')
];

config.resolver.nodeModulesPaths = [
  path.resolve(__dirname, 'node_modules'),
  path.resolve(__dirname, '../../L2HabitTracker')
];

config.resolver.unstable_enableSymlinks = true;

module.exports = config;