import { useState, useContext } from 'react'

import logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/auth'
import {toast} from 'react-toastify'

import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";

export default function SignUp(){
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const { signUp } = useContext(AuthContext);
    const { loadingAuth } = useContext(AuthContext);

    async function cadastrar(e) {
      e.preventDefault();
    
      // Verificar se todos os campos foram preenchidos
      if (nome === '' || email === '' || senha === '') {
        toast.info('Preencha todos os campos.');
        return;
      }
    
      // Verificar o comprimento da senha
      if (senha.length < 6) {
        toast.info('A senha deve ter pelo menos 6 caracteres.');
        return;
      }
    
      // Verificar se o email já existe na coleção "usuarios"
      const usuariosRef = collection(db, 'usuarios');
      const q = query(usuariosRef, where('email', '==', email));
    
      try {
        const querySnapshot = await getDocs(q);
    
        if (!querySnapshot.empty) {
          toast.info('Este e-mail já está cadastrado.');
          return;
        }
    
        // Se o e-mail não existe e a senha é válida, criar o usuário
        await signUp(nome, email, senha);
    
        // Mensagem de sucesso após o cadastro
        toast.success('Usuário cadastrado com sucesso!');
    
      } catch (error) {
        console.error("Erro ao cadastrar usuário:", error);
        toast.error('Ocorreu um erro ao cadastrar o usuário.');
      }
    }

  return(
    <div className="container-center">
      <div className="login">
        <div className="login-area">
          <img src={logo} alt="Logo do sistema de chamados" />
        </div>

        <form onSubmit={cadastrar}>
          <h1>Cadastre-se</h1>
          
          <input 
            type="text" 
            placeholder="Seu nome"
            value={nome}
            onChange={ (e) => setNome(e.target.value) }
          />
          
          <input 
            type="text" 
            placeholder="usuario@email.com"
            value={email}
            onChange={ (e) => setEmail(e.target.value) }
          />

          <input 
            type="password" 
            placeholder="********"
            value={senha}
            onChange={ (e) => setSenha(e.target.value) }
          />

          <button type="submit" className='botaoLogin'>
            Cadastrar
          </button>
        </form>

        <Link to="/">Já possui uma conta? Faça login</Link>

      </div>
    </div>
  )
}