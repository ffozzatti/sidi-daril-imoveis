import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useInsertDocument } from "../../hooks/useInsertDocument";


import styles from "./Clientes.module.css";

import Modal from "react-modal";


Modal.setAppElement("#root");

const Clientes = () => {
  const [realtor, setRealtor] = useState("");
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [dependents, setDependents] = useState("");
  const [profession, setProfession] = useState("");
  const [income, setIncome] = useState("");
  const [formalIncomeSource, setFormalIncomeSource] = useState("");
  const [informalIncomeSource, setInformalIncomeSource] = useState("");
  const [fgtsValue, setFgtsValue] = useState();
  const [entryValue, setEntryValue] = useState("");
  const [numberOfBuyers, setNumberOfBuyers] = useState("");
  const [liveIn, setLiveIn] = useState("");
  const [workWhere, setWorkWhere] = useState("");
  const [reasonForAcquisition, setReasonForAcquisition] = useState("");
  const [priorityInChoice, setPriorityInChoice] = useState("");
  const [complementOfChoice, setComplomentOfChoice] = useState("");
  const [formError, setFormError] = useState("");

  const { user } = useAuthValue();

  const { insertDocument, response } = useInsertDocument("clientes");

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
      realtor,
      name,
      birthDate,
      dependents,
      profession,
      income,
      formalIncomeSource,
      informalIncomeSource,
      fgtsValue,
      entryValue,
      numberOfBuyers,
      liveIn,
      workWhere,
      uid: user.uid,
    });

    //redirect to home page
    navigate("/clientes");
    closeModal()
  };

  return (
    <div className="container">      
      <button className="btn" onClick={openModal}>
        Cadastrar
      </button>      
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel={"Example Modal"}
        shouldCloseOnOverlayClick={false}      
      >        
        <p>Preencha o plano de necessidades.</p>
        <form className={styles.form_clientes} onSubmit={handleSubmit}>
          <header>
            <label>
              <span>Corretor: </span>
              <select
                name="realtor"
                onChange={(e) => setRealtor(e.target.value)}
                value={realtor}
              >
                <option>Selecionar corretor...</option>
                <option>Leandro</option>
                <option>Felipe</option>
                <option>Fozzatti</option>
                <option>Sousa</option>
              </select>
            </label>
          </header>
          <body>
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

            <div className={styles.line}>
              <label>
                <span>Data de Nascimento:</span>
                <input
                  type="text"
                  name="birthDate"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  required
                />
              </label>
              <label>
                <span>Número de Dependentes:</span>
                <input
                  type="text"
                  name="dependents"
                  value={dependents}
                  onChange={(e) => setDependents(e.target.value)}
                  required
                />
              </label>
              <label>
                <span>Profissão:</span>
                <input
                  type="text"
                  name="profession"
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                  required
                />
              </label>
            </div>

            <div className={styles.line}>
              <label>
                <span>Renda Bruta:</span>
                <input
                  type="number"
                  name="income"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                  required
                />
              </label>
              <label className={styles.radio}>
                <input
                  type="radio"
                  name="formalIncomeSource"
                  value={formalIncomeSource}
                  onChange={(e) => setFormalIncomeSource(e.target.value)}
                />
                <span>Renda Formal</span>
              </label>
              <label className={styles.radio}>
                <input
                  type="radio"
                  name="ininformalIncomeSourcecome"
                  value={informalIncomeSource}
                  onChange={(e) => setInformalIncomeSource(e.target.value)}
                />
                <span>Renda Informal</span>
              </label>
            </div>

            <div className={styles.line}>
              <label>
                <span>Valor FGTS:</span>
                <input
                  type="number"
                  name="fgtsValue"
                  value={fgtsValue}
                  onChange={(e) => setFgtsValue(e.target.value)}
                  required
                />
              </label>
              <label>
                <span>Valor entrada:</span>
                <input
                  type="number"
                  name="entryValue"
                  value={entryValue}
                  onChange={(e) => setEntryValue(e.target.value)}
                  required
                />
              </label>
            </div>

            <label>
              <span>Quantos compradores no financiamento:</span>
              <input
                type="number"
                name="numberOfBuyers"
                value={numberOfBuyers}
                onChange={(e) => setNumberOfBuyers(e.target.value)}
                required
              />
            </label>

            <label>
              <span>Reside em qual região:</span>
              <input
                type="text"
                name="liveIn"
                value={liveIn}
                onChange={(e) => setLiveIn(e.target.value)}
                required
              />
            </label>

            <label>
              <span>Trabalha em qual região:</span>
              <input
                type="text"
                name="workWhere"
                value={workWhere}
                onChange={(e) => setWorkWhere(e.target.value)}
                required
              />
            </label>
          </body>

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

export default Clientes;
