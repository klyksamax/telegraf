import { observer } from "mobx-react-lite";
import Input from "../Input/Input";



const Аuthorization = observer(({ appStore }) => {

    const onChangeInput = (element) =>{
        appStore.inputLogin.reduce((acc, el) => {
                 if (el.id === element.id) {
                     appStore.setInputLogin([...acc, { ...element }])
                   return [...acc, { ...element }];
                 }
                     appStore.setInputLogin([...acc, el])
                   return [...acc, el];
               }, []);
         }

    return (
        <div className="authorization__container">
           {appStore.inputLogin.map((el, i) => {         
                    return <Input 
                    key={i} 
                    element={el} 
                    onChangeInput={onChangeInput}
                    />
                })}
        </div>
    );
});

export default Аuthorization;
