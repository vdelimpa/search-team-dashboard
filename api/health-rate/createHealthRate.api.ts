import fire from "../../config/fire-config";
import { buildTeamHealthObject } from "../../utils/buildTeamHealthObject";

const writeHealthRateToDB = (
  negativeCount: number,
  neutralCount: number,
  positiveCount: number,
  numberOfPeople: number,
  score: number
) => {
  const teamHealthObject = buildTeamHealthObject(
    negativeCount,
    neutralCount,
    positiveCount,
    numberOfPeople,
    score
  );

  fire
    .firestore()
    .collection("health-rate")
    .doc()
    .set({
      numberOfPeople: teamHealthObject.numberOfPeople,
      dailyScore: teamHealthObject.dailyScore,
      negative: teamHealthObject.negative,
      neutral: teamHealthObject.neutral,
      positive: teamHealthObject.positive,
      date: teamHealthObject.date,
    })
    .then(async () => {
      console.log("Document successfully written!");
      // setIsLoading(false);
    })
    .catch((error) => {
      console.error("Error writing document: ", error);
    });
};

export { writeHealthRateToDB };
