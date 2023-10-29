import { observer } from "mobx-react-lite";
import { getListInputProfile, getObjectRegister } from "../../utils/basic";
import { useEffect } from "react";
import ButtonIcon from "../ButtonIcon/ButtonIcon";
import { api } from "../../utils/api";
import Input from "../Input/Input";

const Profile = observer(({ appStore }) => {

    useEffect(() => {
        getListInputProfile(appStore)
    }, [appStore])

    const onChangeInput = (element) =>{
        appStore.inputProfile.reduce((acc, el) => {
                 if (el.id === element.id) {
                     appStore.setInputProfile([...acc, { ...element }])
                   return [...acc, { ...element }];
                 }
                     appStore.setInputProfile([...acc, el])
                   return [...acc, el];
               }, []);
         }

    const editForm = () => {
        api.editAccountInfo({
            body:{
                profole: getObjectRegister(appStore.inputProfile),
                token: appStore.token
            },
            resolveCallback: (data) => {
                appStore.setProfile(data.result)
            }
        })
    }

    return (
        <div className="profile__block">
            <div></div>
            <div className="profile__block-input">
                {appStore.inputProfile.map((el, i) => {
                    return <Input
                    key={i} 
                    element={el} 
                    onChangeInput={onChangeInput}
                     />
                })}
            </div>
            <ButtonIcon
                title={"Изменить"}
                text={"Изменить"}
                btnSelector="buttonIcon__change"
                size={"LARGE"}
                onClick={editForm}
            />
        </div>
    );
});

export default Profile;
