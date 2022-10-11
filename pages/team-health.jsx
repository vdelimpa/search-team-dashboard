import Head from 'next/head';
import { ButtonGroup } from '../components/ButtonGroup';
import { BackToHomeButton } from '../components/BackToHomeButton';

const TeamHealth = () => {
  return (
    <>
      <Head>
        <title>Team Health History</title>
      </Head>
      <div className="page-header">
        <h2>Team Health history</h2>
        <h5>See how the team is feeling </h5>
      </div>
      <div className="spacer health-button-group">
        <ButtonGroup />
      </div>
      <BackToHomeButton />
    </>
  );
};

export default TeamHealth;
