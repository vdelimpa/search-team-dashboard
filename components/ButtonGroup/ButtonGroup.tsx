import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { TeamHealthTable } from '../TeamHealthTable/TeamHealthTable';
import { writeHealthRateToDB } from '../../api/health-rate/createHealthRate.api';
import { calculateRollingAverage } from '../../utils/calculateRollingAverage';
import { getDailyTeamHealth } from '../../api/health-rate/readTeamHealth.api';
import { getTodayDate } from '../../utils/getFormattedDate';

export const ButtonGroup: React.FC = () => {
  const [negativeCount, setNegativeCount] = useState(0);
  const [neutralCount, setNeutralCount] = useState(0);
  const [positiveCount, setPositiveCount] = useState(0);
  const [rollingAverage, setRollingAverage] = useState<any>();
  const [dailyScores, setDailyScores] = useState<any>();
  const [dailyScore, setDailyScore] = useState<any>(0);

  const scores = {
    positive: 5,
    neutral: 3,
    negative: 1,
  };

  const numberOfPeople = negativeCount + neutralCount + positiveCount;

  const calculateDailyHealth = () => {
    return (
      (negativeCount * scores.negative +
        neutralCount * scores.neutral +
        positiveCount * scores.positive) /
      numberOfPeople
    );
  };

  const handleClick = async () => {
    if(negativeCount || neutralCount || positiveCount) {
        const score = calculateDailyHealth();
        setDailyScore(score);
        setDailyScores((prevState: any) => [
          { date: getTodayDate(), dailyScore: score, numberOfPeople },
          ...prevState,
        ]);

        await writeHealthRateToDB(
          negativeCount,
          neutralCount,
          positiveCount,
          numberOfPeople,
          score
        );
        setNeutralCount(0);
        setPositiveCount(0);
        setNegativeCount(0);
      }
  };

  useEffect(() => {
    (async () => {
      const data = await getDailyTeamHealth();
      setDailyScores(data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const average = await calculateRollingAverage();
      setRollingAverage(average);
    })();
  }, [dailyScores]);

  return (
    <div>
      <div className="daily-box-container">
        <div className="box-container">
          <div className="box">
            <div className="negative-label">{negativeCount}</div>
            <div className="neutral-label">{neutralCount}</div>
            <div className="positive-label">{positiveCount}</div>
          </div>

          <div className="box">
            <Button
              size="lg"
              variant="danger"
              onClick={() => setNegativeCount(negativeCount + 1)}
            >
              &#128534;
            </Button>
            <Button
              size="lg"
              variant="warning"
              onClick={() => setNeutralCount(neutralCount + 1)}
            >
              &#128528;
            </Button>
            <Button
              size="lg"
              variant="success"
              onClick={() => setPositiveCount(positiveCount + 1)}
            >
              &#128578;
            </Button>
          </div>
        </div>
        <Button size="lg" variant="secondary" onClick={handleClick}>
          Calculate Daily Score
        </Button>
        <h1 className="daily-score">{dailyScore.toFixed(2)}</h1>
      </div>
      <h1>{`Rolling 5 day average: ${rollingAverage}`}</h1>
      <TeamHealthTable dailyScores={dailyScores} />
    </div>
  );
};
