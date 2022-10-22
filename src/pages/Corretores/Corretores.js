import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocument";

import styles from "./Corretores.module.css";

import Modal from "react-modal";
import DashboardCorretores from "../../components/DashboardCorretores";

Modal.setAppElement("#root");

const Corretores = () => {
  const [cpf, setCpf] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [genre, setGenre] = useState("");
  const [rg, setRg] = useState("");
  const [dateRg, setDateRg] = useState("");
  const [expedition, setExpedition] = useState("");
  const [typeAddress, setTypeAddress] = useState("");
  const [cep, setCep] = useState();
  const [street, setStreet] = useState("");
  const [complement, setComplement] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [occupation, setOccupation] = useState("");
  const [nickname, setNickname] = useState("");
  const [superiorOccupation, setSuperiorOccupation] = useState("");
  const [superiorNickname, setSuperiorNickName] = useState("");
  const [creciType, setCreciType] = useState("");
  const [creciNumber, setCreciNumber] = useState("");
  const [creciExpiration, setCreciExpiration] = useState("");
  const [pis, setPis] = useState("");
  const [formError, setFormError] = useState("");

  const { user } = useAuthValue();

  const { insertDocument, response } = useInsertDocument("corretores");

  const navigate = useNavigate();

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    //checar todos os valores

    if (formError) return;

    insertDocument({
      cpf,
      name,
      lastName,
      birthDate,
      genre,
      rg,
      dateRg,
      expedition,
      typeAddress,
      cep,
      street,
      complement,
      district,
      state,
      city,
      email,
      phone,
      company,
      occupation,
      nickname,
      superiorOccupation,
      superiorNickname,
      creciType,
      creciNumber,
      creciExpiration,
      pis,
      uid: user.uid,
    });

    //redirect to home page
    navigate("/corretores");
    closeModal();
  };

  
  return (
    <div>
      <h1>Corretores</h1>
      <button className="btn" onClick={openModal}>
        Cadastrar
      </button>

      <DashboardCorretores />

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel={"Example Modal"}
        overlayClassName={styles.overlay}
        className={styles.modal}
      >
        <form onSubmit={handleSubmit} className={styles.form_clientes}>

          <div className={styles.line}>
          <label>
              <span>cpf:</span>
              <input
                type="text"
                name="cpf"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                required
              />
            </label>
          <label>
              <span>Nome:</span>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </label>
            <label>
              <span>Sobrenome:</span>
              <input
                type="text"
                name="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </label>
          </div>

          {!response.loading && <button className="btn">Cadastrar</button>}
          {response.loading && (
            <button className="btn" disabled>
              Aguarde...
            </button>
          )}

          {response.error && <p className="error">{response.error}</p>}
          {formError && <p className="error">{formError}</p>}
        </form>

        <button className="btn" onClick={closeModal}>
          Fechar
        </button>
      </Modal>
    </div>
  );
};

export default Corretores;
