import fire from "../../config/fire-config";

const getExperimentsByStatus = async (experimentStatus: any) => {
  const experimentsByStatus = await fire
    .firestore()
    .collection("experiments")
    .where("status", "==", `${experimentStatus}`)
    .get();
  return experimentsByStatus.docs.map((doc) => {
    const {
      name,
      category,
      id,
      createdOn,
      vote,
      status,
      successDescription,
      duration,
      endOn,
    } = doc.data();
    return {
      name,
      category,
      id,
      createdOn,
      vote,
      successDescription,
      status,
      duration,
      endOn,
    };
  });
};

export { getExperimentsByStatus };
