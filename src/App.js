import React, { useState } from "react";
import UserForm from "./components/UserForm/UserForm";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formVisible, setFormVisible] = useState(false);

  const handleAddUser = () => {
    setEditingUser(null);
    setFormVisible(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setFormVisible(true);
  };

  const handleSaveUser = (formData) => {
    if (editingUser) {
      setUsers((prev) =>
        prev.map((u) =>
          u.cpf === editingUser.cpf ? { ...u, ...formData } : u
        )
      ) ;
    } else {
      setUsers((prev) => [...prev, formData]);
    }
    setFormVisible(false);
    setEditingUser(null);
  };

  const handleCancel = () => {
    setFormVisible(false);
    setEditingUser(null);
  };

  const handleDeleteUser = (cpf) => {
    if (window.confirm("Tem certeza que deseja excluir este usuário?")) {
      setUsers((prev) => prev.filter((u) => u.cpf !== cpf));
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
                  <tr key={user.cpf}>
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
                        onClick={() => handleDeleteUser(user.cpf)}
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

export default App;
