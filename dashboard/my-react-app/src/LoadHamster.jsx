import React from 'react';
import styles from './LoadHamster.module.css';

const LoadHamster = () => {
  return (
    <div aria-label="Orange and tan hamster running in a metal wheel" role="img"
     className={styles.wheelAndHamster}
     >
      <div className={styles.wheel}></div>
      <div className={styles.hamster}>
        <div className={styles.hamster__body}>
          <div className={styles.hamster__head}>
            <div className={styles.hamster__ear}></div>
            <div className={styles.hamster__eye}></div>
            <div className={styles.hamster__nose}></div>
          </div>
          <div className={`${styles.hamster__limb} ${styles.hamster__limbfr}`}></div>
          <div className={`${styles.hamster__limb} ${styles.hamster__limbfl}`}></div>
          <div className={`${styles.hamster__limb} ${styles.hamster__limbbr}`}></div>
          <div className={`${styles.hamster__limb} ${styles.hamster__limbbl}`}></div>
          <div className={styles.hamster__tail}></div>
        </div>
      </div>
      <div className={styles.spoke}></div>
    </div>
  );
};

export default LoadHamster;
