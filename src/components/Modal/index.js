
import { FiX } from 'react-icons/fi'
import './modal.css';

export default function Modal({conteudo, close}){
  return(
    <div className="modal">
      <div className="container">
        <button className="close" onClick={close}>
          <FiX size={25} color="red" />
        </button>

        <main>
          <h2>Detalhes do chamado</h2>

          <div className="row">
            <span>
              Cliente: <i>{conteudo.cliente}</i>
            </span>
          </div>

          <div className="row">
            <span>
              Título: <i>{conteudo.titulo}</i>
            </span>
          </div>
          <div className="row">
            <span>
              Cadastrado em: <i>{conteudo.criadoFormato}</i>
            </span>
          </div>

          <div className="row">
          <span>
  Status: <i style={{color: "#FFF",
                     backgroundColor: conteudo.status === 'Finalizado' ? '#5cb85c' :  // Verde para Finalizado
                     conteudo.status === 'Emprestado' ? '#3583f6' :  // Azul para Emprestado
                     conteudo.status === 'Reservado' ? '#f6a935' :   // Amarelo para Reservado
                     '#ccc'  // Cor padrão para outros status
  }}>
    {conteudo.status}
  </i>
</span>

          </div>

          {conteudo.observacao !== '' && (
          <>

            <h3>Observação:</h3>
            <p>
              {conteudo.observacao}
            </p>
          </>

          )}

        </main>
      </div>
    </div>
  )
}