import React, { useState, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import fire from '../../config/fire-config';
import { ButtonGroup } from '../ButtonGroup';

export const RetroNotes = () => {
  const [notification, setNotification] = useState('');
  const [retroTheme, setRetroTheme] = useState('');
  const [members, setMembers] = useState([]);
  const [improvements, setImprovements] = useState([]);

  const today = new Date();
  const date =
    today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();

  useEffect(() => {
    fire
      .firestore()
      .collection('team-members')
      .onSnapshot((snap) => {
        const members = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMembers(members);
      });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    fire.firestore().collection('retro-notes').doc(date).set({
      retroTheme,
      improvements,
    });

    members.map((member) =>
      fire
        .firestore()
        .collection('retro-notes')
        .doc(date)
        .collection('submissions')
        .doc(member.teamMember)
        .set({
          pick: member.pick || '',
          rate: member.rate || '',
          dayDescription: member.dayDescription || '',
        })
    );

    setRetroTheme('');
    setNotification('Retro note created!');

    setTimeout(() => {
      setNotification('');
    }, 2000);
  };

  return (
    <div className="spacer">
      <Form onSubmit={handleSubmit}>
        <Form.Group as={Row} className="form-group-background">
          <Form.Label id="retro-date" column sm={2}>
            Date
          </Form.Label>
          <Col sm={10}>{date}</Col>
          <Form.Label id="retro-theme" column sm={2}>
            Retro theme
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              type="text"
              placeholder="Add a topic to describe your day"
              onChange={({ target }) => setRetroTheme(target.value)}
            />
          </Col>
        </Form.Group>
        {members.map((member) => {
          return (
            <>
              <Form.Group as={Row} id="team-input">
                <Form.Label column sm={12}>
                  {member.teamMember}
                </Form.Label>
                <Col sm={6}>
                  <Form.Control
                    type="text"
                    name={`${member.teamMember}-day-highlights`}
                    placeholder="Day highlights"
                    onChange={({ target }) =>
                      (member.dayDescription = target.value)
                    }
                  />
                </Col>
                <Col sm={6}>
                  <Form.Control
                    type="text"
                    name={`${member.teamMember}-pick`}
                    placeholder="Theme pick"
                    onChange={({ target }) => (member.pick = target.value)}
                  />
                </Col>
              </Form.Group>
            </>
          );
        })}
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            Improvements / Suggestions
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              as="textarea"
              placeholder="Add improvement actions for the team"
              onChange={({ target }) => setImprovements(target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Col sm={{ span: 12, offset: 0 }}>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Col>
        </Form.Group>
        {notification}
      </Form>
    </div>
  );
};
