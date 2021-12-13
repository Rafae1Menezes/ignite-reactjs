import { Dashboard } from './components/Dashboard'
import { Header } from './components/Header'

import { useState } from 'react'

import { GlobalStyle } from './styles/global'
import { NewTrasactionModal } from './components/NewTransactionModal'
import { TransactionsProvider } from './hooks/useTransactions'



export function App() {
   const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false)

   function handleOpenNewTransactionModal() {
      setIsNewTransactionModalOpen(true)
   }

   function handleCLoseNewTransactionModal() {
      setIsNewTransactionModalOpen(false)
   }

   return (
      <TransactionsProvider>
         <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
         <Dashboard />
         <NewTrasactionModal isOpen={isNewTransactionModalOpen} onRequestClose={handleCLoseNewTransactionModal} />
         
         <GlobalStyle />
      </TransactionsProvider>
   )
}
