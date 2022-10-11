import fire from "../../config/fire-config";
import { Experiment } from "../../types/experiment";
import { ExperimentStatus } from "../../types/statusTypes";

const updateVote = async (experiment: Experiment, fetchUpdatedData: any) => {
  await fire
    .firestore()
    .collection("experiments")
    .doc(experiment.id)
    .set({
      ...experiment,
      vote: experiment.vote + 1,
    })
    .then(async () => {
      console.log("Document successfully updated!");
      fetchUpdatedData();
    })
    .catch((error) => {
      console.error("Error updating document: ", error);
    });
};

const calculateEndDate = (day: any) => {
  const endDate = new Date();
  const numberOfDaysToAdd = parseInt(day);
  endDate.setDate(endDate.getDate() + numberOfDaysToAdd);

  console.log(endDate.toDateString());
  return endDate.toDateString();
};

const updateStatusToActive = async (
  experiment: Experiment,
  fetchUpdatedData: any
) => {
  await fire
    .firestore()
    .collection("experiments")
    .doc(experiment.id)
    .set({
      ...experiment,
      status: ExperimentStatus.ACTIVE,
      startedOn: new Date().toDateString(),
      endOn: calculateEndDate(experiment.duration),
    })
    .then(async () => {
      console.log("Document successfully updated!");
      fetchUpdatedData();
    })
    .catch((error) => {
      console.error("Error updating document: ", error);
    });
};

const updateStatusToAdopt = async (
  experiment: Experiment,
  fetchUpdatedData: any
) => {
  await fire
    .firestore()
    .collection("experiments")
    .doc(experiment.id)
    .set({
      ...experiment,
      status: ExperimentStatus.ADOPTED,
      startedOn: new Date().toString(),
    })
    .then(async () => {
      console.log("Document successfully updated!");
      fetchUpdatedData();
    })
    .catch((error) => {
      console.error("Error updating document: ", error);
    });
};

const updateStatusToReject = async (
  experiment: Experiment,
  fetchUpdatedData: any
) => {
  await fire
    .firestore()
    .collection("experiments")
    .doc(experiment.id)
    .set({
      ...experiment,
      status: ExperimentStatus.REJECTED,
      startedOn: new Date().toString(),
    })
    .then(async () => {
      console.log("Document status updated!");
      fetchUpdatedData();
    })
    .catch((error) => {
      console.error("Error updating document: ", error);
    });
};

export {
  updateVote,
  updateStatusToActive,
  updateStatusToAdopt,
  updateStatusToReject,
};
