import Link from "next/link";
import { FC } from "react";
import styles from "./NavigationCard.module.css";

interface NavigationCardProps {
  path: string;
  title: string;
  text?: string;
}
export const NavigationCard: FC<NavigationCardProps> = ({
  path,
  title,
  text,
}) => {
  return (
    <Link href={path}>
      <a className={styles.card}>
        <h3>{title}</h3>
        <p>{text}</p>
      </a>
    </Link>
  );
};
