export default function MeetingsList({ meetings, onDelete }) { // POPRAWKA: Odebranie onDelete
    return (
        <table>
            <thead>
            <tr>
                <th>Nazwa spotkania</th>
                <th>Opis</th>
                <th>Akcje</th> {/* DODANO: Kolumna na przycisk */}
            </tr>
            </thead>
            <tbody>
            {
                meetings.map((meeting, index) => (
                    <tr key={meeting.id || index}> {/* POPRAWKA: Użycie id jako klucza */}
                        <td>{meeting.title}</td>
                        <td>{meeting.description}</td>
                        <td>
                            {/* DODANO: Przycisk wywołujący funkcję usuwania dla konkretnego spotkania */}
                            <button onClick={() => onDelete(meeting)} style={{ backgroundColor: '#d9534f', color: 'white', border: 'none', padding: '5px 10px', cursor: 'pointer' }}>
                                Usuń
                            </button>
                        </td>
                    </tr>
                ))
            }
            </tbody>
        </table>
    );
}
