import React, { useState } from "react";
import { FiLogIn } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";
import api from "../../services/api";

import "./style.css";
import heroesImg from "../../assets/heroes.png";
import logoImg from "../../assets/logo.svg";
export default function Logon() {
  const [id, setId] = useState("");
  const history = useHistory();
  const handleSubmit = async e => {
    e.preventDefault();

    try {
      const { data } = await api.post("login", { id });

      localStorage.setItem("ongName", data.name);
      localStorage.setItem("ongId", id);
      history.push("/profile");
    } catch (error) {}
  };
  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be the Hero" />
        <form onSubmit={handleSubmit}>
          <h1>Faça seu Login</h1>
          <input
            type="text"
            placeholder="Sua ID"
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <button className="button" type="submit">
            Entrar
          </button>

          <Link to="/register">
            <FiLogIn size={16} color="#e02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>
      <img src={heroesImg} alt="Heroes Image" />
    </div>
  );
}
