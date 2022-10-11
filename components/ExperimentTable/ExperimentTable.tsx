import * as React from "react";
import { Card, Table } from "react-bootstrap";
import { ExperimentStatus } from "../../types/statusTypes";
import { ButtonOperators } from "../OperatorButtons/ButtonOperators";
import { VoteBadge } from "../VoteBadge";
import { Experiment } from "../../types/experiment";

interface ExperimentTableProps {
  status: ExperimentStatus;
  data: Experiment[] | undefined;
  handleVote: (id: string) => void;
  handleStart: (id: string) => void;
  handleAdopt: (id: string) => void;
  handleReject: (id: string) => void;
}
export const ExperimentTable: React.FC<ExperimentTableProps> = ({
  status,
  data,
  handleVote,
  handleStart,
  handleAdopt,
  handleReject,
}) => {
  return (
    <Card className="m-5">
      <Table striped bordered>
        <thead>
          <tr>
            <th>Experiment</th>
            <th>Category</th>
            {status !== ExperimentStatus.SUGGESTED ? (
              <th>End Date</th>
            ) : (
              <th>Created on</th>
            )}
          </tr>
        </thead>
        <tbody>
          {data?.map((exp, intIndex) => {
            return (
              <tr key={`tr-${intIndex}`}>
                <td>
                  {exp.name}{" "}
                  {exp.status === ExperimentStatus.SUGGESTED && (
                    <VoteBadge count={exp.vote} />
                  )}
                </td>
                <td>{exp.category}</td>
                <td>
                  {status === ExperimentStatus.SUGGESTED
                    ? exp.createdOn
                    : exp.endOn}
                </td>
                <td>
                  <ButtonOperators
                    data={data}
                    experimentId={exp.id}
                    status={status}
                    handleVote={() => handleVote(exp.id)}
                    handleStart={handleStart}
                    handleAdopt={() => handleAdopt(exp.id)}
                    handleReject={() => handleReject(exp.id)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Card>
  );
};
