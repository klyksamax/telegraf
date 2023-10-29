import { observer } from "mobx-react-lite";
import { profile } from "../const";
import Input from "../Input/Input";
import { getListInputProfile } from "../../utils/basic";
import { useEffect, useState } from "react";
import ButtonIcon from "../ButtonIcon/ButtonIcon";
import { api } from "../../utils/api";

const Profile = observer(({ appStore }) => {

    const [profileList, setProfileList] = useState(getListInputProfile(profile))

    useEffect(() => {
        setProfileList(getListInputProfile(profile))
    }, [])

    const test = () => {
        api.getAccount({
            resolveCallback: (data) => {
                console.log(data)
            },
        });
    }

    return (
        <div className="profile__block">
            <div></div>
            <div className="profile__block-input">
                {profileList.map((el, i) => {
                    return <Input key={i} element={el} />
                })}
            </div>
            <ButtonIcon
                title={"Изменить"}
                text={"Изменить"}
                btnSelector="buttonIcon__change"
                size={"LARGE"}
                onClick={test}
            />
        </div>
    );
});

export default Profile;
