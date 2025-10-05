/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
    webpack: (config, { isServer }) => {
        if (!isServer) {
            // 其它 Node 核心模块依旧保持 fallback
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
                net: false,
                tls: false,
            };

            // 添加 alias：将 React Native 的 AsyncStorage 指向我们写的 polyfill
            config.resolve.alias['@react-native-async-storage/async-storage'] = path.resolve(
                __dirname,
                'polyfills/asyncStorage.js'
            );
        }
        return config;
    },
};

module.exports = nextConfig;
