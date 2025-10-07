import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';

import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, sepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { http } from 'viem'; // 从 viem 导入 http transport

// 使用 RainbowKit 的 getDefaultConfig 并配置 http transport
const config = getDefaultConfig({
    appName: 'Campus Passport',
    projectId: 'b5dd88b723004d8834e33604e614ad06',
    chains: [mainnet, polygon, optimism, arbitrum, sepolia],
    transports: {
        // 为每个链配置 http transport（替代原 publicProvider）
        [mainnet.id]: http(),
        [polygon.id]: http(),
        [optimism.id]: http(),
        [arbitrum.id]: http(),
        [sepolia.id]: http(),
    },
    ssr: true
});

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
    return (
        <WagmiProvider config={config}>
            <QueryClientProvider client={queryClient}>
                <RainbowKitProvider>
                    <Component {...pageProps} />
                </RainbowKitProvider>
            </QueryClientProvider>
        </WagmiProvider>
    );
}

export default MyApp;