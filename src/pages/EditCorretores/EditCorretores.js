import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext";
import { useUpdateDocument } from "../../hooks/useUpdateDocument";
import { useFetchDocument } from "../../hooks/useFetchDocument";

const EditCorretores = () => {
  const { id } = useParams();
  const { document: corretor } = useFetchDocument("corretores", id);

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
  const [number, setNumber] = useState("");
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
  const [superiorNickname, setSuperiorNickname] = useState("");
  const [creciType, setCreciType] = useState("");
  const [creciNumber, setCreciNumber] = useState("");
  const [creciExpiration, setCreciExpiration] = useState("");
  const [pis, setPis] = useState("");
  const [formError, setFormError] = useState("");

  useEffect(() => {
    if (corretor) {
      setCpf(corretor.cpf);
      setName(corretor.name);
      setLastName(corretor.lastName);
      setBirthDate(corretor.birthDate);
      setGenre(corretor.genre);
      setRg(corretor.rg);
      setDateRg(corretor.dateRg);
      setExpedition(corretor.expedition);
      setTypeAddress(corretor.typeAddress);
      setCep(corretor.cep);
      setStreet(corretor.street);
      setNumber(corretor.number);
      setComplement(corretor.complement);
      setDistrict(corretor.district);
      setState(corretor.state);
      setCity(corretor.city);
      setEmail(corretor.email);
      setPhone(corretor.phone);
      setCompany(corretor.company);
      setOccupation(corretor.occupation);
      setNickname(corretor.nickname);
      setSuperiorOccupation(corretor.superiorOccupation);
      setSuperiorNickname(corretor.superiorNickname);
      setCreciType(corretor.creciType);
      setCreciNumber(corretor.creciNumber);
      setCreciExpiration(corretor.creciExpiration);
      setPis(corretor.pis);
    }
  }, [corretor]);

  const { user } = useAuthValue();

  const { updateDocument, response } = useUpdateDocument("corretores");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    //checar todos os valores

    if (formError) return;

    const data = {
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
      number,
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
    };

    updateDocument(id, data);

    //redirect to home page
    navigate("/corretores");
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form_clientes">
        <header>
          <h2>Novo Corretor</h2>
        </header>

        <label>
          <span>CPF:</span>
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
          <span>Sexo: </span>
          <select
            name="genre"
            onChange={(e) => setGenre(e.target.value)}
            value={genre}
          >
            <option>--Selecione seu sexo--</option>
            <option>Masculino</option>
            <option>Feminino</option>
          </select>
        </label>

        <label>
          <span>RG:</span>
          <input
            type="text"
            name="rg"
            value={rg}
            onChange={(e) => setRg(e.target.value)}
            required
          />
        </label>
        <label>
          <span>Data de Expedição:</span>
          <input
            type="text"
            name="dateRg"
            value={dateRg}
            onChange={(e) => setDateRg(e.target.value)}
            required
          />
        </label>
        <label>
          <span>Orgão Exp. RG :</span>
          <input
            type="text"
            name="expedition"
            value={expedition}
            onChange={(e) => setExpedition(e.target.value)}
            required
          />
        </label>

        <label>
          <span>Tipo de Endereço:</span>
          <select
            name="typeAddress"
            value={typeAddress}
            onChange={(e) => setTypeAddress(e.target.value)}
          >
            <option>--Selecione o tipo de endereço--</option>
            <option>Residencial</option>
            <option>Comercial</option>
          </select>
        </label>
        <label>
          <span>CEP:</span>
          <input
            type="text"
            name="cep"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
            required
          />
        </label>
        <label>
          <span>Logradouro:</span>
          <input
            type="text"
            name="street"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
            required
          />
        </label>
        <label>
          <span>Número:</span>
          <input
            type="text"
            name="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            required
          />
        </label>

        <label>
          <span>Complemento</span>
          <input
            type="text"
            name="complement"
            value={complement}
            onChange={(e) => setComplement(e.target.value)}
            required
          />
        </label>
        <label>
          <span>Bairro</span>
          <input
            type="text"
            name="district"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            required
          />
        </label>
        <label>
          <span>UF:</span>
          <select
            name="state"
            value={state}
            onChange={(e) => setState(e.target.value)}
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
            name="city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </label>

        <label>
          <span>E-Mail:</span>
          <input
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          <span>Telefone:</span>
          <input
            type="tel"
            name="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            pattern="[0-9]{2} [0-9]{5}-[0-9]{4}"
          />
        </label>

        <label>
          <span>Empresa</span>
          <input
            type="text"
            name="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            required
          />
        </label>

        <label>
          <span>Cargo</span>
          <input
            type="text"
            name="occupation"
            value={occupation}
            onChange={(e) => setOccupation(e.target.value)}
            required
          />
        </label>
        <label>
          <span>Apelido</span>
          <input
            type="text"
            name="nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            required
          />
        </label>
        <label>
          <span>Cargo Superior</span>
          <input
            type="text"
            name="superiorOccupation"
            value={superiorOccupation}
            onChange={(e) => setSuperiorOccupation(e.target.value)}
            required
          />
        </label>
        <label>
          <span>Apelido Superior</span>
          <input
            type="text"
            name="superiorNickname"
            value={superiorNickname}
            onChange={(e) => setSuperiorNickname(e.target.value)}
            required
          />
        </label>

        <label>
          <span>Tipo CRECI</span>
          <select
            name="creciType"
            onChange={(e) => setCreciType(e.target.value)}
            value={creciType}
          >
            <option>--Selecione--</option>
            <option>Não Possui</option>
            <option>Estágio</option>
            <option>Definitivo</option>
          </select>
        </label>
        <label>
          <span>CRECI</span>
          <input
            type="text"
            name="creciNumber"
            value={creciNumber}
            onChange={(e) => setCreciNumber(e.target.value)}
            required
          />
        </label>
        <label>
          <span>Data Expiração</span>
          <input
            type="text"
            name="creciExpiration"
            value={creciExpiration}
            onChange={(e) => setCreciExpiration(e.target.value)}
            required
          />
        </label>
        <label>
          <span>PIS</span>
          <input
            type="text"
            name="pis"
            value={pis}
            onChange={(e) => setPis(e.target.value)}
            required
          />
        </label>
        <div className="form-btn">
          {!response.loading && <button className="btn">Editar</button>}
          {response.loading && (
            <button className="btn" disabled>
              Aguarde...
            </button>
          )}

          <button className="btn-cancel">
            Voltar
          </button>
          {response.error && <p className="error">{response.error}</p>}
          {formError && <p className="error">{formError}</p>}
        </div>
      </form>
    </div>
  );
};

export default EditCorretores;
