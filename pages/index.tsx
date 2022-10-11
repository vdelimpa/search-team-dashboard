import Head from "next/head";
import styles from "../styles/Home.module.css";
import { NavigationCard } from "../components/NavigationCard/NavigationCard";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to the Checkout Team Dashboard!
        </h1>

        <p className={styles.description}>
          Useful tools and note-taking app 🧰
        </p>

        <div className={styles.grid}>
          <NavigationCard
            path={"/team-members"}
            title="Team Members"
            text="Add and remove team members from the Checkout Dashboard."
          />
          <NavigationCard
            path="/team-health"
            title="Team Health"
            text="Questionaire around team health issues."
          />
          <NavigationCard
            path="/team-retro/retro"
            title="Retro Notes"
            text="Daily retro notes and improvement suggestions."
          />
          <NavigationCard
            path="/experiment-tracker"
            title="WOW Experiments"
            text="Track and evaluate experiments around team ways of working."
          />
        </div>
      </main>
      <footer className={styles.footer}>Powered by Team COFE</footer>
    </div>
  );
}
