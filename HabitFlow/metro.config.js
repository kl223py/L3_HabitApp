// metro.config.js
// Placera denna fil i HabitFlow root-mappen

const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Lägg till .cjs till resolver extensions om du har dem
config.resolver.sourceExts.push('cjs');

// Tillåt symlinks och node_modules utanför projektet
config.watchFolders = [
  path.resolve(__dirname, '../../L2HabitTracker')
];

config.resolver.nodeModulesPaths = [
  path.resolve(__dirname, 'node_modules'),
  path.resolve(__dirname, '../../L2HabitTracker')
];

// Aktivera symlink support
config.resolver.unstable_enableSymlinks = true;

module.exports = config;