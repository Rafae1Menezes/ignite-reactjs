import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ActiveLInk } from "../ActiveLink";
import { SignInButton } from "../SignInButton";

import styles from './styles.module.scss'

export function Header() {
   

   return (
      <header className={styles.headerContainer}>
         <div className={styles.headerContent}>
            <Link href="/" passHref><Image src="/images/logo.svg" alt="ig.news" width={108} height={30} /></Link>
            <nav>
               <ActiveLInk activeClassName={styles.active}  href="/"><a>Home</a></ActiveLInk>
               <ActiveLInk activeClassName={styles.active}  href="/posts" prefetch><a>Posts</a></ActiveLInk>
            </nav>
            <SignInButton />
         </div>
      </header>
   )
}