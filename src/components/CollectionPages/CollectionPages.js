import { observer } from "mobx-react-lite";
import { page } from "../const";
import CardPage from "../CardPage/CardPage";

const CollectionPages = observer(({ appStore }) => {

    return (
        <div className="collection-pages_block">
            {page.map((el, i) => {
                return (
                    <CardPage key={i} element={el} />
                )
            })}
        </div>
    );
});

export default CollectionPages;
