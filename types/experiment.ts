import { ExperimentStatus } from "./statusTypes";

export interface Experiment {
  name: string;
  id: string;
  category: string;
  successDescription: string;
  createdOn: string;
  startedOn?: string;
  status: ExperimentStatus;
  vote: number;
  duration: string;
  endOn?: string;
}
