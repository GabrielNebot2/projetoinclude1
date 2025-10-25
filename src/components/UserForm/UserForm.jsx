import React, { useState, useEffect } from "react";
import "./UserForm.css";

function UserForm({ mode = "create", userData = {}, onCancel }) {
  const [formData, setFormData] = useState({
    nome: userData.nome || "",
    email: userData.email || "",
    cpf: userData.cpf || "",
    senha: "",
    cargo: userData.cargo || "Funcionário",
  });

  useEffect(() => {
    setFormData({
      nome: userData.nome || "",
      email: userData.email || "",
      cpf: userData.cpf || "",
      senha: "",
      cargo: userData.cargo || "Funcionário",
    });
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const method = mode === "edit" ? "PUT" : "POST";
      const url = mode === "edit" ? `/api/users/${userData.id}` : "/api/users";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error();

      alert("Usuário salvo com sucesso!");
      if (onCancel) onCancel();
    } catch (error) {
      alert("Erro ao salvar o usuário.");
    }
  };

  return (
    <div className="user-form-container">
      <h2>{mode === "edit" ? "Editar Usuário" : "Cadastrar Usuário"}</h2>
      <form onSubmit={handleSubmit} className="user-form">
        <label>Nome</label>
        <input
          type="text"
          name="nome"
          value={formData.nome}
          onChange={handleChange}
          required
        />
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label>CPF</label>
        <input
          type="text"
          name="cpf"
          value={formData.cpf}
          onChange={handleChange}
          required
        />
        <label>Senha</label>
        <input
          type="password"
          name="senha"
          value={formData.senha}
          onChange={handleChange}
          required={mode === "create"}
        />
        <label>Cargo</label>
        <select name="cargo" value={formData.cargo} onChange={handleChange}>
          <option value="Funcionário">Funcionário</option>
          <option value="Gerente">Gerente</option>
        </select>
        <div className="form-buttons">
          <button type="submit" className="btn-save">Salvar</button>
          <button type="button" className="btn-cancel" onClick={onCancel}>Cancelar</button>
        </div>
      </form>
    </div>
  );
}

export default UserForm;
