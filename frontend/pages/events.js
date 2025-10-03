// frontend/pages/events.js
import EventCard from '../components/EventCard';

export default function Events() {
  const mockEvents = [
    { id: 1, title: 'Hackathon 2025', desc: '校级黑客松', registered: false },
    { id: 2, title: '数学建模大赛', desc: '全国赛', registered: true },
  ];

  return (
    <div style={{ padding: '2rem' }}>
      <h2>📌 Available Events</h2>
      {mockEvents.map(e => <EventCard key={e.id} event={e} />)}
    </div>
  );
}
