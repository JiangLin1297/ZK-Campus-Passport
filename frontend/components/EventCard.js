// frontend/components/EventCard.js
export default function EventCard({ event }) {
    return (
        <div style={{ border: '1px solid #ddd', margin: '1rem', padding: '1rem' }}>
            <h3>{event.title}</h3>
            <p>{event.desc}</p>
            {event.registered ? (
                <button disabled>�ѱ���</button>
            ) : (
                <button>����</button>
            )}
        </div>
    );
}
