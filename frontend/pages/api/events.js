let events = [
  {
    id: 1,
    name: "Hackathon 2025 @ SCUT",
    date: "2025-11-20",
    location: "华南理工大学",
    status: "报名中",
    participants: [] // 每个参赛者 { wallet, score }
  },
  {
    id: 2,
    name: "数学建模竞赛",
    date: "2025-12-05",
    location: "全国范围",
    status: "即将开始",
    participants: []
  },
  {
    id: 3,
    name: "区块链应用创新挑战赛",
    date: "2026-01-10",
    location: "线上",
    status: "已结束",
    participants: []
  }
];

export default function handler(req, res) {
  if (req.method === 'GET') {
    return res.status(200).json(events);
  }

  if (req.method === 'POST') {
    const { name, date, location, status } = req.body;
    if (!name || !date || !location || !status) {
      return res.status(400).json({ error: '缺少必要字段' });
    }
    const newEvent = {
      id: events.length + 1,
      name,
      date,
      location,
      status,
      participants: []
    };
    events.push(newEvent);
    return res.status(201).json(newEvent);
  }

  if (req.method === 'PUT') {
    const { eventId, wallet, score } = req.body;
    const event = events.find(e => e.id === parseInt(eventId));
    if (!event) {
      return res.status(404).json({ error: '赛事不存在' });
    }

    let participant = event.participants.find(p => p.wallet === wallet);
    if (!participant) {
      // 如果还没报名，则报名
      participant = { wallet, score: score || null };
      event.participants.push(participant);
    } else if (score) {
      // 如果已有，更新成绩
      participant.score = score;
    }

    return res.status(200).json(event);
  }

  res.setHeader('Allow', ['GET', 'POST', 'PUT']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
