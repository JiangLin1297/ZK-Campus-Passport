// frontend/components/ProfileCard.js
export default function ProfileCard({ result }) {
  return (
    <div style={{ border: '1px solid #ddd', margin: '1rem', padding: '1rem' }}>
      <h3>{result.event}</h3>
      <p>�ɼ�: {result.result}</p>
      <small>Proof: {result.proof}</small>
    </div>
  );
}
