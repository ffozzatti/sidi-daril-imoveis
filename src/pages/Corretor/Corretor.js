import styles from "./Corretor.module.css";

import { useParams } from "react-router-dom";
import { useFetchDocument } from "../../hooks/useFetchDocument";

const Corretor = () => {
  const { id } = useParams();
  const { document: corretor, loading } = useFetchDocument("corretores", id);

  return (
		<div className="container">
			{loading && <p> Carregando post...</p>}

			{corretor && (
				<>
					<p>
						<span>CPF: </span>
						{corretor.cpf}
					</p>
					<p>
						<span>NOME: </span>
						{corretor.name}
					</p>
					<p>
						<span>SOBRENOME: </span>
						{corretor.lastName}
					</p>
				</>
			)}
		</div>
	)

};

export default Corretor;
