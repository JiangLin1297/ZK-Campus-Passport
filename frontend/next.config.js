/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
                net: false,
                tls: false,
                // ��Ӷ�React Native�첽�洢ģ��ĺ��ԣ�Web���������ģ�飩
                "@react-native-async-storage/async-storage": false
            };
        }
        return config;
    },
};

module.exports = nextConfig;