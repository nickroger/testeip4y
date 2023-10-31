import {useEffect, useState} from "react";
import axiosClient from "../axios-client.js";
import {Link} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider.jsx";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const {setNotification} = useStateContext()

  useEffect(() => {
    getUsers();
  }, [])

  const onDeleteClick = user => {
    if (!window.confirm("Tem certeza de que deseja excluir este usuário?")) {
      return
    }
    axiosClient.delete(`/users/${user.id}`)
      .then(() => {
        setNotification('Cadastro apagado')
        getUsers()
      })
  }

  const getUsers = () => {
    setLoading(true)
    axiosClient.get('/users')
      .then(({ data }) => {
        setLoading(false)
        setUsers(data.data)
      })
      .catch(() => {
        setLoading(false)
      })
  }
  function datebr(input){
    console.log(input);
    const [year, month, day] =  input.split('-')
  
    return `${day}/${month}/${year}`;

  }

  return (
    <div>
      <div style={{display: 'flex', justifyContent: "space-between", alignItems: "center"}}>
        <h1>Cadastro</h1>
        <Link className="btn-add" to="/users/new">Adicionar novo</Link>
      </div>
      <div className="card animated fadeInDown">
        <table>
          <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Data de nascimento</th>
            <th>Cpf</th>
            <th>Email</th>
            <th>Create Date</th>
            <th></th>
          </tr>
          </thead>
          {loading &&
            <tbody>
            <tr>
              <td colSpan="5" class="text-center">
                Carregando...
              </td>
            </tr>
            </tbody>
          }
          {!loading &&
            <tbody>
            {users.map(u => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.nome}</td>
                <td>{datebr(u.datanasc)}</td>
                <td>{u.cpf}</td>
                <td>{u.email}</td>
                <td>{u.created_at}</td>
                <td>
                  <Link className="btn-edit" to={'/users/' + u.id}>Editar</Link>
                  &nbsp;
                  <button className="btn-delete" onClick={ev => onDeleteClick(u)}>Deletar</button>
                </td>
              </tr>
            ))}
            </tbody>
          }
        </table>
      </div>
    </div>
  )
}
