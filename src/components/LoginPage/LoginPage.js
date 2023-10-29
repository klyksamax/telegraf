import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { PopupModal } from "../PopupModal/PopupModal";
import Аuthorization  from "../Аuthorization/Аuthorization";
import Registration  from "../Registration/Registration";


const LoginPage = observer(({appStore, handleAuth }) => {

    const [visible, setVisible] = useState(false)
    const [loginPage, setLoginPage] = useState(<></>)

    useEffect(()=>{
        if(!visible){
            setLoginPage(
                <Аuthorization appStore = {appStore}/>
            )
        } else {
            setLoginPage(
                <Registration appStore = {appStore}/>
            )
        }
    }, [visible, appStore.auth])

  const handleApply = () => {
    if(!visible){
      appStore.onApplyLogin();
    } else {
      appStore.onApplyRegister();
    }
  };

  const onClose = () => {
    
  };

  
    return (
            <PopupModal
      visible={appStore.openPopup}
      handleApply={handleApply}
      onClose={onClose}
      title={!visible ? ["Окно авторизации"] : ["Окно регистрации"]}
      size={"popup_md"}
      titleContent={
      <div 
      className="login-page__btn"
      onClick={(e)=>{setVisible(!visible)}}
      >
        {!visible ? <>Регистрация</> : <>Войти</>}
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
        </>
      }
    />
    );
});

export default LoginPage;
