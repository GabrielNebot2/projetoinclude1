import React, { useState } from "react";
import UserForm from "../components/UserForm";

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);

  function handleSave(userData) {
    if (editingUser) {
      setUsers(users.map(u => (u.id === editingUser.id ? { ...u, ...userData } : u)));
      setEditingUser(null);
    } else {
      setUsers([...users, { ...userData, id: Date.now() }]);
    }
  }

  function handleEdit(user) {
    setEditingUser(user);
  }

  function handleCancel() {
    setEditingUser(null);
  }

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Página de Usuários</h2>

      <UserForm
        onSave={handleSave}
        editingUser={editingUser}
        onCancel={handleCancel}
      />

      <hr />

      <h4>Usuários Cadastrados</h4>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Email</th>
            <th>CPF</th>
            <th>Cargo</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">
                Nenhum usuário cadastrado
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.nome}</td>
                <td>{user.email}</td>
                <td>{user.cpf}</td>
                <td>{user.cargo}</td>
                <td>
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => handleEdit(user)}
                  >
                    Editar
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default UsersPage;
