import { createContext, useEffect } from 'react';
import './App.css';
import { observer } from "mobx-react-lite";
import { Route, Routes } from 'react-router-dom';
import Content from './components/Content/Content';
import Header from './components/Header/Header';
import { api } from './utils/api';
import { appStore } from './store/AppStore';
import LoginPage from './components/LoginPage/LoginPage';
const AppContext = createContext(appStore);

const App = observer(() => {

  useEffect(() => {
    console.log(localStorage.getItem("userTelegraf"))
    api.getAccount({
      body:  localStorage.getItem("userTelegraf"),
      resolveCallback: (data) => {
        if(data.ok){
          appStore.setProfile(data.result)
          appStore.setToken(localStorage.getItem("userTelegraf"))
          appStore.setOpenPopup(false)
          appStore.setAuth(true)
        }
      },
    });
  }, [appStore.token]);


  return (
    <AppContext.Provider value={""}>
      <div className="App">
      
        <header>
          <Header appStore={appStore} />
        </header>
        <main>
          <Routes>
            <Route
              path='/'
              element={appStore.token 
              ? <Content appStore={appStore} /> 
              : <LoginPage appStore={appStore}/>} /> 
          </Routes>
        </main>
      </div>
    </AppContext.Provider>
  );


})

export default App;
