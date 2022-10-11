import { useState, useEffect } from 'react';
import Head from 'next/head';
import fire from '../../../config/fire-config';
import * as React from 'react';
import { RetroNotes } from '../../../components/RetroNotes';
import { BackToHomeButton } from '../../../components/BackToHomeButton';
import { CardDeck, Card } from 'react-bootstrap';

const Retro = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fire
      .firestore()
      .collection('retro-notes')
      .onSnapshot((snap) => {
        const notes = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setNotes(notes);
      });
  }, []);

  return (
    <>
      <Head>
        <title>Team Retro</title>
      </Head>
      <div className="page-header">
        <h2>Retro Notes</h2>
        <h5>Add a Retro Note</h5>
      </div>
      <RetroNotes />
      <div className="retro-history-bg">
        <h4>View an older retro entry</h4>
        <CardDeck>
          {notes.map((note) => (
            <Card key={note.id}>
              <Card.Body>
                <Card.Title>{note.id}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  Theme: {note.retroTheme}
                </Card.Subtitle>
                <Card.Link href={`/team-retro/retro/note/${note.id}`}>
                  View retro
                </Card.Link>
              </Card.Body>
            </Card>
          ))}
        </CardDeck>
      </div>
      <BackToHomeButton />
    </>
  );
};
export default Retro;
