import { AuthContext } from "../../contexts/auth";
import { useContext, useEffect, useState } from "react";
import Title from "../../components/Title";
import { FiPlus, FiMessageSquare, FiSearch, FiEdit2, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import { collection, getDocs, orderBy, startAfter, limit, query, doc, deleteDoc, where } from "firebase/firestore";
import { db } from "../../services/firebaseConnection";
import Header from "../../components/Header";
import './emprestimos.css';
import { format } from 'date-fns';
import Modal from "../../components/Modal";
import { toast } from "react-toastify";

const listRef = collection(db, 'chamados');

export default function Emprestimos() {
  const { user } = useContext(AuthContext);

  const [chamados, setChamados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [vazia, setVazia] = useState(false);
  const [lastDocs, setLastDocs] = useState();
  const [loadingMore, setLoadingMore] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [detalhes, setDetalhes] = useState();

  useEffect(() => {
    async function loadChamados() {
      const q = query(listRef, orderBy('criado', 'desc'), limit(5));
      const querySnapshot = await getDocs(q);

      setChamados([]);
      await updateState(querySnapshot);
      setLoading(false);
    }

    loadChamados();

    return () => { }
  }, []);

  async function updateState(querySnapshot) {
    const colecaoVazia = querySnapshot.size === 0;

    if (!colecaoVazia) {
      let lista = [];
      querySnapshot.forEach((doc) => {
        lista.push({
          id: doc.id,
          cliente: doc.data().cliente,
          clienteId: doc.data().clienteId,
          userId: doc.data().userId,
          observacao: doc.data().observacao,
          status: doc.data().status,
          criado: doc.data().criado,
          titulo: doc.data().titulo,
          criadoFormato: format(doc.data().criado.toDate(), 'dd/MM/yyyy')
        });
      });
      lista=lista.filter(x=>x.userId === user.uid);
      const lastDoc = querySnapshot.docs[querySnapshot.docs.length - 1];
      setChamados(chamados => [...chamados, ...lista]);
      setLastDocs(lastDoc);
    } else {
      setVazia(true);
    }
    setLoadingMore(false);
  }

  async function buscarMais() {
    setLoadingMore(true);
    const q = query(listRef, orderBy('criado', 'desc'), startAfter(lastDocs), limit(5));
    const querySnapshot = await getDocs(q);
    await updateState(querySnapshot);
  }

  function alternarModal(item) {
    setMostrarModal(!mostrarModal);
    setDetalhes(item);
  }

  function excluir(id) {
    // Referência ao documento a ser excluído
    const docRef = doc(db, 'chamados', id);

    // Excluir o documento do Firestore
    deleteDoc(docRef)
      .then(() => {
        // Atualizar o estado para remover o chamado da tabela
        setChamados(chamados.filter(chamado => chamado.id !== id));
        console.log("Chamado excluído com sucesso");
        toast.success("Chamado excluído com sucesso!");
      })
      .catch((error) => {
        console.error("Erro ao excluir o chamado:", error);
        toast.error("Erro ao excluir o chamado!");
      });
  }

  if (loading) {
    return (
      <div>
        <Header />
        <div className="content">
          <Title nome="Empréstimos">
            <FiMessageSquare size={25} />
          </Title>
          <div className="container-dashboard">
            <span>Buscando chamados...</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Header />
      <div className="content">
        <Title nome="Empréstimos">
          <FiMessageSquare size={25} />
        </Title>

        <>
          {chamados.length === 0 ? (
            <div className="container-dashboard">
              <span className="">Nenhum registro encontrado.</span>
              <Link to="/novo">
                
                <span className="novoBotao"><FiPlus color="white" size={25} />Novo chamado</span>
              </Link>
            </div>
          ) : (
            <>
              <Link to="/novo" className="novo">
                <FiPlus color="white" size={25} />
                Novo chamado
              </Link>
              <table>
                <thead>
                  <tr>
                    <th scope="col">Cliente</th>
                    <th scope="col">Título</th>
                    <th scope="col">Status</th>
                    <th scope="col">Cadastrado</th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {chamados.map((item, index) => {
                    return (
                      <tr key={index}>
                        <td data-label="Cliente">{item.cliente}</td>
                        <td data-label="Título">{item.titulo}</td>
                        <td data-label="Status">
                          <span className="badge" style={{ backgroundColor:
                            item.status === 'Finalizado' ? '#4cae4c' :  // Verde para Finalizado
                            item.status === 'Emprestado' ? '#2a6fb5' :  // Azul para Emprestado
                            item.status === 'Reservado' ? '#c68622' :      // Amarelo escuro para Reservado
                            '#ccc'  // Cor padrão para outros status, caso existam
                          }}>
                            {item.status}
                          </span>
                        </td>
                        <td data-label="Cadastrado">{item.criadoFormato}</td>
                        <td data-label="">
                          <button className="action" style={{ backgroundColor: '#3583f6' }} onClick={() => alternarModal(item)}>
                            <FiSearch color="#FFF" size={17} />
                          </button>
                          <Link to={`/novo/${item.id}`} className="ator" style={{ backgroundColor: '#f6a935' }}>
                            <FiEdit2 color="#FFF" size={17} />
                          </Link>
                          <button className="action" style={{ backgroundColor: '#ef5350' }} onClick={() => excluir(item.id)}>
                            <FiX color="#FFF" size={17} />
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>

              {loadingMore && <h3>Buscando mais chamados...</h3>}
              {!loadingMore && !vazia && <button className="btn-more" onClick={buscarMais}>Buscar mais</button>}
            </>
          )}
        </>
      </div>
      {mostrarModal && <Modal conteudo={detalhes} close={() => setMostrarModal(!mostrarModal)} />}
    </div>
  )
}
