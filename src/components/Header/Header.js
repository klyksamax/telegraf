import { observer } from "mobx-react-lite";

const Header = observer(({ appStore }) => {

    const closeModul = () => {
        appStore.closeModul()
    }

    return (
        <div className="header__container">
            <h2>Project Telegraf</h2>
            <p onClick={closeModul}>Выйти</p>
        </div>
    );
});

export default Header;
