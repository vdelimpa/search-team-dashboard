import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { Layout } from '../../../../components/Layout';
import fire from '../../../../config/fire-config';
import Button from 'react-bootstrap/Button';

const Note = (props) => {
  const { day, retroTheme, improvements } = props;
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fire
      .firestore()
      .collection('retro-notes')
      .doc(day)
      .collection('submissions')
      .onSnapshot((snap) => {
        const members = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMembers(members);
      });
  }, []);

  return (
    <>
      <Layout>
        <div className="page-header">
          <h2>Retro log</h2>
          <h5>{day}</h5>
        </div>
        <div className="spacer">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th> Retro theme </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{retroTheme}</td>
              </tr>
            </tbody>
          </Table>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Team members</th>
                <th>Theme Pick</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr>
                  <td>{member.id}</td>
                  <td>{member.pick}</td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th> Improvements / Suggestions </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  {improvements.length === 0
                    ? 'No improvements recorded for this day'
                    : improvements}
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
        <Button variant="primary" href="/team-retro/retro">
          Back to Retro Notes!
        </Button>{' '}
      </Layout>
    </>
  );
};

export const getServerSideProps = async ({ query }) => {
  const noteObj = {};

  await fire
    .firestore()
    .collection('retro-notes')
    .doc(query.id)
    .get()
    .then((result) => {
      noteObj['day'] = query.id;
      noteObj['retroTheme'] = result.data().retroTheme;
      noteObj['improvements'] = result.data().improvements;
    });

  return {
    props: {
      day: noteObj.day,
      retroTheme: noteObj.retroTheme,
      improvements: noteObj.improvements,
    },
  };
};

export default Note;
