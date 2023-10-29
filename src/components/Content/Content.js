import { observer } from "mobx-react-lite";
import CollectionPages from "../CollectionPages/CollectionPages";
import Profile from "../Profile/Profile";

const Content = observer(({ appStore }) => {

    return (
        <div className="content__container">
            <div className="collection-pages__container">
                <CollectionPages />
            </div>
            <div className="content-separator"></div>
            <div className="profile__containe">
                <Profile appStore={appStore}/>
            </div>
        </div>
    );
});

export default Content;
