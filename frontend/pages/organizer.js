// frontend/pages/organizer.js
export default function Organizer() {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>🏆 Organizer Panel</h2>
      <form>
        <h3>Create New Event</h3>
        <input placeholder="Event Title" /><br />
        <textarea placeholder="Description" /><br />
        <button type="submit">Create Event</button>
      </form>

      <hr />

      <form>
        <h3>Submit Results</h3>
        <input placeholder="Event ID" /><br />
        <input placeholder="Student Wallet" /><br />
        <input placeholder="Result / Proof Hash" /><br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
