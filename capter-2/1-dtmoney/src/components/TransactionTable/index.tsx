import { Containter } from "./styles";


export function TransactionTable () {

   return(
      <Containter>
         <table>
            <thead>
               <tr>
                  <th>Título</th>
                  <th>Valor</th>
                  <th>Category</th>
                  <th>Data</th>
               </tr>
            </thead>

            <tbody>
               <tr>
                  <td>Desenvolvimento de Website</td>
                  <td className="deposit">R$ 12.000,00</td>
                  <td>Desenvolvimento</td>
                  <td>20/02/2021</td>
               </tr>
               <tr>
                  <td>Aluguel</td>
                  <td className="withraw">- R$ 2.000,00</td>
                  <td>Casa</td>
                  <td>01/02/2021</td>
               </tr>
               <tr>
                  <td>Desenvolvimento de Website</td>
                  <td className="deposit">R$ 12.000,00</td>
                  <td>Desenvolvimento</td>
                  <td>20/02/2021</td>
               </tr>
               <tr>
                  <td>Desenvolvimento de Website</td>
                  <td className="deposit">R$ 12.000,00</td>
                  <td>Desenvolvimento</td>
                  <td>20/02/2021</td>
               </tr>
            </tbody>
         </table>
      </Containter>
   )
}