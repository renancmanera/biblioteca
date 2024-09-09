
import { useState, useEffect, useContext  } from 'react'
import Header from '../../components/Header'
import Title from '../../components/Title'
import { FiPlusCircle, FiArrowLeft } from 'react-icons/fi'

import {AuthContext} from '../../contexts/auth'
import { db } from '../../services/firebaseConnection'
import {collection, getDocs, getDoc, doc, addDoc, updateDoc} from 'firebase/firestore'

import './new.css'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import { useParams, useNavigate } from 'react-router-dom'
import { set } from 'date-fns'

const listRef = collection(db, "clientes");

export default function New(){
  const { user } = useContext(AuthContext);
  const { id } = useParams()
  const navigate = useNavigate()

  const [clientes, setClientes] = useState([])
  const [loadCustomer, setLoadCustomer] = useState(true);
  const [clienteSelecionado, setClienteSelecionado] = useState(0)

  const [observacao, setObservacao] = useState('')
  const [status, setStatus] = useState('Reservado')
  const [titulo, setTitulo] = useState('')
  const [idCliente, setIdCliente] = useState(false)

  useEffect(() => {
    async function loadCustomers(){
      const querySnapshot = await getDocs(listRef)
      .then( (snapshot) => {
        let lista = [];

        snapshot.forEach((doc) => {
          lista.push({
            id: doc.id,
            nome: doc.data().nome,
            userId: doc.data().userId
          })
          lista=lista.filter(x=>x.userId === user.uid);
        })

        if(snapshot.docs.size === 0){
          console.log("Nenhum cliente encontrado");
          setClientes([ { id: '1', nome: 'Erro' } ])
          setLoadCustomer(false);
          return;
        }

        setClientes(lista);
        setLoadCustomer(false);

        if(id){
          loadId(lista);
        }

      })
      .catch((error) => {
        console.log("Erro ao buscar os clientes", error)
        setLoadCustomer(false);
        setClientes([ { id: '1', nome: 'Erro' } ])
      })
    }

    loadCustomers();    
  }, [id])

  async function loadId(lista){
    const docRef = doc(db, "chamados", id);
    await getDoc(docRef)
    .then((snapshot) => {
      setTitulo(snapshot.data().titulo)
      setObservacao(snapshot.data().observacao)
      setStatus(snapshot.data().status)
      
      let index = lista.findIndex(item => item.id === snapshot.data().clienteId)
      setClienteSelecionado(index)
      setIdCliente(true)
    })
    .catch((error) => {
      console.log("Erro ao buscar o chamado", error)
      setIdCliente(false)
    })
  }

  function trocarOpcao(e){
    setStatus(e.target.value);
  }

  function mudarCliente(e){
    setClienteSelecionado(e.target.value)
    console.log(clientes[e.target.value].nome);
  }

  function mudarTitulo(e){
    setTitulo(e.target.value)
  }

  async function registrar(e) {
    e.preventDefault();

    if(idCliente){
      const docRef = doc(db, "chamados", id);
      await updateDoc(docRef, {
        cliente: clientes[clienteSelecionado].nome,
        clienteId: clientes[clienteSelecionado].id,
        observacao: observacao,
        status: status,
        userId: user.uid,
        titulo: titulo
      })
      .then(() => {
        toast.success('Chamado atualizado com sucesso!');
        setClienteSelecionado(0);
        setObservacao('');
        setTitulo('');
        setStatus('Reservado');
        navigate('/emprestimos')
      })
      .catch((error) => {
        toast.error('Erro ao atualizar chamado!');
        console.log('Erro ao atualizar chamado', error);
      });
      return;
    }
  
    // Verificar se os campos obrigatórios estão preenchidos
    if (titulo !== '' && status !== '' && clienteSelecionado !== null || clienteSelecionado !== undefined) {
    
  
      // Registrar no Firebase se os campos estiverem preenchidos
      await addDoc(collection(db, "chamados"), {
        cliente: clientes[clienteSelecionado].nome,
        clienteId: clientes[clienteSelecionado].id,
        criado: new Date(),
        observacao: observacao,
        status: status,
        userId: user.uid,
        titulo: titulo
      })
      .then(() => {
       toast.success('Chamado registrado com sucesso!');
       setClienteSelecionado(0);
       setObservacao('');
       setTitulo('');
       setStatus('Reservado');
       navigate('/emprestimos')
      })
      .catch((error) => {
        toast.error('Erro ao registrar chamado!');
        console.log('Erro ao registrar chamado', error);
      });
    }else{
      toast.error('Preencha todos os campos!')
    }
}

  return(
    <div>
      <Header/>

      <div className="content">
        <Title nome={id ? "Editando chamado" : "Novo chamado"}>
          <FiPlusCircle color='black' size={25}/>
        </Title>

        <div className="container">
          <form className="form-profile" onSubmit={registrar}>

            <label>Clientes</label>
            {
              loadCustomer ? (
                <input className='input' type="text" disabled={true} value="Carregando..." />
              ) : (
                <select value={clienteSelecionado} onChange={mudarCliente}>
                  {clientes.map((item, index) => {
                    return(
                      <option key={index} value={index}>
                        {item.nome}
                      </option>
                    )
                  })}
                </select>
              )
            }

          <label className='labelStatus'>Título</label>
            {
       
                <input value={titulo} onChange={mudarTitulo} className='input' type="text" placeholder='Digite o título do livro' />
             
            }

            <label className='labelStatus'>Status</label>

            
            <div className="status">

            <span className='caixinha'>
              <input
                type="radio"
                name="radio"
                value="Reservado"
                onChange={trocarOpcao}
                checked={ status === 'Reservado' }
              />
              <label>Reservado</label>
            </span>
          
              <span className='caixinha'>
              <input
                type="radio"
                name="radio"
                value="Emprestado"
                onChange={trocarOpcao}
                checked={ status === 'Emprestado' }
              />
              <label>Emprestado</label>
            </span>
            
            <span className='caixinha'>
              <input
                type="radio"
                name="radio"
                value="Finalizado"
                onChange={trocarOpcao}
                checked={ status === 'Finalizado' }
              />
              <label>Finalizado</label>
            </span>
            </div>


            <label>Observação</label>
            <textarea
              type="text"
              placeholder="Alguma observação do empréstimo (opcional)."
              value={observacao}
              onChange={ (e) => setObservacao(e.target.value) }
            />

            <button className='botaoPerfil' type="submit">{id ? "Atualizar" : "Registar"}</button>
            
          </form>
        </div><div className="container">
          <Link to="/emprestimos">
         <button className="botaoVoltar2"><span className="icone"><FiArrowLeft></FiArrowLeft></span></button>
         </Link>
       </div>
      </div>
    </div>
  )
}