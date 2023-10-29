import { observer } from "mobx-react-lite";
import CardPage from "../CardPage/CardPage";
import { useEffect, useState } from "react";
import { api } from "../../utils/api";
import { PopupModal } from "../PopupModal/PopupModal";
import Input from "../Input/Input";

const CollectionPages = observer(({ appStore }) => {
    const [openPage, setOpenPage] = useState(false)
    const [pageList, setPageList] = useState([])

    useEffect(()=>{
        if(appStore.token){
            api.getPageList({
                body: appStore.token,
                resolveCallback: (data) => {
                    setPageList(data.result.pages)
                }
            })
        }       
    },[appStore.token, appStore.pageList])

    const onChangeInput = (element) =>{
        appStore.inputPage.reduce((acc, el) => {
                 if (el.id === element.id) {
                     appStore.setInputPage([...acc, { ...element }])
                   return [...acc, { ...element }];
                 }
                     appStore.setInputPage([...acc, el])
                   return [...acc, el];
               }, []);
         }

    const closeModdal = () => {
        setOpenPage(false)
      };
    
      const handleApply = () => {
       appStore.onApplyPage();
       setOpenPage(false)
       // appStore.setOpenPopup(false);
      };
    
      const handleClear = () => {
        // gridStore.clearFilters();
      };

    return (
        <div className="collection-pages_container">
            <div className="collection-pages_btn">
                <div 
                className="pages_btn" 
                onClick={(e)=>{setOpenPage(true)}}>
                    Добавить страницу
                    </div>
            </div>
            <div className="collection-pages_">
                <PopupModal
                    visible={openPage}
                    onClose={closeModdal}
                    handleApply={handleApply}
                    title={["Добавить страницу"]} 
                    isCloseIconVisible={true}
                    titleContent={""}
                    size={"popup_lg"}
                    content={<div className="registration__container">
                    {appStore.inputPage.map((el, i) => {         
                             return <Input 
                             key={i} 
                             element={el} 
                             onChangeInput={onChangeInput}
                             />
                         })}
                 </div>}
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
                {pageList.map((el, i) => {
                    return (
                        <CardPage key={i} element={el} />
                    )
                })}
                
            </div>
            
        </div>
    );
});

export default CollectionPages;
