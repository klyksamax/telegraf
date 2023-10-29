import { createContext, useEffect } from 'react';
import './App.css';
import { observer } from "mobx-react-lite";
import { Route, Routes } from 'react-router-dom';
import Content from './components/Content/Content';
import Header from './components/Header/Header';
import { api } from './utils/api';
import { appStore } from './store/AppStore';
import { apiAuth } from './utils/apiAuth';
import LoginPage from './components/LoginPage/LoginPage';
const AppContext = createContext(appStore);

const App = observer(() => {

  useEffect(() => {
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
  }, [appStore.auth]);

  return (
    <AppContext.Provider value={""}>
      <div className="App">
      <LoginPage appStore={appStore}/>
        <header>
          <Header appStore={appStore} />
        </header>
        <main>
          <Routes>
            {appStore.token ? <Route
              path='/'
              element={<Content appStore={appStore} />} /> : null}
          </Routes>
        </main>
      </div>
    </AppContext.Provider>
  );


})

export default App;
