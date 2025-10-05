/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
                net: false,
                tls: false,
                // 添加对React Native异步存储模块的忽略（Web环境无需此模块）
                "@react-native-async-storage/async-storage": false
            };
        }
        return config;
    },
};

module.exports = nextConfig;