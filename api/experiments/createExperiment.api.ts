import { buildExperimentObject } from "../../utils/buildExperimentObject";
import fire from "../../config/fire-config";

const writeExperimentToDB = (values: any, setIsLoading: any) => {
  const newExperiment = buildExperimentObject(values);

  fire
    .firestore()
    .collection("experiments")
    .doc(newExperiment.id)
    .set({
      name: newExperiment.name,
      id: newExperiment.id,
      category: newExperiment.category,
      successDescription: newExperiment.successDescription,
      createdOn: newExperiment.createdOn,
      status: newExperiment.status,
      vote: newExperiment.vote,
      duration: newExperiment.duration,
      endOn: "",
    })
    .then(async () => {
      console.log("Document successfully written!");
      setIsLoading(false);
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
};

export { writeExperimentToDB };
