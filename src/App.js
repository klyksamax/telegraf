import { createContext, useEffect } from 'react';
import './App.css';
import { observer } from "mobx-react-lite";
import { Route, Routes } from 'react-router-dom';
import Content from './components/Content/Content';
import Header from './components/Header/Header';
import { api } from './utils/api';
import { appStore } from './store/AppStore';
const AppContext = createContext(appStore);

const App = observer(() => {

  // useEffect(() => {
  //   api.getSlides({
  //     resolveCallback: (data) => {
  //       console.log(data)
  //     },
  //   });
  // }, []);


  return (
    <AppContext.Provider value={""}>
      <div className="App">
        <header>
          <Header appStore={""} />
        </header>
        <main>
          <Routes>
            <Route
              path='/'
              element={<Content appstore={""} />} />
          </Routes>
        </main>
      </div>
    </AppContext.Provider>
  );


})

export default App;
