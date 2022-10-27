import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext'
import { useInsertDocument } from '../../hooks/useInsertDocument'
import IncorporadorasIcon from '../../components/IncorporadorasIcon'

import styles from './Incorporadoras.module.css'

import Modal from 'react-modal'

Modal.setAppElement('#root')

const Incorporadoras = () => {
	const [simpleName, setSimpleName] = useState('')
	const [cnpj, setCnpj] = useState('')
	const [fantasyName, setFantasyName] = useState('')
	const [socialReason, setSocialReason] = useState('')
	const [typeAddressInc, setTypeAddressInc] = useState('')
	const [cepInc, setCepInc] = useState('')
	const [streetInc, setStreetInc] = useState('')
	const [numberInc, setNumberInc] = useState('')
	const [complementInc, setComplementInc] = useState('')
	const [districtInc, setDistrictInc] = useState('')
	const [stateInc, setStateInc] = useState('')
	const [cityInc, setCityInc] = useState('')
	const [emailInc, setEmailInc] = useState('')
	const [phoneInc, setPhoneInc] = useState('')
	const [celInc, setCelInc] = useState('')
	const [formError, setFormError] = useState('')

	const { user } = useAuthValue()

	const { insertDocument, response } = useInsertDocument('incorporadoras')

	const navigate = useNavigate()

	const [modalIsOpen, setModalIsOpen] = useState(false)

	const openModal = () => {
		setModalIsOpen(true)
	}

	const closeModal = () => {
		setModalIsOpen(false)
	}

	const handleSubmit = e => {
		e.preventDefault()
		setFormError('')

		//checar todos os valores

		if (formError) return

		insertDocument({
			simpleName,
			cnpj,
			fantasyName,
			socialReason,
			typeAddressInc,
			cepInc,
			streetInc,
			numberInc,
			complementInc,
			districtInc,
			stateInc,
			cityInc,
			emailInc,
			phoneInc,
			celInc,
			uid: user.uid
		})

		//redirect to home page
		navigate('/incorporadoras')
		closeModal()
	}

	return (
		<div className="container">
			<button className="card_additem" onClick={openModal}>
				<p>Adicionar nova Incoporadora</p>
				<IncorporadorasIcon className="additem"/>
			</button>

			<Modal
				isOpen={modalIsOpen}
				onRequestClose={closeModal}
				contentLabel={'Example Modal'}
				shouldCloseOnOverlayClick={false}
			>
				<form onSubmit={handleSubmit} className="form_clientes">
					<header>
						<h2>Nova Incorporadora</h2>
					</header>

					<label>
						<span>Nome simples</span>
						<input
							type="text"
							name="simpleName"
							value={simpleName}
							onChange={e => setSimpleName(e.target.value)}
							required
						/>
					</label>
					<label>
						<span>CNPJ</span>
						<input
							type="text"
							name="cnpj"
							value={cnpj}
							onChange={e => setCnpj(e.target.value)}
							required
						/>
					</label>
					<label>
						<span>Nome Fantasia</span>
						<input
							type="text"
							name="fantasyName"
							value={fantasyName}
							onChange={e => setFantasyName(e.target.value)}
							required
						/>
					</label>
					<label>
						<span>Razão Social</span>
						<input
							type="text"
							name="socialReason"
							value={socialReason}
							onChange={e => setSocialReason(e.target.value)}
							required
						/>
					</label>
					<label>
						<span>Tipo</span>
						<input
							type="text"
							name="typeAddressInc"
							value={typeAddressInc}
							onChange={e => setTypeAddressInc(e.target.value)}
							required
						/>
					</label>
					<label>
						<span>CEP</span>
						<input
							type="text"
							name="cepInc"
							value={cepInc}
							onChange={e => setCepInc(e.target.value)}
							required
						/>
					</label>
					<label>
						<span>Logradouro</span>
						<input
							type="text"
							name="streetinc"
							value={streetInc}
							onChange={e => setStreetInc(e.target.value)}
							required
						/>
					</label>
					<label>
						<span>Número</span>
						<input
							type="text"
							name="numberInc"
							value={numberInc}
							onChange={e => setNumberInc(e.target.value)}
							required
						/>
					</label>
					<label>
						<span>Complemento</span>
						<input
							type="text"
							name="complementInc"
							value={complementInc}
							onChange={e => setComplementInc(e.target.value)}
							required
						/>
					</label>
					<label>
						<span>Bairro</span>
						<input
							type="text"
							name="districtInc"
							value={districtInc}
							onChange={e => setDistrictInc(e.target.value)}
							required
						/>
					</label>
					<label>
						<span>Estado</span>
						<select
							name="state"
							value={stateInc}
							onChange={e => setStateInc(e.target.value)}
						>
							<option>--Selecione o Estado--</option>
							<option>AC</option>
							<option>AL</option>
							<option>AP</option>
							<option>AM</option>
							<option>BA</option>
							<option>CE</option>
							<option>DF</option>
							<option>ES</option>
							<option>GO</option>
							<option>MA</option>
							<option>MT</option>
							<option>MS</option>
							<option>MG</option>
							<option>PA</option>
							<option>PB</option>
							<option>PR</option>
							<option>PE</option>
							<option>PI</option>
							<option>RJ</option>
							<option>RN</option>
							<option>RS</option>
							<option>RO</option>
							<option>RR</option>
							<option>SC</option>
							<option>SP</option>
							<option>SE</option>
							<option>TO</option>
						</select>
					</label>
					<label>
						<span>Cidade</span>
						<input
							type="text"
							name="cityInc"
							value={cityInc}
							onChange={e => setCityInc(e.target.value)}
							required
						/>
					</label>
					<label>
						<span>E-mail</span>
						<input
							type="text"
							name="emailInc"
							value={emailInc}
							onChange={e => setEmailInc(e.target.value)}
							required
						/>
					</label>
					<label>
						<span>Telefone</span>
						<input
							type="text"
							name="phoneInc"
							value={phoneInc}
							onChange={e => setPhoneInc(e.target.value)}
							required
						/>
					</label>
					<label>
						<span>Celular</span>
						<input
							type="text"
							name="celInc"
							value={celInc}
							onChange={e => setCelInc(e.target.value)}
							required
						/>
					</label>

					<div className="form-btn">
						{!response.loading && <button className="btn">Cadastrar</button>}
						{response.loading && (
							<button className="btn" disabled>
								Aguarde...
							</button>
						)}

						<button className="btn-cancel" onClick={closeModal}>
							Voltar
						</button>
						{response.error && <p className="error">{response.error}</p>}
						{formError && <p className="error">{formError}</p>}
					</div>
				</form>
			</Modal>
		</div>
	)
}

export default Incorporadoras
