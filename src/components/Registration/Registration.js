import { observer } from "mobx-react-lite";
import { registration } from "../const";
import Input from "../Input/Input";



const Registration = observer(({appStore }) => {

    const onChangeInput = (element) =>{
   appStore.inputRegister.reduce((acc, el) => {
            if (el.id === element.id) {
                appStore.setInputRegister([...acc, { ...element }])
              return [...acc, { ...element }];
            }
                appStore.setInputRegister([...acc, el])
              return [...acc, el];
          }, []);
    }

    return (
        <div className="registration__container">
           {appStore.inputRegister.map((el, i) => {         
                    return <Input 
                    key={i} 
                    element={el} 
                    onChangeInput={onChangeInput}
                    />
                })}
        </div>
    );
});

export default Registration;
