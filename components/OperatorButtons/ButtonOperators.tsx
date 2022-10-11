import * as React from "react";
import { ExperimentStatus } from "../../types/statusTypes";
import { ButtonAction } from "./ButtonAction/ButtonAction";
import { EvaluateModal } from "../EvaluateModal";
import { Experiment } from "../../types/experiment";

interface OperatorButtonProps {
  status: ExperimentStatus;
  data: Experiment[];
  experimentId: string;
  handleVote: (experimentId: string) => void;
  handleStart: (experimentId: string) => void;
  handleAdopt: (experimentId: string) => void;
  handleReject: (experimentId: string) => void;
}
export const ButtonOperators: React.FC<OperatorButtonProps> = ({
  status,
  handleVote,
  handleStart,
  experimentId,
  handleAdopt,
  handleReject,
  data,
}) => {
  const experiment = data.filter(
    (experiment) => experiment.id === experimentId
  );

  return (
    <>
      {status === ExperimentStatus.SUGGESTED && (
        <>
          <ButtonAction
            buttonColour="info"
            buttonAction={() => handleVote(experimentId)}
            buttonText="Vote"
          />{" "}
          <ButtonAction
            buttonColour="success"
            buttonAction={() => handleStart(experimentId)}
            buttonText="Start"
          />
        </>
      )}
      {status === ExperimentStatus.ACTIVE && (
        <EvaluateModal
          handleAdopt={() => handleAdopt(experiment[0].id)}
          handleReject={() => handleReject(experiment[0].id)}
          experimentSuccess={experiment[0].successDescription}
          experimentName={experiment[0].name}
        />
      )}
    </>
  );
};
