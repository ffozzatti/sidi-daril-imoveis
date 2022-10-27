import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";
import { useFetchDocument } from "../../hooks/useFetchDocument";

const EditClientes = () => {
  const { id } = useParams();
  const { document: cliente } = useFetchDocument("clientes", id);

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

  useEffect(() => {
    if (cliente) {
      setRealtor(cliente.realtor);
      setName(cliente.name);
      setBirthDate(cliente.birthDate);
      setDependents(cliente.dependents);
      setProfession(cliente.profession);
      setIncome(cliente.income);
      setFgtsValue(cliente.fgtsValue);
      setEntryValue(cliente.entryValue);
      setNumberOfBuyers(cliente.numberOfBuyers);
      setLiveIn(cliente.liveIn);
      setWorkWhere(cliente.workWhere);
    }
  }, [cliente]);

  const { user } = useAuthValue();

  const { updateDocument, response } = useUpdateDocument("clientes");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    //checar todos os valores

    if (formError) return;

    const data = {
      realtor,
      name,
      birthDate,
      dependents,
      profession,
      income,
      fgtsValue,
      entryValue,
      numberOfBuyers,
      liveIn,
      workWhere,
      uid: user.uid,
      createdBy: user.displayName,
    };

    updateDocument(id, data);

    //redirect to home page
    navigate("/clientes");
  };

  return (
    <div className="container">

          <form className="form_clientes" onSubmit={handleSubmit}>
            <header>
              <div>
                <h2>Novo CPN</h2>
                <p>Cadastro do plano de necessidades</p>
              </div>
              <label>
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
                />
              </label>

              <label>
                <span>Data de Nascimento:</span>
                <input
                  type="text"
                  name="birthDate"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                />
              </label>

              <label>
                <span>Número de Dependentes:</span>
                <input
                  type="text"
                  name="dependents"
                  value={dependents}
                  onChange={(e) => setDependents(e.target.value)}
                />
              </label>
              <label>
                <span>Profissão:</span>
                <input
                  type="text"
                  name="profession"
                  value={profession}
                  onChange={(e) => setProfession(e.target.value)}
                />
              </label>

              <label>
                <span>Renda Bruta:</span>
                <input
                  type="number"
                  name="income"
                  value={income}
                  onChange={(e) => setIncome(e.target.value)}
                />
              </label>

              <label>
                <span>Valor FGTS:</span>
                <input
                  type="number"
                  name="fgtsValue"
                  value={fgtsValue}
                  onChange={(e) => setFgtsValue(e.target.value)}
                />
              </label>
              <label>
                <span>Valor entrada:</span>
                <input
                  type="number"
                  name="entryValue"
                  value={entryValue}
                  onChange={(e) => setEntryValue(e.target.value)}
                />
              </label>

              <label>
                <span>Quantos compradores no financiamento:</span>
                <input
                  type="number"
                  name="numberOfBuyers"
                  value={numberOfBuyers}
                  onChange={(e) => setNumberOfBuyers(e.target.value)}
                />
              </label>

              <label>
                <span>Reside em qual região:</span>
                <input
                  type="text"
                  name="liveIn"
                  value={liveIn}
                  onChange={(e) => setLiveIn(e.target.value)}
                />
              </label>

              <label>
                <span>Trabalha em qual região:</span>
                <input
                  type="text"
                  name="workWhere"
                  value={workWhere}
                  onChange={(e) => setWorkWhere(e.target.value)}
                />
              </label>
            </body>

            <div className="form-btn">
              {!response.loading && <button className="btn">Editar</button>}
              {response.loading && (
                <button className="btn" disabled>
                  Aguarde...
                </button>
              )}

              <Link to="/clientes" className="btn-cancel">
                Voltar
              </Link>
              {response.error && <p className="error">{response.error}</p>}
              {formError && <p className="error">{formError}</p>}
            </div>
          </form>

    </div>
  );
};

export default EditClientes;
