import { useState, useEffect } from 'react'

import { useAuthentication } from '../../hooks/useAuthentication'

import styles from './Login.module.css'

const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const {login, error: authError, loading} = useAuthentication()

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("")

        const user = {
            email,
            password
        }

        const res = await login(user)

        console.log(res)
    }

    useEffect (() => {
        if(authError) {
            setError(authError)
        }

    }, [authError])


  return (
    <div className={styles.login}>
        <h1>Bem vindo!</h1>
        <p>Digite suas credencias de acesso.</p>

        <form onSubmit={handleSubmit}>
            <label>
                <span>E-mail</span>
                <input 
                    type="email" 
                    name="email" 
                    value={email}
                    required
                    placeholder="exemplo@exemplo.com.br"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </label>
            <label>
                <span>Senha</span>
                <input 
                    type="password" 
                    name="password" 
                    value={password}
                    required
                    placeholder="Insita sua senha"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </label>
            {!loading && <button className='btn'>Entrar</button>}
            {loading && <button className='btn' disabled>Aguarde...</button>}

            {error && <p className='error'>{error}</p>}
        </form>
    </div>
  )
}

export default Login