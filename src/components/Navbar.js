import styles from "./Navbar.module.css";

import { NavLink } from "react-router-dom";

import { useAuthentication } from "../hooks/useAuthentication";
import { useAuthValue } from "../context/AuthContext";
import Logo from "./Logo";

const Navbar = () => {
  const { user } = useAuthValue();
  const { logout } = useAuthentication();

  const logoutConfirm = () => {
    const confirmAction = window.confirm("Deseja realmente sair?");

    if (confirmAction == true) {
      logout();
    }
  };

  return (
		<nav className={styles.navbar}>
			<div className={styles.logo}>
				<Logo />
			</div>
			<ul>
				<NavLink to="/">
					<li>Dashboard</li>
				</NavLink>
				<NavLink to="/clientes">
					<li>Clientes</li>
				</NavLink>
				<NavLink to="/corretores">
					<li>Corretores</li>
				</NavLink>
				<NavLink to="/incorporadoras">
					<li>Incorporadora</li>
				</NavLink>
			</ul>
			{user && (
				<div className={styles.logout}>
					<button onClick={logoutConfirm} className="btn">
						Sair
					</button>
				</div>
			)}
		</nav>
	)
};

export default Navbar;
