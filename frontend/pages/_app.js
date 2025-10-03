import '../styles/globals.css';
import '@rainbow-me/rainbowkit/styles.css';

import { RainbowKitProvider, getDefaultConfig } from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, sepolia } from 'wagmi/chains';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createConfig } from 'wagmi';

const config = getDefaultConfig({
    appName: 'Campus Passport',
    projectId: 'b5dd88b723004d8834e33604e614ad06', // WalletConnect Cloud 免费注册
    chains: [mainnet, polygon, optimism, arbitrum, sepolia],
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
