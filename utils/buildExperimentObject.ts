import { Experiment } from "../types/experiment";
import { ExperimentStatus } from "../types/statusTypes";
// @ts-ignore
import { v4 as uuidv4 } from "uuid";

const buildExperimentObject = (values: any): Experiment => {
  return {
    name: values.experimentName,
    id: uuidv4(),
    category: values.categoryRadios,
    successDescription: values.experimentSuccess,
    createdOn: new Date().toDateString(),
    status: ExperimentStatus.SUGGESTED,
    vote: 0,
    duration: values.durationRadios,
    endOn: "TBC",
  };
};

export { buildExperimentObject };
