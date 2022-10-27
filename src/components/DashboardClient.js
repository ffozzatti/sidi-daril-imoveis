import styles from "./DashboardClient.module.css";

import { Link } from "react-router-dom";

import { useAuthValue } from "../context/AuthContext";
import { useFetchDocuments } from "../hooks/useFetchDocuments";
import Clientes from "../pages/Clientes/Clientes";
import { useDeleteDocument } from "../hooks/useDeleteDocument";

const DashboardClient = () => {
  const { user } = useAuthValue();
  const uid = user.id;

  //clientes do usuário
  const { documents: clientes, loading } = useFetchDocuments(
    "clientes",
    null,
    uid
  );

  const { deleteDocument } = useDeleteDocument("clientes");

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="container">
      <h1 className="page_title">Clientes</h1>

      {clientes && clientes.length === 0 ? (
        <div>
          <p>Não foram encontrados clientes</p>
        </div>
      ) : (
        <div className="dashboard">
          <div>
            <Clientes />
          </div>

          {clientes &&
            clientes.map((cliente) => (              
                <div key={cliente.id} className="card">
                  <div className="card-line">
                    <p className="card-name">{cliente.name}</p>
                    <button
                      onClick={() => deleteDocument(cliente.id)}
                      className="btn btn-outline btn-danger"
                    >
                      Excluir
                    </button>
                  </div>
                  <Link to={`/cliente/${cliente.id}`}>
                  <div className="card-line">
                    <div className="card-item">
                      <p>Profissão</p>
                      <span>{cliente.profession}</span>
                    </div>
                    <div className="card-item">
                      <p>Data de Nascimento</p>
                      <span>{cliente.birthDate}</span>
                    </div>
                  </div>
                  <div className="card-line">
                    <div className="card-item">
                      <p>Renda</p>
                      <span> R$ {cliente.income}</span>
                    </div>
                    <div className="card-item">
                      <p>Valor de Entrada</p>
                      <span> R$ {cliente.entryValue}</span>
                    </div>
                  </div>
                  
                  <div className='card-line'>
                  <span>Corretor - {cliente.realtor}</span>
                    <Link
                      to={`/clientes/edit/${cliente.id}`}
                      className="btn btn-outline"
                    >
                      Editar
                    </Link>
                  </div>
                  </Link>
                </div>
              
            ))}
        </div>
      )}
    </div>
  );
};

export default DashboardClient;
