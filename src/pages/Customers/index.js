import { useState, useContext } from 'react'
import Header from '../../components/Header'
import Title from '../../components/Title'

import { AuthContext } from "../../contexts/auth";

import { FiUser } from 'react-icons/fi'

import { db } from '../../services/firebaseConnection'
import { addDoc, collection, doc } from 'firebase/firestore'

import { toast } from 'react-toastify'

export default function Customers(){
  const [nome, setNome] = useState('')
  const [cpf, setCpf] = useState('')
  const [endereco, setEndereco] = useState('')

  const { user } = useContext(AuthContext);

  async function registrar(e){
    e.preventDefault();

    if(nome !== '' && cpf !== '' && endereco !== ''){
        await addDoc(collection(db, 'clientes'), {
          nome: nome,
          cpf: cpf,
          endereco: endereco,
          userId: user.uid,
        })
        .then(() => {
          setNome('')
          setCpf('')
          setEndereco('')
          toast.success('Cliente cadastrado com sucesso!')
        })
        .catch((error) => {
          console.log('Erro ao cadastrar cliente: ', error)
          toast.error('Erro ao cadastrar cliente!')
        })
      }else{
        toast.error('Preencha todos os campos!')
      }
  }

  return(
    <div>
      <Header/>

      <div className="content">
        <Title nome="Cadastrar clientes">
          <FiUser size={25} />
        </Title>

        <div className="container">
          <form className="form-profile" onSubmit={registrar}>
              <label>Nome</label>
              <input
                type="text"
                placeholder="Nome do cliente"
                value={nome}
                onChange={(e) => setNome(e.target.value) }
              />

              <label>CPF</label>
              <input
                type="text"
                placeholder="XXXXXXXXXXX"
                value={cpf}
                onChange={(e) => setCpf(e.target.value) }
              />

              <label>Endereço</label>
              <input
                type="text"
                placeholder="Avenida Santos Dumont, 980"
                value={endereco}
                onChange={(e) => setEndereco(e.target.value) }
              />

              <button type="submit" className='botaoPerfil'>
                Salvar
              </button>
          </form>
        </div>

      </div>

    </div>
  )
}