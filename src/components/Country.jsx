import PropTypes from "prop-types";

const Element = ({ name, onRanking }) => {
    return (
        <div>
            <h3>Classez lélément suivant :</h3>
            <p>{name}</p>
            <button onClick={() => onRanking(1)}>1</button>
            <button onClick={() => onRanking(2)}>2</button>
            <button onClick={() => onRanking(3)}>3</button>
            <button onClick={() => onRanking(4)}>4</button>
            <button onClick={() => onRanking(5)}>5</button>
        </div>
    );
};

Element.propTypes = {
    name: PropTypes.string.isRequired,
    onRanking: PropTypes.func.isRequired,
};

export default Element;
