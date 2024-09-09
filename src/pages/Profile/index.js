import { useContext,useState } from "react";
import Header from "../../components/Header";
import Title from "../../components/Title";

import { FiLogOut, FiSettings, FiUpload } from "react-icons/fi";
import avatar from '../../assets/avatar.png';
import { AuthContext } from "../../contexts/auth";

import { doc , setDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../services/firebaseConnection';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import './profile.css';
import {toast} from 'react-toastify'

export default function Profile() {

    const { user, setUser, storageUser, logout } = useContext(AuthContext);

    const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl);
    const [imagemAvatar, setImagemAvatar] = useState(null);

    const [nome, setNome] = useState(user && user.nome);
    const [email, setEmail] = useState(user && user.email);

    function mudarFoto(e) {
      if(e.target.files[0]);
      const image = e.target.files[0];

      if(image.type === 'image/jpeg' || image.type === 'image/png') {
        setImagemAvatar(image);
        setAvatarUrl(URL.createObjectURL(image));
      }
      else {
        toast.error("Envie uma imagem do tipo PNG ou JPEG");
        setImagemAvatar(null);
        return;
      }
    }

    async function uploadFoto() {
      const currentUid = user.uid;

      const uploadRef = ref(storage, `imagens/${currentUid}/${imagemAvatar.name}`);
    
      const uploadTask = uploadBytes(uploadRef, imagemAvatar)
      .then((snapshot) => {
        
        getDownloadURL(snapshot.ref).then( async (downloadURL) => {
          let urlFoto = downloadURL;

          const docRef = doc(db, "usuarios", user.uid)
          await updateDoc(docRef, {
            avatarUrl: urlFoto,
            nome: nome,
          })
          .then(() => {
            let data = {
              ...user,
              avatarUrl: urlFoto,
              nome: nome,
            }

            setUser(data);
            storageUser(data);
            toast.success("Atualizado com sucesso!")
          })

        })

      })

    }


    async function salvar(e) {
      e.preventDefault();
      
      if(imagemAvatar === null && nome !== ''){
        // Atualizar apenas o nome do user
        const docRef = doc(db, "usuarios", user.uid) 
        await updateDoc(docRef, {
          nome: nome,
        })
        .then(() => {
          let data = {
            ...user,
            nome: nome,
          }
   
          setUser(data);
          storageUser(data);
          toast.success("Atualizado com sucesso!")
   
        })

      }else if(nome !== '' && imagemAvatar !== null){
        uploadFoto();
     }
    }


    return(
    <div>
      <Header/>

      <div className="content">
        <Title nome="Meu perfil">
          <FiSettings size={25} />
        </Title>

       <div className="container">

        <form className="form-profile" onSubmit={salvar}>
          <label className="label-avatar">
            <span>
              <FiUpload color="#FFF" size={25} />
            </span>

            <input type="file" accept="image/*" onChange={mudarFoto} className="foto"/> <br/>
            {avatarUrl === null ? (
              <img src={avatar} alt="Foto de perfil" width={250} height={250} />
            ) : (
              <img src={avatarUrl} alt="Foto de perfil" width={250} height={250} />
            )}

          </label>

          <label>Nome</label>
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />

          <label>Email</label>
          <input type="text" value={email} disabled={true} />
          
          <button className="botaoPerfil" type="submit">Atualizar</button>
        </form>

       </div>

       <div className="container">
         <button className="botaoLogout" onClick={ () => logout()}><span className="icone"><FiLogOut></FiLogOut></span></button>
       </div>

      </div>

    </div>
  )
}