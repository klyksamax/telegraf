import { observer } from "mobx-react-lite";
import { getListInputProfile, getObjectRegister } from "../../utils/basic";
import { useEffect, useState } from "react";
import ButtonIcon from "../ButtonIcon/ButtonIcon";
import { api } from "../../utils/api";
import Input from "../Input/Input";

const Profile = observer(({ appStore }) => {

    const [okEdit, setOkEdit] = useState(false)

    useEffect(() => {
        appStore.setInputProfile(getListInputProfile(appStore))
        getListInputProfile(appStore)
    }, [appStore.profile, appStore.openPopup])

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
                if(data.ok){
                    setOkEdit(true);
                    setTimeout(() => {
                        setOkEdit(false);
                      }, 5000);
                    appStore.setProfile(data.result)
                }
            }
        })
    }

    return (
        <div className="profile__block">
            <div className="profile__block-input">
                {appStore.inputProfile.map((el, i) => {
                    return <Input
                    key={i} 
                    element={el} 
                    onChangeInput={onChangeInput}
                     />
                })}
            </div>
            <div className="profile__block-btn">
            <ButtonIcon
                title={"Изменить"}
                text={"Изменить"}
                btnSelector="buttonIcon__change"
                size={"LARGE"}
                onClick={editForm}
            />
            {okEdit ? <ButtonIcon
                title={"Изменения успешно сохранены"}
                text={"Изменения успешно сохранены"}
                btnSelector="buttonIcon__change"
                disabledAction={true}
                size={"LARGE"}
                onClick={editForm}
            /> : null}
            </div>
            
        </div>
    );
});

export default Profile;
