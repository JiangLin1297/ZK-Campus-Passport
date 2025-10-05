/** @type {import('next').NextConfig} */
const path = require('path');

const nextConfig = {
    webpack: (config, { isServer }) => {
        if (!isServer) {
            // ���� Node ����ģ�����ɱ��� fallback
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
                net: false,
                tls: false,
            };

            // ��� alias���� React Native �� AsyncStorage ָ������д�� polyfill
            config.resolve.alias['@react-native-async-storage/async-storage'] = path.resolve(
                __dirname,
                'polyfills/asyncStorage.js'
            );
        }
        return config;
    },
};

module.exports = nextConfig;
