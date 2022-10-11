import React from "react";
import { Spinner } from "react-bootstrap";

const LoadingSpinner: React.FC = () => {
  return (
    <>
      <Spinner animation="grow" variant="secondary" />
    </>
  );
};

export { LoadingSpinner };
