import {useNavigate, useParams} from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import InputMask from "react-input-mask";
import {useEffect, useState} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import Select from "react-select";
import axiosClient from "../axios-client.js";
import {useStateContext} from "../context/ContextProvider.jsx";

export default function UserForm() {
  const { register, handleSubmit, control } = useForm();
  const navigate = useNavigate();
  let {id} = useParams();
  const [user, setUser] = useState({
    id: null,
    nome: '',
    email: '',
    sobrenome: '',
    datanasc: '',
    cpf: '',
    genero:''
  })
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(false)
  const {setNotification} = useStateContext()
  if (id) {
    useEffect(() => {
      setLoading(true)
      axiosClient.get(`/users/${id}`)
        .then(({data}) => {
          setLoading(false)
          setUser(data)
        })
        .catch(() => {
          setLoading(false)
        })
    }, [])
  }

  const onSubmit = ev => {
    ev.preventDefault()
    if (user.id) {
      axiosClient.put(`/users/${user.id}`, user)
        .then(() => {
          setNotification('O cadastro foi atualizado com sucesso')
          navigate('/users')
        })
        .catch(err => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors)
          }
        })
    } else {
      axiosClient.get(`/check/${user.cpf}`, user)
        .then(function (response) {
          if(response.data="false"){
            axiosClient.post('/users', user)
            .then(() => {
              setNotification('O usuário foi cadastrado com sucesso')
              navigate('/users')
            })
            .catch(err => {
              const response = err.response;
              if (response && response.status === 422) {
                setErrors(response.data.errors)
              }
            })
          }else{
            setErrors('Cpf já cadastradod')
          }
        })
    }
  }
  const getFormatedDate = (currentDate) => {
    return currentDate.split('/').reverse().join('-');
   }
  const Schema = yup.object({
    CPF: yup
      .string()
      .required("CPF obrigatório")
      .test((value) => cpf.isValid(value)),
    datanasc: yup
      .date()
      .max(getFormatedDate(new Date().toLocaleDateString()))
      .required("Campo obrigatório")

  });

  return (
    <>
      {user.id && <h1>Atualizar cadastro: {user.name}</h1>}
      {!user.id && <h1>Novo cadastro</h1>}
      <div className="card animated fadeInDown">
        {loading && (
          <div className="text-center">
            carregando...
          </div>
        )}
        {errors &&
          <div className="alert">
            {Object.keys(errors).map(key => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        }
        {!loading && (
              <form onSubmit={onSubmit}>
                <input name="nome" value={user.nome} onChange={ev => setUser({...user, nome: ev.target.value})} placeholder="Nome"/>
                <input name="sobrenome" value={user.sobrenome} onChange={ev => setUser({...user, sobrenome: ev.target.value})} placeholder="Sobrenome"/>
                <input name="cpf" value={user.cpf} onChange={ev => setUser({...user, cpf: ev.target.value})} placeholder="cpf"/>
                <input value={user.datanasc} onChange={ev => setUser({...user, datanasc: ev.target.value})} className="form-control" name="datanasc" placeholder="Data de Nascimento" type="date"/>
                <input type="radio" value="m" name="genero" checked={user.genero === "m"} onChange={ev => setUser({...user, genero: ev.target.value})} autoFocus={true} className="form-control-radio" id="genero-m"/> <label for="genero-m">Masculino</label>
                <input type="radio" value="f" name="genero" checked={user.genero === "f"} onChange={ev => setUser({...user, genero: ev.target.value})} autoFocus={true} className="form-control-radio" id="genero-f"/> <label for="genero-f">Feminino</label>
                <input name="email" type="email" value={user.email} onChange={ev => setUser({...user, email: ev.target.value})} placeholder="Email"/>
                <button className="btn">Salvar</button>
              </form>
        )}
      </div>
    </>
  )
}
