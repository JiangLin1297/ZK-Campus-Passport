// frontend/components/Layout.js
import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Layout({ children }) {
  return (
    <div>
      {/* 全局导航栏 */}
      <nav style={{
        padding: '10px 20px',
        background: '#f0f0f0',
        borderBottom: '1px solid #ccc',
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        {/* 左侧导航链接 */}
        <div>
          <Link href="/" legacyBehavior><a style={{ marginRight: '15px' }}>首页</a></Link>
          <Link href="/events" legacyBehavior><a style={{ marginRight: '15px' }}>赛事广场</a></Link>
          <Link href="/organizer" legacyBehavior><a style={{ marginRight: '15px' }}>主办方入口</a></Link>
          <Link href="/profile" legacyBehavior><a>我的档案</a></Link>
        </div>

        {/* 右侧钱包按钮 */}
        <div>
          <ConnectButton />
        </div>
      </nav>

      {/* 页面主体内容 */}
      <main style={{ padding: '20px' }}>
        {children}
      </main>
    </div>
  );
}
