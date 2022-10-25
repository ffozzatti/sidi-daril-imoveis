import { useAuthValue } from "../../context/AuthContext";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";

import styles from './Home.module.css'

const Home = () => {
  const { user } = useAuthValue();
  const uid = user.id;

  const { documents: corretores } = useFetchDocuments("corretores", null, uid);

  const { documents: clientes } = useFetchDocuments("clientes", null, uid);

  return (
    <div className="container">
      <h1 className='page_title'>Dashboard</h1>
      <div className={styles.principal_dashboard}>
        <span>Clientes:</span>
        {clientes && clientes.length === 0 ? (
          <div>
            <p>Não foram encontrados clientes</p>
          </div>
        ) : (
          <p>{clientes && clientes.length}</p>
        )}
      </div>

      <div>
        <span>Corretores:</span>
        <p>{corretores && corretores.length}</p>
      </div>
    </div>
  );
};

export default Home;
