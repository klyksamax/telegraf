import { observer } from "mobx-react-lite";

const Header = observer(({ appStore }) => {

    const closeModul = () => {
        appStore.closeModul()
    }

    return (
        <div className="header__container">
            <h2>Project Telegraf</h2>
            {!appStore.openPopup ? <p onClick={closeModul}>Выйти</p> : null}
            
        </div>
    );
});

export default Header;
