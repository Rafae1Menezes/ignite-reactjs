import Image from "next/image";
import Link from "next/link";
import { SignInButton } from "../SignInButton";

import styles from './styles.module.scss'

export function Header() {
   return (
      <header className={styles.headerContainer}>
         <div className={styles.headerContent}>
            <Link href="/" passHref><Image src="/images/logo.svg" alt="ig.news" width={108} height={30} /></Link>
            <nav>
               <a className={styles.active}>Home</a>
               <a>Posts</a>
            </nav>
            <SignInButton />
         </div>
      </header>
   )
}