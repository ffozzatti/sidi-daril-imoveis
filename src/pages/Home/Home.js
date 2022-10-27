import Background from '../../components/Background'
import { useAuthValue } from '../../context/AuthContext'
import { useFetchDocuments } from '../../hooks/useFetchDocuments'

import styles from './Home.module.css'

const Home = () => {
	const { user } = useAuthValue()
	const uid = user.id

	const { documents: corretores } = useFetchDocuments('corretores', null, uid)

	const { documents: clientes } = useFetchDocuments('clientes', null, uid)

	const { documents: incorporadoras } = useFetchDocuments(
		'incorporadoras',
		null,
		uid
	)

	return (
		<div className="container">
			<h1 className="page_title">Dashboard</h1>

			<div className="dashboard_home">
				<div>
					<h2 className={styles.subtitle}>Clientes:</h2>
					<div className="card_home">
						<p>A Daril Imóveis é a queridinha do mercado</p>
						<h3>Possuímos atualmente</h3>
						<span>{clientes && clientes.length}</span>
						<h3>Clientes cadastrados</h3>
					</div>
				</div>

				<div>
					<h2 className={styles.subtitle}> Corretores:</h2>
					<div className="card_home">
						<p>
							A melhor imobiliária está nas mãos dos melhores profissionais.
						</p>
						<h3>Possuímos atualmente</h3>
						<span>{corretores && corretores.length}</span>
						<h3>Corretores cadastrados</h3>
					</div>
				</div>

				<div>
					<h2 className={styles.subtitle}>Incorporadoras:</h2>
					<div className="card_home">
						<p>A Daril Imóveis não para de crescer</p>
						<h3>Possuímos atualmente</h3>
						<span>{incorporadoras && incorporadoras.length}</span>
						<h3>Incorporadoras parceiras</h3>
					</div>
				</div>
			</div>	
			
			<Background className='bg'/>
		</div>
	)
}

export default Home
