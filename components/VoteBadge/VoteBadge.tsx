import React from "react";
import { Badge } from "react-bootstrap";

interface VoteBadgeProps {
  count: number;
}

const VoteBadge: React.FC<VoteBadgeProps> = ({ count }) => {
  return (
    <>
      <Badge pill variant="info">
        {count}
      </Badge>
    </>
  );
};

export { VoteBadge };
