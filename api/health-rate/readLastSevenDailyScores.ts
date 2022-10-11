import fire from "../../config/fire-config";

export const getRollingDailyScoresData = async () => {
  const dailyScoresRef = await fire
    .firestore()
    .collection("health-rate")
    .orderBy("date", "desc")
    .limit(5)
    .get();

  if (dailyScoresRef) {
    return dailyScoresRef.docs.map((doc) => {
      const { dailyScore } = doc.data();
      return dailyScore;
    });
  }
  console.log("No daily Scores");
};
