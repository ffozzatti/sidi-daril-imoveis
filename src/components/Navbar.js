import styles from './Navbar.module.css'

import { NavLink } from 'react-router-dom'

import { useAuthentication } from '../hooks/useAuthentication'
import { useAuthValue } from '../context/AuthContext'

const Navbar = () => {

  const {user} = useAuthValue()
  const {logout} = useAuthentication()

  return (
    <nav className={styles.navbar}>
        <span>Olá, bem vindo!</span>
        <ul>
            <li>
                <NavLink to='/'>
                    Dashboard
                </NavLink>
            </li>
            <li>
                <NavLink to='/clientes'>
                    Clientes
                </NavLink>
            </li>
            <li>
                <NavLink to='/corretores'>
                    Corretores
                </NavLink>
            </li>
            <li>
                <NavLink to='/imoveis'>
                    Imoveis
                </NavLink>
            </li>
        </ul>
        {user && (
            <li>
                <button onClick={ logout }>Sair</button>
            </li>
        )}
    </nav>
  )
}

export default Navbar