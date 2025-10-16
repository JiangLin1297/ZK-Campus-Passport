// frontend/pages/events.js
import { useState, useEffect } from "react";
import { useContractWrite, useWaitForTransactionReceipt, useContractRead } from 'wagmi';
import { useAccount } from 'wagmi';
import toast from 'react-hot-toast';
import Layout from "../components/Layout";
import Image from "next/image";
import Link from "next/link";
// 导入赛事合约ABI（保持原有样式，仅添加合约交互）
const EVENT_CONTRACT_ABI = [
    {
        "inputs": [{ "internalType": "uint256", "name": "eventId", "type": "uint256" }],
        "name": "registerForEvent",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getAllEvents",
        "outputs": [
            {
                "components": [
                    { "internalType": "uint256", "name": "id", "type": "uint256" },
                    { "internalType": "string", "name": "name", "type": "string" },
                    { "internalType": "string", "name": "date", "type": "string" },
                    { "internalType": "string", "name": "location", "type": "string" },
                    { "internalType": "string", "name": "status", "type": "string" },
                    { "internalType": "string", "name": "type", "type": "string" }
                ],
                "internalType": "struct Event[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];
const EVENT_CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3"; // 替换为实际地址

function Events() {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState("all");
    const [filteredEvents, setFilteredEvents] = useState([]);
    const { address, isConnected } = useAccount();

    // 从链上读取赛事数据（替换原fetch本地API）
    const { data: onChainEvents, isLoading: isLoadingEvents } = useContractRead({
        address: EVENT_CONTRACT_ADDRESS,
        abi: EVENT_CONTRACT_ABI,
        functionName: "getAllEvents",
    });

    useEffect(() => {
        window.scrollTo(0, 0);
        if (onChainEvents) {
            setEvents(onChainEvents);
            setFilteredEvents(onChainEvents);
            setLoading(false);
        }
    }, [onChainEvents]);

    // 筛选逻辑保持不变
    useEffect(() => {
        if (category === "all") {
            setFilteredEvents(events);
        } else {
            setFilteredEvents(events.filter(event => event.type === category));
        }
    }, [category, events]);

    // 报名赛事的合约调用（新增链上交互）
    const { write: registerEvent, data: registerTx } = useContractWrite({
        address: EVENT_CONTRACT_ADDRESS,
        abi: EVENT_CONTRACT_ABI,
        functionName: "registerForEvent",
    });

    // 等待交易确认
    const { isLoading: isRegistering } = useWaitForTransactionReceipt({
        hash: registerTx?.hash,
        onSuccess: () => {
            toast.success("报名成功！已上链");
        },
        onError: (error) => {
            toast.error("报名失败：" + error.message);
        }
    });

    // 处理报名点击（保持原有按钮样式）
    const handleRegister = (eventId) => {
        if (!isConnected) {
            toast.error("请先连接钱包");
            return;
        }
        registerEvent({ args: [eventId] });
        toast.loading("正在提交报名...");
    };

    // 状态样式函数保持不变
    const getStatusClass = (status) => {
        switch (status) {
            case "报名中": return "status-open";
            case "即将开始": return "status-upcoming";
            case "进行中": return "status-active";
            case "已结束": return "status-ended";
            default: return "";
        }
    };

    return (
        <Layout>
            {/* 原有头部横幅保持不变 */}
            <section className="hero-section events-hero relative overflow-hidden bg-f8fafc">
                {/* 内容与原代码一致 */}
            </section>

            <main className="max-w-6xl mx-auto px-6 py-12">
                {/* 赛事筛选部分保持不变 */}
                <section className="filters-section mb-10">
                    {/* 内容与原代码一致 */}
                </section>

                {/* 赛事列表（仅修改报名按钮逻辑） */}
                {loading || isLoadingEvents ? (
                    <div className="loading-state">
                        <div className="loading-spinner"></div>
                        <p>正在加载赛事...</p>
                    </div>
                ) : filteredEvents.length === 0 ? (
                    <div className="no-events">
                        {/* 内容与原代码一致 */}
                    </div>
                ) : (
                    <div className="events-grid">
                        {filteredEvents.map((event) => (
                            <div key={event.id} className="event-card">
                                {/* 赛事卡片内容保持不变 */}
                                <div className="event-image">
                                    <Image
                                        src={`/event-${event.type}.jpg`}
                                        alt={event.name}
                                        width={400}
                                        height={200}
                                        placeholder="blur"
                                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+P+/HgAFeAJ5gMmR8QAAAABJRU5ErkJggg=="
                                    />
                                </div>
                                <div className="event-info">
                                    {/* 其他信息保持不变 */}
                                    <div className="event-actions">
                                        <button
                                            className="primary-btn"
                                            onClick={() => handleRegister(event.id)}
                                            disabled={isRegistering || event.status !== "报名中"}
                                        >
                                            {isRegistering ? "处理中..." : "报名参加"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* 行动号召部分保持不变 */}
            <section className="cta-section">
                {/* 内容与原代码一致 */}
            </section>
        </Layout>
    );
}

export default Events;