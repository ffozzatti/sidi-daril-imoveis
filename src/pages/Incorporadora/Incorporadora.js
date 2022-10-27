import styles from './Incorporadora.module.css'

import { useParams } from 'react-router-dom'
import { useFetchDocument } from '../../hooks/useFetchDocument'

const Incorporadora = () => {
	const { id } = useParams()
	const { document: incorporadora, loading } = useFetchDocument(
		'incorporadoras',
		id
	)

	return (
		<div className="container">
			{loading && <p> Carregando post...</p>}

			{incorporadora && (
				<>
					<p>
						<span>Nome Simples: </span>
						{incorporadora.simpleName}
					</p>
					<p>
						<span>Nome Fantasia: </span>
						{incorporadora.fantasyName}
					</p>
					<p>
						<span>CNPJ: </span>
						{incorporadora.cnpj}
					</p>
				</>
			)}
		</div>
	)
}

export default Incorporadora
