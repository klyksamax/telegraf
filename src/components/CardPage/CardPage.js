import { observer } from "mobx-react-lite";


const CardPage = observer(({ element }) => {

    return (
        <div className="card-page__block">
            <h3 className="card-page__block-title">
                {element.title}
            </h3>
            <p className="card-page__block-description">
                {element.description}
            </p>
            <p className="card-page__block-date">
                {element.date}
            </p>
        </div>
    );
});

export default CardPage;
