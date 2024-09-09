import {useState, createContext, useEffect } from 'react';
import { auth, db } from '../services/firebaseConnection';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import {doc , setDoc, getDoc} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

export const AuthContext = createContext({});

function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);
    
    const navigate = useNavigate();

    useEffect(() => {
        async function loadUser(){
            const storageUser = localStorage.getItem('@sistema');
            
            if(storageUser){
                setUser(JSON.parse(storageUser));
                setLoading(false);
            }
            setLoading(false);
        }

        loadUser();
    }, []);

    async function signIn(email, senha){
        setLoadingAuth(true);

        await signInWithEmailAndPassword(auth, email, senha)
        .then(async (value) => {
            let uid = value.user.uid;
            
            const docRef = doc(db, 'usuarios', uid);
            const docSnap = await getDoc(docRef);

            let data = {
                uid: uid,
                nome: docSnap.data().nome,
                avatarUrl: docSnap.data().avatarUrl,
                email: value.user.email
            };

            setUser(data);
            storageUser(data);
            setLoadingAuth(false);
            toast.success('Bem-vindo de volta!');
            navigate('/emprestimos');
        })
        .catch((error) => {
            console.log(error);
            toast.error('Usuário inválido.');
            setLoadingAuth(false);
        })
    }

    //cadastrar novo usuario
    async function signUp(nome, email, senha){
        setLoadingAuth(true);

        await createUserWithEmailAndPassword(auth, email, senha)
        .then(async (value) => {
            let uid = value.user.uid;

            await setDoc(doc(db, 'usuarios', uid), {
                nome: nome,
                avatarUrl: null,
                email: email
            })
            .then( () => {
                let data = {
                    uid: uid,
                    nome: nome,
                    email: email,
                    avatarUrl: null
                };

                setUser(data);
                storageUser(data);
                setLoadingAuth(false);
                toast.success('Seja bem-vindo à biblioteca');
                navigate('/emprestimos');
            })
        .catch((error) => {
            console.log(error);
            toast.error('Usuário inválido.');
            setLoadingAuth(false);
        })
    })
}
    function storageUser(data){
        localStorage.setItem('@sistema', JSON.stringify(data));
    }

    async function logout(){
        await signOut(auth);
        localStorage.removeItem('@sistema');
        setUser(null);
    }


    return(
        <AuthContext.Provider
        value={{
            signed: !!user, //falso se o user for nulo
            user,
            signIn,
            signUp,
            logout,
            loadingAuth,
            loading,
            storageUser,
            setUser,
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;