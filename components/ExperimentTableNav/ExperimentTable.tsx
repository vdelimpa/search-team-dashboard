import * as React from "react";
import { Tab, Tabs } from "react-bootstrap";
import { ExperimentTable } from "../ExperimentTable/ExperimentTable";
import { ExperimentStatus } from "../../types/statusTypes";
import { Experiment } from "../../types/experiment";
import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";

interface ExperimentStatusTableProps {
  data: Experiment[] | undefined;
  handleVote: (id: string) => void;
  handleStart: (id: string) => void;
  handleReject: (id: string) => void;
  handleAdopt: (id: string) => void;
  handleTabSelect: (status: any) => void;
  isLoading: boolean;
}

export const ExperimentStatusTable: React.FC<ExperimentStatusTableProps> = ({
  data,
  handleTabSelect,
  handleVote,
  handleStart,
  handleReject,
  handleAdopt,
  isLoading,
}) => {
  const statuses = [
    ExperimentStatus.SUGGESTED,
    ExperimentStatus.ACTIVE,
    ExperimentStatus.ADOPTED,
    ExperimentStatus.REJECTED,
  ];

  return (
    <Tabs
      defaultActiveKey={statuses[0]}
      id="status-tabs"
      onSelect={(k) => handleTabSelect(k)}
    >
      {statuses.map((status) => (
        <Tab
          key={`${status}-experiments-tab`}
          eventKey={status}
          title={`${status} Experiments`}
          onSelect={() => handleTabSelect(status)}
        >
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <ExperimentTable
              data={data}
              status={status}
              handleVote={handleVote}
              handleStart={handleStart}
              handleReject={handleReject}
              handleAdopt={handleAdopt}
            />
          )}
        </Tab>
      ))}
    </Tabs>
  );
};
