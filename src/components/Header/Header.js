import { observer } from "mobx-react-lite";

const Header = observer(({ appStore }) => {

    return (
        <div className="header__container">
            <h2>Project Telegraf</h2>
        </div>
    );
});

export default Header;
