import * as React from "react";
import { Button } from "react-bootstrap";

interface ButtonActionProps {
  buttonText: string;
  buttonAction: () => void;
  buttonColour: string;
}
export const ButtonAction: React.FC<ButtonActionProps> = ({
  buttonText,
  buttonAction,
  buttonColour,
}) => {
  return (
    <Button onClick={buttonAction} variant={buttonColour}>
      {buttonText}
    </Button>
  );
};
