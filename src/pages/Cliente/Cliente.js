import styles from "./Cliente.module.css";

import { useParams } from "react-router-dom";
import { useFetchDocument } from "../../hooks/useFetchDocument";

const Cliente = () => {
  const { id } = useParams();
  const { document: cliente, loading } = useFetchDocument("clientes", id);

  return (
    <div>
      {loading && <p> Carregando post...</p>}

      {cliente && (
        <>
          <p>{cliente.realtor}</p>
          <p>{cliente.name}</p>
          <p>{cliente.birthDate}</p>
          <p>{cliente.dependents}</p>
          <p>{cliente.profession}</p>
          <p>{cliente.income}</p>
          <p>{cliente.formalIncomeSource}</p>
          <p>{cliente.informalIncomeSource}</p>
          <p>{cliente.fgtsValue}</p>
          <p>{cliente.entryValue}</p>
          <p>{cliente.numberOfBuyers}</p>
          <p>{cliente.liveIn}</p>
          <p>{cliente.workWhere}</p>
        </>
      )}
    </div>
  );
};

export default Cliente;
