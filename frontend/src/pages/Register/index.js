import React from "react";
import { Link, useHistory } from "react-router-dom";
import api from "../../services/api";
import { FiArrowLeft } from "react-icons/fi";
import "./style.css";

import logoImg from "../../assets/logo.svg";

export default function Register() {
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [whatsapp, setWhatsapp] = React.useState("");
  const [city, setCity] = React.useState("");
  const [uf, setUf] = React.useState("");
  const history = useHistory();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const { data } = await api.post("ongs", {
        name,
        email,
        city,
        whatsapp,
        uf
      });
      alert(`Seu ID de acesso:${data.id}`);
      history.push("/");
    } catch (error) {
      alert("Erro no cadastro, tente novamente");
    }
  };
  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be the Hero" />
          <h1>Cadastro</h1>
          <p>
            Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem
            os casos da sua ONG.
          </p>

          <Link className="back-link" to="/">
            <FiArrowLeft size={16} color="#e02041" />
            Não tenho cadastro
          </Link>
        </section>
        <form onSubmit={e => handleSubmit(e)}>
          <input
            placeholder="Nome da ONG"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            placeholder="whatsapp"
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
          />
          <div className="input-group">
            <input
              placeholder="Cidade"
              value={city}
              onChange={e => setCity(e.target.value)}
            />
            <input
              placeholder="UF"
              style={{ width: 80 }}
              value={uf}
              onChange={e => setUf(e.target.value)}
            />
          </div>
          <button type="submit" className="button">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
