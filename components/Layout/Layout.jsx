import React from "react";
import styles from "./layout.module.css";

export const Layout = ({ children }) => {
  return <div className="container">{children}</div>;
};
