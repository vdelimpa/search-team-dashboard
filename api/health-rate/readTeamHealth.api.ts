import fire from "../../config/fire-config";
import { formattedDate } from "../../utils/getFormattedDate";

const getDailyTeamHealth = async () => {
  const dailyScoresData = await fire
    .firestore()
    .collection("health-rate")
    .orderBy("date", "desc")
    .get();
  return dailyScoresData.docs.map((doc) => {
    const { dailyScore, numberOfPeople, date } = doc.data();

    return {
      id: doc.id,
      date: formattedDate(date),
      dailyScore,
      numberOfPeople,
    };
  });
};

export { getDailyTeamHealth };
