import styles from "./DashboardCorretores.module.css";

import { Link } from "react-router-dom";

import { useAuthValue } from "../context/AuthContext";
import { useFetchDocuments } from "../hooks/useFetchDocuments";
import Corretores from "../pages/Corretores/Corretores";
import { useDeleteDocument } from "../hooks/useDeleteDocument";

const DashboardCorretores = () => {
  const { user } = useAuthValue();
  const uid = user.id;

  const { documents: corretores, loading } = useFetchDocuments(
    "corretores",
    null,
    uid
  );

  const { deleteDocument } = useDeleteDocument("corretores");

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="container">
      <h1 className="page_title">Corretores</h1>
      {corretores && corretores.length === 0 ? (
        <div>
          <p>Não foram encontrados corretores</p>
        </div>
      ) : (
        <div className="dashboard">
          <div>
            <Corretores />
          </div>

          {corretores &&
            corretores.map((corretor) => (
              
                <div key={corretor.id} className="card">
                  <div className="card-line">
                    <div>
                      <p className="card-name">{corretor.name}</p>
                      <p className="card-name">{corretor.lastName}</p>
                    </div>
                    <button
                      onClick={() => deleteDocument(corretor.id)}
                      className="btn btn-outline btn-danger"
                    >
                      Excluir
                    </button>
                  </div>
                  <Link to={`/corretores/${corretor.id}`}>
                  <div className="card-line">
                    <div className="card-item">
                      <p>CPF</p>
                      <span>{corretor.cpf}</span>
                    </div>
                    <div className="card-item">
                      <p>Data de Nascimento</p>
                      <span>{corretor.birthDate}</span>
                    </div>
                  </div>

                  <div className="card-line">
                    <div className="card-item">
                      <p>e-mail</p>
                      <span>{corretor.email}</span>
                    </div>
                    <div className="card-item">
                      <p>telefone</p>
                      <span>{corretor.phone}</span>
                    </div>
                  </div>

                  <div className="card-line">
                    <span>CRECI - {corretor.creciNumber}</span>
                    <Link
                      to={`/corretores/edit/${corretor.id}`}
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

export default DashboardCorretores;
