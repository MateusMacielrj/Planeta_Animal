
import { NavLink } from "react-router-dom";
import logoPlaneta from "./../../assets/logo-png.png";
import "./Sidebar.css";

function Sidebar() {
  return (
    <nav className="sidebar">
      <header className="sidebar-header">
        <img
          className="sidebar-logo"
          src={logoPlaneta}
          alt="Logo Planeta Animal"
        />

        <h1>Planeta Animal</h1>
      </header>

      <ul className="sidebar-menu">
        <li>
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/novo-pedido"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            Novo Pedido
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/pedidos"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            Pedidos
          </NavLink>
        </li>

        <li>
          <NavLink
            to="/extrato"
            className={({ isActive }) =>
              isActive ? "active" : ""
            }
          >
            Extrato
          </NavLink>
        </li>
      </ul>

      <footer className="sidebar-footer">
        Planeta Animal
      </footer>
    </nav>
  );
}

export default Sidebar;
