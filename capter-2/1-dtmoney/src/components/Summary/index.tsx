import incomeImg from '../../assests/income.svg'
import outcomeImg from '../../assests/outcome.svg'
import totalImg from '../../assests/total.svg'
import { useTransactions } from '../../hooks/useTransactions';

import { Container } from "./styles";

export function Summary () {
   const { transactions } = useTransactions()

   const sumary = transactions.reduce((acc, transaction) => {
      if(transaction.type === 'deposit'){
         acc.deposits += transaction.amount
         acc.total += transaction.amount
      }
         
      else if(transaction.type === 'withraw'){
         acc.withraws += transaction.amount
         acc.total -= transaction.amount
      }
       
      return acc
   },{
      deposits: 0,
      withraws: 0,
      total: 0
   })

   return (
      <Container>

         <div>
            <header>
               <p>Entradas</p>
               <img src={incomeImg} alt="Entradas" />
            </header>
            <strong>
               {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
               }).format(sumary.deposits)}
            </strong>
         </div>

         <div>
            <header>
               <p>Saídas</p>
               <img src={outcomeImg} alt="Saídas" />
            </header>
            <strong> -
               {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
               }).format(sumary.withraws)}
            </strong>
         </div>

         <div className='highlight-background'>
            <header>
               <p>Total</p>
               <img src={totalImg} alt="Total" />
            </header>
            <strong>
               {new Intl.NumberFormat('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
               }).format(sumary.total)}
            </strong>
         </div>        

      </Container>
   )
}