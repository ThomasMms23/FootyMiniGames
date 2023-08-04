import PropTypes from "prop-types";

const Element = ({ name, onRanking }) => {
    return (
        <div>
            <h3>Classez les pays suivants, sans connaitre le suivant</h3>
            <p className="country-name">{name}</p>
            <div className="ranking-container">
                <button className="ranking-button" onClick={() => onRanking(1)}>
                    1
                </button>
                <button className="ranking-button" onClick={() => onRanking(2)}>
                    2
                </button>
                <button className="ranking-button" onClick={() => onRanking(3)}>
                    3
                </button>
                <button className="ranking-button" onClick={() => onRanking(4)}>
                    4
                </button>
                <button className="ranking-button" onClick={() => onRanking(5)}>
                    5
                </button>
            </div>
        </div>
    );
};

Element.propTypes = {
    name: PropTypes.string.isRequired,
    onRanking: PropTypes.func.isRequired,
};

export default Element;
