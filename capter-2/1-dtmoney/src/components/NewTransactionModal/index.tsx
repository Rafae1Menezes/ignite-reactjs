import Modal from 'react-modal'
import { Container, TransactionTypeContainer } from './styles'

import closeImg from '../../assests/close.svg'
import incomeImg from '../../assests/income.svg'
import outcomeImg from '../../assests/outcome.svg'

interface NewTransactionModalProps {
   isOpen: boolean
   onRequestClose: () => void
}

Modal.setAppElement('#root')

export function NewTrasactionModal({
   isOpen,
   onRequestClose,
}: NewTransactionModalProps) {
   return (
      <Modal
         isOpen={isOpen}
         onRequestClose={onRequestClose}
         overlayClassName="react-modal-overlay"
         className="react-modal-content"
      >
         <button
            type="button"
            onClick={onRequestClose}
            className="react-modal-close"
         >
            <img src={closeImg} alt="Fechar modal" />
         </button>

         <Container>
            <h2>Cadastrar transação</h2>

            <input placeholder="Título" />
            <input type="number" placeholder="Valor" />

            <TransactionTypeContainer>
               <button type="button">
                  <img src={incomeImg} alt="Entrada" />
                  <span>Entrada</span>
               </button>
               <button type="button">
                  <img src={outcomeImg} alt="Saída" />
                  <span>Saída</span>
               </button>
            </TransactionTypeContainer>


            <input placeholder="Categoria" />
            <button type="submit">Cadastrar</button>
         </Container>
      </Modal>
   )
}
