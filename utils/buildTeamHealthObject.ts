import { DailyHealthScore } from "../types/teamHealth";
import firebase from "firebase";

const buildTeamHealthObject = (
  negativeCount: number,
  neutralCount: number,
  positiveCount: number,
  numberOfPeople: number,
  score: number
): DailyHealthScore => {
  return {
    numberOfPeople: numberOfPeople,
    date: firebase.firestore.FieldValue.serverTimestamp(),
    dailyScore: score,
    negative: negativeCount,
    neutral: neutralCount,
    positive: positiveCount,
  };
};

export { buildTeamHealthObject };
