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
                <Аuthorization/>
            )
        } else {
            setLoginPage(
                <Registration appStore = {appStore}/>
            )
        }
    }, [])

  const closeModdal = () => {
    // gridStore.hideFilterPopup();
    // gridStore.onCancelFilter();
  };

  const handleApply = () => {
    appStore.onApplyPopup();
   // appStore.setOpenPopup(false);
  };

  const handleClear = () => {
    // gridStore.clearFilters();
  };
    // useEffect(()=>{
    //     if(){

    //     } else {

    //     }
    // },[])

  
    return (
            <PopupModal
      visible={appStore.openPopup}
      onClose={closeModdal}
      handleApply={handleApply}
      title={visible ? ["Окно авторизации"] : ["Окно регистрации"]}
      isCloseIconVisible={true}
      titleContent={""}
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
