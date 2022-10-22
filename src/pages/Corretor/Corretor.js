import styles from "./Corretor.module.css";

import { useParams } from "react-router-dom";
import { useFetchDocument } from "../../hooks/useFetchDocument";

const Corretor = () => {
  const { id } = useParams();
  const { document: corretor, loading } = useFetchDocument("corretores", id);

  return (
    <div>
      {loading && <p> Carregando post...</p>}

      {corretor && (
        <>
        <p>{corretor.cpf}</p>
          <p>{corretor.name}</p>
          <p>{corretor.lastName}</p>          
          
        </>
      )}
    </div>
  );

};

export default Corretor;
