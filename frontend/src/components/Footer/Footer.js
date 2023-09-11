import React from "react";
import styles from "./Footer.module.css";

const footer = {
  name: "Recipe Search App",
  author: "Marcel Nędza",
  github: "https://github.com/Softon07",
  LinkedIn: "https://www.linkedin.com/in/marcel-n%C4%99dza-7b3954233/",
};

const Footer = () => {
  const fullYear = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <ul className={`wrapper ${styles.list}`}>
        <li className={styles.element}>
          {footer.name} {fullYear}
        </li>
        <li className={styles.element}>{footer.author}</li>
        <li className={`${styles.element} ${styles.animation}`}>
          <a href={footer.github} target="_blank" rel="noreferrer">
            github
          </a>
        </li>
        <li className={`${styles.element} ${styles.animation}`}>
          <a href={footer.name} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
