import React, { useState, useEffect } from "react";
import UserForm from "../components/UserForm/UserForm";
import "../App.css";

function Users() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formVisible, setFormVisible] = useState(false);

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch(() => alert("Erro ao carregar usuários"));
  }, []);

  const handleAddUser = () => {
    setEditingUser(null);
    setFormVisible(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setFormVisible(true);
  };

  const handleSaveUser = async (formData) => {
    try {
      const method = editingUser ? "PUT" : "POST";
      const url = editingUser ? `/api/users/${editingUser.id}` : "/api/users";

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error();

      const savedUser = await response.json();

      if (editingUser) {
        setUsers((prev) =>
          prev.map((u) => (u.id === editingUser.id ? savedUser : u))
        );
      } else {
        setUsers((prev) => [...prev, savedUser]);
      }

      setFormVisible(false);
      setEditingUser(null);
    } catch {
      alert("Erro ao salvar o usuário");
    }
  };

  const handleCancel = () => {
    setFormVisible(false);
    setEditingUser(null);
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este usuário?")) return;
    try {
      const response = await fetch(`/api/users/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error();
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch {
      alert("Erro ao excluir o usuário");
    }
  };

  return (
    <div className="App">
      <h1>Gerenciamento de Usuários</h1>

      {!formVisible && (
        <>
          <button onClick={handleAddUser} className="btn-save">
            + Novo Usuário
          </button>

          {users.length === 0 ? (
            <p style={{ marginTop: "20px" }}>Nenhum usuário cadastrado.</p>
          ) : (
            <table
              border="1"
              cellPadding="8"
              style={{
                marginTop: "20px",
                width: "100%",
                borderCollapse: "collapse",
              }}
            >
              <thead style={{ backgroundColor: "#0077b6", color: "white" }}>
                <tr>
                  <th>Nome</th>
                  <th>Email</th>
                  <th>CPF</th>
                  <th>Cargo</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.nome}</td>
                    <td>{user.email}</td>
                    <td>{user.cpf}</td>
                    <td>{user.cargo}</td>
                    <td>
                      <button
                        className="btn-save"
                        style={{ marginRight: "8px" }}
                        onClick={() => handleEditUser(user)}
                      >
                        Editar
                      </button>
                      <button
                        className="btn-cancel"
                        onClick={() => handleDeleteUser(user.id)}
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}

      {formVisible && (
        <UserForm
          mode={editingUser ? "edit" : "create"}
          userData={editingUser || {}}
          onSave={handleSaveUser}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
}

export default Users;
