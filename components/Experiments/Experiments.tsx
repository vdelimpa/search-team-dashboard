import * as React from 'react';
import { useEffect, useState } from 'react';
import { ExperimentForm } from '../ExperimentForm/ExperimentForm';
import { ExperimentStatus } from '../../types/statusTypes';
import { getExperimentsByStatus } from '../../api/experiments/readExperiments.api';
import {
  updateStatusToActive,
  updateStatusToAdopt,
  updateStatusToReject,
  updateVote,
} from '../../api/experiments/updateExperiment.api';
import { Experiment } from '../../types/experiment';
import { ExperimentStatusTable } from '../ExperimentTableNav/ExperimentTable';
import { BackToHomeButton } from '../../components/BackToHomeButton';

interface ExperimentProps {
  title: string;
}
export const Experiments: React.FC<ExperimentProps> = ({ title }) => {
  const [data, setData] = useState<Experiment[] | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  // const [filteredData, setFilteredData] = useState<Experiment[]>([]);
  const [selectedStatusExperiments, setSelectedStatusExperiments] = useState(
    ExperimentStatus.SUGGESTED
  );

  const fetchUpdatedData = async () => {
    const suggestedExperiments = await getExperimentsByStatus(
      selectedStatusExperiments
    );
    if (suggestedExperiments) {
      setData(suggestedExperiments);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchUpdatedData();
    })();
  }, [selectedStatusExperiments]);

  const handleVote = async (id: string) => {
    data?.map(async (experiment) => {
      if (experiment.id === id) {
        setIsLoading(true);
        await updateVote(experiment, fetchUpdatedData);
      }
    });
  };

  const handleStart = (id: string) => {
    data?.map(async (experiment) => {
      if (experiment.id === id) {
        setIsLoading(true);
        await updateStatusToActive(experiment, fetchUpdatedData);
      }
    });
  };

  const handleAdopt = (id: string) => {
    data?.map(async (experiment) => {
      if (experiment.id === id) {
        await updateStatusToAdopt(experiment, fetchUpdatedData);
      }
    });
  };

  const handleReject = (id: string) => {
    data?.map(async (experiment) => {
      if (experiment.id === id) {
        await updateStatusToReject(experiment, fetchUpdatedData);
      }
    });
  };

  const handleTabSelect = (status: any) => {
    setIsLoading(true);
    setSelectedStatusExperiments(status);
  };

  return (
    <>
      <div className="page-header">
        <h2>{title}</h2>
        <h5>Teamwork makes the dream work</h5>
      </div>
      <div className="spacer">
        <ExperimentForm
          fetchUpdatedData={fetchUpdatedData}
          setIsLoading={setIsLoading}
        />
        <ExperimentStatusTable
          data={data}
          handleTabSelect={handleTabSelect}
          handleVote={handleVote}
          handleStart={handleStart}
          handleAdopt={handleAdopt}
          handleReject={handleReject}
          isLoading={isLoading}
        />
        <BackToHomeButton />
      </div>
    </>
  );
};
