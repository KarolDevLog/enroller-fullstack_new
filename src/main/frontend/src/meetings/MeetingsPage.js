import { useState, useEffect } from "react";
import NewMeetingForm from "./NewMeetingForm";
import MeetingsList from "./MeetingsList";

export default function MeetingsPage({ username }) {
    const [meetings, setMeetings] = useState([]);
    const [addingNewMeeting, setAddingNewMeeting] = useState(false);

    // Pobieranie istniejących spotkań (z poprzedniego zadania)
    useEffect(() => {
        const fetchMeetings = async () => {
            const response = await fetch('/api/meetings');
            if (response.ok) {
                const meetings = await response.json();
                setMeetings(meetings);
            }
        };
        fetchMeetings();
    }, []);

    // Dodawanie spotkania (z poprzedniego zadania)
    async function handleNewMeeting(meeting) {
        const response = await fetch('/api/meetings', {
            method: 'POST',
            body: JSON.stringify(meeting),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            const savedMeeting = await response.json();
            const nextMeetings = [...meetings, savedMeeting];
            setMeetings(nextMeetings);
            setAddingNewMeeting(false);
        } else {
            alert("Nie udało się zapisać spotkania na serwerze.");
        }
    }

    // ZMIANA: Asynchroniczne usuwanie spotkania z bazy danych backendu
    async function handleDeleteMeeting(meeting) {
        const response = await fetch(`/api/meetings/${meeting.id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            const nextMeetings = meetings.filter(m => m.id !== meeting.id); // Bezpieczniejsze filtrowanie po ID
            setMeetings(nextMeetings);
        } else {
            alert("Nie udało się usunąć spotkania z serwera.");
        }
    }

    return (
        <div>
            <h2>Zajęcia ({meetings.length})</h2>
            {
                addingNewMeeting
                    ? <NewMeetingForm onSubmit={(meeting) => handleNewMeeting(meeting)}/>
                    : <button onClick={() => setAddingNewMeeting(true)}>Dodaj nowe spotkanie</button>
            }
            {meetings.length > 0 &&
                <MeetingsList meetings={meetings} username={username}
                              onDelete={handleDeleteMeeting}/>}
        </div>
    )
}
