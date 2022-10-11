import React, { useState, useEffect } from 'react';
import fire from '../config/fire-config';
import { Form, Row, Col, Button, Table } from 'react-bootstrap';
import Head from 'next/head';
import { Layout } from '../components/Layout';
import { BackToHomeButton } from '../components/BackToHomeButton';

const TeamMembers = () => {
  const [teamMember, setTeamMember] = useState('');
  const [members, setMembers] = useState([]);
  const [position, setPosition] = useState('');
  const [memberToDelete, setMemberToDelete] = useState('');
  const [notification, setNotification] = useState('');

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

  const handleDelete = (event) => {
    event.preventDefault();

    fire
      .firestore()
      .collection('team-members')
      .doc(memberToDelete)
      .delete()
      .then(() => {
        console.log('Member successfully deleted!');
      })
      .catch((error) => {
        console.error('Error removing document: ', error);
      });

    setMemberToDelete('');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fire.firestore().collection('team-members').add({
      teamMember,
      position,
    });

    setTeamMember('');
    setNotification('Team member added');

    setTimeout(() => {
      setNotification('');
    }, 2000);
  };

  const orderMembersByPosition = members.sort((a, b) =>
    a.position > b.position ? 1 : -1
  );

  return (
    <>
      <Head>
        <title>Team Members</title>
      </Head>
      <Layout>
        <div className="page-header">
          <h2>Checkout Team Members</h2>
          <h5>Add or remove members</h5>
        </div>
        <div className="spacer">
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row}>
              <Form.Label column sm={3}>
                Team Member Name
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  placeholder="Member's full name"
                  onChange={({ target }) => setTeamMember(target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm={3}>
                Team Member Position
              </Form.Label>
              <Col sm={9}>
                <Form.Control
                  type="text"
                  placeholder="Member's position"
                  onChange={({ target }) => setPosition(target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Col sm={{ span: 12, offset: 0 }}>
                <Button type="submit">Save</Button>
              </Col>
              {notification}
            </Form.Group>
          </Form>

          <Form onSubmit={handleDelete}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <td colSpan={3}>
                    <h4>Checkout Team Members</h4>
                  </td>
                </tr>
              </thead>
              <tbody>
                {orderMembersByPosition.map((member) => (
                  <tr key={member.teamMember}>
                    <td>{member.teamMember}</td>
                    <td>{member.position}</td>
                    <td align="center">
                      <Button
                        variant="danger"
                        value={member.id}
                        type="submit"
                        onClick={() => setMemberToDelete(member.id)}
                      >
                        X
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Form>
        </div>
        <BackToHomeButton />
      </Layout>
    </>
  );
};

export default TeamMembers;
