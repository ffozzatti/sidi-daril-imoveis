import styles from "./DashboardIncorporadora.module.css";

import { Link } from "react-router-dom";

import { useAuthValue } from "../context/AuthContext";
import { useFetchDocuments } from "../hooks/useFetchDocuments";
import Incorporadoras from "../pages/Incorporadoras/Incorporadoras";
import { useDeleteDocument } from "../hooks/useDeleteDocument";

const DashboardIncorporadora = () => {
  const { user } = useAuthValue();
  const uid = user.id;

  const { documents: incorporadoras, loading } = useFetchDocuments(
    "incorporadoras",
    null,
    uid
  );

  const { deleteDocument } = useDeleteDocument("incorporadoras");

  if (loading) {
    return <p>Carregando...</p>;
  }
  return (
    <div className="container">
      <h1 className="page_title">Incorporadoras</h1>
      {incorporadoras && incorporadoras.length === 0 ? (
        <div>
          <p>Não foram encontrados incorporadoras</p>
        </div>
      ) : (
        <div className="dashboard">
          <div>
            <Incorporadoras />
          </div>
          {incorporadoras &&
            incorporadoras.map((incorporadora) => (
              <div key={incorporadora.id} className="card">
                <div className="card-line">
                  <div>
                    <p className="card-name">{incorporadora.simpleName}</p>
                  </div>
                  <button
                    onClick={() => deleteDocument(incorporadora.id)}
                    className="btn btn-outline btn-danger"
                  >
                    Excluir
                  </button>
                </div>

                <div className="card-line">
                  <div className="card-item">
                    <p>Endereço</p>
                    <span>{incorporadora.streetInc}</span>
                  </div>
                  <div className="card-item">
                    <p>CEP</p>
                    <span>{incorporadora.cepInc}</span>
                  </div>
                </div>

                <div className="card-line">
                  <div className="card-item">
                    <p>E-mail</p>
                    <span>{incorporadora.emailInc}</span>
                  </div>
                  <div className="card-item">
                    <p>Telefone</p>
                    <span>{incorporadora.phoneInc}</span>
                  </div>
                </div>

                <Link to={`/incorporadora/${incorporadora.id}`}>
                  <div className="card-line">
                    <span> CNPJ - {incorporadora.cnpj}</span>
                    <Link
                      to={`/incorporadoras/edit/${incorporadora.id}`}
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

export default DashboardIncorporadora;
