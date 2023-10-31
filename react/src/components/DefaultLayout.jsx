import {Link,  Outlet} from "react-router-dom";
import {useStateContext} from "../context/ContextProvider";
import axiosClient from "../axios-client.js";
import {useEffect} from "react";
import logo from "../assets/1.png";

export default function DefaultLayout() {
  const {user, token, setUser, setToken, notification} = useStateContext();


  useEffect(() => {
    axiosClient.get('/user')
      .then(({data}) => {
         setUser(data)
      })
  }, [])

  return (
    <div id="defaultLayout">
      <aside>
        <Link to="/users">Cadastro</Link>
      </aside>
      <div className="content">
        <header>
          <div>
            <img src={logo}/>
          </div>
        </header>
        <main>
          <Outlet/>
        </main>
        {notification &&
          <div className="notification">
            {notification}
          </div>
        }
      </div>
    </div>
  )
}
