import React from 'react';
import { Button } from 'react-bootstrap';

const BackToHomeButton = () => {
  return (
    <>
      <Button variant="outline-secondary" href="/">
        Back to home
      </Button>{' '}
    </>
  );
};

export { BackToHomeButton };
