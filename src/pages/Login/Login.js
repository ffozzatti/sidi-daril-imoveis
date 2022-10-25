import { useState, useEffect } from "react";
import Logo from "../../components/Logo";
import { FaUserCircle } from "react-icons/fa";
import { BsFillShieldLockFill } from "react-icons/bs";

import { useAuthentication } from "../../hooks/useAuthentication";

import styles from "./Login.module.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login, error: authError, loading } = useAuthentication();

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    const user = {
      email,
      password,
    };

    const res = await login(user);

    console.log(res);
  };

  useEffect(() => {
    if (authError) {
      setError(authError);
    }
  }, [authError]);

  return (
    <div className={styles.login}>
      <div className={styles.logo}>
        <Logo />
      </div>
      <h1>Bem vindo ao SIDI!</h1>
      <p>Digite suas credencias de acesso.</p>

      <form onSubmit={handleSubmit}>
        <label>
          <span>
            <FaUserCircle />{" "}
          </span>
          <input
            type="email"
            name="email"
            value={email}
            required
            autocomplete="off"
            placeholder="Usuário"
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          <span>
            {" "}
            <BsFillShieldLockFill />{" "}
          </span>
          <input
            type="password"
            name="password"
            value={password}
            required
            autocomplete="off"
            placeholder="Senha"
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {!loading && <button className="btn">Entrar</button>}
        {loading && (
          <button className="btn" disabled>
            Aguarde...
          </button>
        )}

        {error && <p className="error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
