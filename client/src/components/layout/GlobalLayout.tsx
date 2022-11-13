import Head from "next/head";
import { FC, ReactNode } from "react";
import styles from "../../styles/GlobalLayout.module.css";

const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Head>
        <title>DesafioFullStack</title>
      </Head>

      <main className={styles.main}>{children}</main>
    </>
  );
};

export default Layout;
