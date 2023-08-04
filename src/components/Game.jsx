import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Element from "./country";

const elements = [
    { name: "Argentine", rank: 1 },
    { name: "France", rank: 2 },
    { name: "Brésil", rank: 3 },
    { name: "Angleterre", rank: 4 },
    { name: "Belgique", rank: 5 },
    { name: "Croatie", rank: 6 },
    { name: "Portugal", rank: 7 },
    { name: "Maroc", rank: 8 },
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

    useEffect(() => {
        // Shuffle the elements
        const shuffledElements = shuffleArray(elements);

        // Select the first 5 elements
        const selectedElements = shuffledElements.slice(0, 5);

        setRemainingElements([...selectedElements]);
    }, []);

    const pickRandomElement = () => {
        if (remainingElements.length === 0 || remainingTurns === 0) {
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

    const isGameFinished = userRanking.length === 5;

    const checkGameResult = () => {
        if (userRanking.length !== 5) {
            setIsGameWon(false);
            return;
        }

        const sortedUserRanking = userRanking.slice().sort((a, b) => {
            const aRank = elements.find(
                (element) => element.name === a.name
            ).rank;
            const bRank = elements.find(
                (element) => element.name === b.name
            ).rank;
            return aRank - bRank;
        });

        const isCorrectlyRanked = sortedUserRanking.every(
            (element, index) => element.rank === index + 1
        );

        setIsGameWon(isCorrectlyRanked && remainingTurns > 0);
    };

    const handleGameStart = () => {
        setIsGameStarted(true);
        setIsGameOver(false);
        setIsGameWon(false);
        setRemainingTurns(5);
        pickRandomElement();
    };

    const handleRestart = () => {
        // Shuffle the elements again for a new game
        const shuffledElements = shuffleArray(elements);
        const selectedElements = shuffledElements.slice(0, 5);

        setRemainingElements([...selectedElements]);
        setUserRanking([]);
        setIsGameStarted(false);
        setIsGameOver(false);
        setIsGameWon(false);
        setRemainingTurns(5);
    };

    return (
        <div>
            {!isGameFinished && !isGameOver && !isGameWon ? (
                <div>
                    <h2>Classement du jeu</h2>
                    <div>
                        <h3>Votre classement actuel :</h3>
                        <ul>
                            {userRanking.map((element, index) => (
                                <li key={element.name}>
                                    {index + 1}. {element.name} - Classement :{" "}
                                    {element.userRank}
                                </li>
                            ))}
                        </ul>
                    </div>
                    {isGameStarted ? (
                        currentElement ? (
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
                            <p>Chargement de lélément suivant...</p>
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
                                {userRanking.map((element, index) => (
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

// Helper function to shuffle an array using the Fisher-Yates algorithm
function shuffleArray(array) {
    const shuffledArray = array.slice(); // Create a copy of the original array
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [
            shuffledArray[j],
            shuffledArray[i],
        ];
    }
    return shuffledArray;
}

Element.propTypes = {
    name: PropTypes.string.isRequired,
    onRanking: PropTypes.func.isRequired,
};

export default Game;
