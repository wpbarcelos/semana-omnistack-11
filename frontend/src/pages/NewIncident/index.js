import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import api from "../../services/api";

import { FiArrowLeft, FiPower, FiTrash2 } from "react-icons/fi";
import "./style.css";

import logoImg from "../../assets/logo.svg";

export default function NewIncident() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [value, setValue] = useState("");
  const ongId = localStorage.getItem("ongId");
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.post(
        "incidents",
        { title, description, value },
        {
          headers: {
            authorization: ongId
          }
        }
      );
      history.push("/profile");
    } catch (error) {
      alert("Erro ao cadastrar o caso, tente novamente");
    }
  }
  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be the Hero" />
          <h1>Cadastrar novo caso</h1>
          <p>
            Descreva o caso detalhadamente para encontrar um herói para resolver
            isso.
          </p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#e02041" />
            Não tenho cadastro
          </Link>
        </section>
        <form onSubmit={handleSubmit}>
          <input
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Titulo do saso"
          />
          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Descreva o caso"
          />
          <input
            value={value}
            onChange={e => setValue(e.target.value)}
            placeholder="Valor em R$"
          />
          <button type="submit" className="button">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
