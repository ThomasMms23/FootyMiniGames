import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Element from "./country";

const elements = [
    { name: "Argentine", rank: 1 },
    { name: "France", rank: 2 },
    { name: "Brésil", rank: 3 },
    { name: "Angleterre", rank: 4 },
    { name: "Belgique", rank: 5 },
    // Add other elements here
];

const Game = () => {
    const [currentElement, setCurrentElement] = useState(null);
    const [userRanking, setUserRanking] = useState([]);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [remainingElements, setRemainingElements] = useState([]);
    const [isGameOver, setIsGameOver] = useState(false);
    const [isGameWon, setIsGameWon] = useState(false);
    const [remainingTurns, setRemainingTurns] = useState(5);
    const [isTurnsFinished, setIsTurnsFinished] = useState(false);

    useEffect(() => {
        setRemainingElements([...elements]);
    }, []);

    const pickRandomElement = () => {
        if (remainingElements.length === 0 || remainingTurns === 0) {
            setIsTurnsFinished(true);
            setIsGameOver(true);
            checkGameResult();
            return;
        }

        const randomIndex = Math.floor(
            Math.random() * remainingElements.length
        );
        const elementToClassify = remainingElements[randomIndex];
        setCurrentElement(elementToClassify);

        setRemainingElements((prevElements) =>
            prevElements.filter((element) => element !== elementToClassify)
        );
    };

    const handleRanking = (rank) => {
        if (currentElement && remainingTurns > 0) {
            if (
                userRanking.length > 0 &&
                !isRankingCorrect(userRanking[userRanking.length - 1], rank)
            ) {
                setIsGameOver(true);
                checkGameResult();
            } else {
                setUserRanking((prevRanking) => [
                    ...prevRanking,
                    { ...currentElement, userRank: rank },
                ]);
                setRemainingTurns((prevTurns) => prevTurns - 1);
                pickRandomElement();
            }
        }
    };

    const isRankingCorrect = (prevElement, currentRank) => {
        if (prevElement && currentElement) {
            if (prevElement.rank < currentElement.rank) {
                return currentRank > prevElement.userRank;
            } else if (prevElement.rank > currentElement.rank) {
                return currentRank < prevElement.userRank;
            }
        }
        return true;
    };

    const isGameFinished = userRanking.length === elements.length;

    const checkGameResult = () => {
        const isCorrectlyRanked = userRanking.every(
            (element, index) => element.rank === index + 1
        );

        if (isCorrectlyRanked) {
            setIsGameWon(true);
        } else if (remainingTurns === 0) {
            setIsGameOver(true);
        }
    };

    const handleGameStart = () => {
        setIsGameStarted(true);
        setIsGameOver(false);
        setIsGameWon(false);
        setRemainingTurns(5);
        pickRandomElement();
    };

    const handleRestart = () => {
        setRemainingElements([...elements]);
        setUserRanking([]);
        setIsGameStarted(false);
        setIsGameOver(false);
        setIsGameWon(false);
        setRemainingTurns(5);
        setIsTurnsFinished(false);
    };

    const sortedUserRanking = userRanking.sort(
        (a, b) => a.userRank - b.userRank
    );

    return (
        <div>
            {!isGameFinished && !isGameOver && !isGameWon ? (
                <div>
                    <h2>Classement du jeu</h2>
                    <div>
                        <h3>Votre classement actuel :</h3>
                        <ul>
                            {sortedUserRanking.map((element, index) => (
                                <li key={element.name}>
                                    {index + 1}. {element.name} - Classement :{" "}
                                    {element.userRank}
                                </li>
                            ))}
                        </ul>
                    </div>
                    {isGameStarted ? (
                        currentElement && !isTurnsFinished ? (
                            <div>
                                <Element
                                    name={currentElement.name}
                                    onRanking={handleRanking}
                                />
                                <p>
                                    Nombre de tours restants : {remainingTurns}
                                </p>
                            </div>
                        ) : (
                            <p>Le jeu est terminé !</p>
                        )
                    ) : (
                        <button onClick={handleGameStart}>Commencer</button>
                    )}
                </div>
            ) : (
                <div>
                    {isGameFinished ? (
                        <div>
                            <h2>Bravo ! Vous avez terminé le jeu.</h2>
                            <h3>Votre classement final :</h3>
                            <ul>
                                {sortedUserRanking.map((element, index) => (
                                    <li key={element.name}>
                                        {index + 1}. {element.name} - Classement
                                        : {element.userRank}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : isGameWon ? (
                        <div>
                            <h2>Félicitations ! Vous avez gagné la partie.</h2>
                            <button onClick={handleRestart}>Recommencer</button>
                        </div>
                    ) : (
                        <div>
                            <h2>Dommage ! Vous avez perdu le jeu.</h2>
                            <button onClick={handleRestart}>Recommencer</button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

Element.propTypes = {
    name: PropTypes.string.isRequired,
    onRanking: PropTypes.func.isRequired,
};

export default Game;
