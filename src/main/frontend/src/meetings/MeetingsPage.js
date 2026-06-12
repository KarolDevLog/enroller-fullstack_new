import { useState, useEffect } from "react"; // POPRAWKA: Dodano useEffect do importu
import NewMeetingForm from "./NewMeetingForm";
import MeetingsList from "./MeetingsList";

export default function MeetingsPage({ username }) {
    const [meetings, setMeetings] = useState([]);
    const [addingNewMeeting, setAddingNewMeeting] = useState(false);

    // DODANO: Pobieranie istniejących spotkań z backendu przy wejściu do aplikacji
    useEffect(() => {
        const fetchMeetings = async () => {
            const response = await fetch('/api/meetings');
            if (response.ok) {
                const meetings = await response.json();
                setMeetings(meetings);
            }
        };
        fetchMeetings();
    }, []); // Pusta tablica oznacza, że pobierze dane tylko raz, przy starcie

    // Funkcja asynchroniczna dodawania (z poprzedniego zadania)
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

    function handleDeleteMeeting(meeting) {
        const nextMeetings = meetings.filter(m => m !== meeting);
        setMeetings(nextMeetings);
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
