import { observer } from "mobx-react-lite";
import Input from "../Input/Input";
import ButtonIcon from "../ButtonIcon/ButtonIcon";
import { useEffect, useState } from "react";
import { PopupModal } from "../PopupModal/PopupModal";
import Аuthorization  from "../Аuthorization/Аuthorization";
import Registration  from "../Registration/Registration";
import { guid } from "../../utils/basic";


const LoginPage = observer(({appStore, handleAuth }) => {

    const [visible, setVisible] = useState(false)
    const [loginPage, setLoginPage] = useState(<></>)

    useEffect(()=>{
        if(visible){
            setLoginPage(
                <Аuthorization appStore = {appStore}/>
            )
        } else {
            setLoginPage(
                <Registration appStore = {appStore}/>
            )
        }
    }, [visible, appStore.auth])

  const closeModdal = () => {
    // gridStore.hideFilterPopup();
    // gridStore.onCancelFilter();
  };

  const handleApply = () => {
    if(visible){
      appStore.onApplyLogin();
    } else {
      appStore.onApplyRegister();
    }
    
   // appStore.setOpenPopup(false);
  };

  const handleClear = () => {
    // gridStore.clearFilters();
  };

  
    return (
            <PopupModal
      visible={appStore.openPopup}
      onClose={closeModdal}
      handleApply={handleApply}
      title={visible ? ["Окно авторизации"] : ["Окно регистрации"]}
      titleContent={
      <div 
      className="login-page__btn"
      onClick={(e)=>{setVisible(!visible)}}
      >
        Войти
        </div>
    }
      content={loginPage}
      footer={
        <>
          <button
            className="popup__modal-footer-button_blue"
            onClick={handleApply}
          >
            Применить
          </button>
          <button
            className="popup__modal-footer-button_red"
            onClick={handleClear}
          >
            Очистить
          </button>
        </>
      }
    />
    );
});

export default LoginPage;
