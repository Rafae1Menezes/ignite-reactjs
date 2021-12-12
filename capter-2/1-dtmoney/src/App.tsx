import { Dashboard } from './components/Dashboard'
import { Header } from './components/Header'

import { useState } from 'react'

import { GlobalStyle } from './styles/global'
import { NewTrasactionModal } from './components/NewTransactionModal'



export function App() {
   const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false)

   function handleOpenNewTransactionModal() {
      setIsNewTransactionModalOpen(true)
   }

   function handleCLoseNewTransactionModal() {
      setIsNewTransactionModalOpen(false)
   }

   return (
      <>
         <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />
         <Dashboard />
         <NewTrasactionModal isOpen={isNewTransactionModalOpen} onRequestClose={handleCLoseNewTransactionModal} />
         
         <GlobalStyle />
      </>
   )
}
