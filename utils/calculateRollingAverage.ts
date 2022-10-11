import { getRollingDailyScoresData } from "../api/health-rate/readLastSevenDailyScores";

export const calculateRollingAverage = async () => {
  const lastDailyScores = await getRollingDailyScoresData();
  console.log({ lastDailyScores });
  if (lastDailyScores) {
    const sumLastDailyScores = lastDailyScores.reduce((a, b) => a + b);
    const rollingSevenDayAvg = (
      sumLastDailyScores / lastDailyScores.length
    ).toFixed(2);
    return rollingSevenDayAvg;
  }
};
