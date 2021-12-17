import Image from 'next/image'
import { SubscribeButton } from '../components/SubscribeButton'
import styles from './home.module.scss'

export default function Home() {
   return (
      <>
         <h1>Home | ig.news</h1>

         <main className={styles.contentContainer}>
            <section className={styles.hero}>
               <span>👏 Hey, welcome</span>
               <h1>News about the <span>React</span> world.</h1>
               <p>
                  Get acess to all the publications <br />
                  <span>for $ 9.90</span>                  
               </p>
               <SubscribeButton />
            </section>

            <Image width={334} height={520} src="/images/avatar.svg" alt="Girl coding" />
         </main>
        
      </>
   )
}
