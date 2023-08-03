import { useState, useEffect } from "react";
import Country from "./Country";

const elements = [
    { name: "Argentine", rank: 1 },
    { name: "France", rank: 2 },
    { name: "Brésil", rank: 3 },
    { name: "Angleterre", rank: 4 },
    { name: "Belgique", rank: 5 },
    { name: "Croatie", rank: 6 },
    { name: "Portugal", rank: 7 },
    { name: "Maroc", rank: 8 },
    // Ajoutez les autres éléments ici
];

const Game = () => {
    const [currentElement, setCurrentElement] = useState(null);
    const [userRanking, setUserRanking] = useState([]);
    const [isGameStarted, setIsGameStarted] = useState(false);
    const [remainingElements, setRemainingElements] = useState([]);
    const [isGameOver, setIsGameOver] = useState(false);

    useEffect(() => {
        setRemainingElements([...elements]);
    }, []);

    const pickRandomElement = () => {
        if (remainingElements.length === 0) {
            setCurrentElement(null);
            setIsGameOver(true);
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
        if (currentElement) {
            if (
                userRanking.length > 0 &&
                !isRankingCorrect(userRanking[userRanking.length - 1], rank)
            ) {
                setIsGameOver(true); // L'utilisateur s'est trompé, le jeu est terminé
            } else {
                setUserRanking((prevRanking) => [
                    ...prevRanking,
                    { ...currentElement, userRank: rank },
                ]);
            }
            pickRandomElement();
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

    const handleGameStart = () => {
        setIsGameStarted(true);
        setIsGameOver(false);
        pickRandomElement();
    };

    return (
        <div>
            {!isGameFinished && !isGameOver ? (
                <div>
                    <h2>Classement du jeu</h2>
                    {isGameStarted ? (
                        currentElement ? (
                            <div>
                                <Country
                                    name={currentElement.name}
                                    onRanking={handleRanking}
                                />
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
                                {userRanking.map((element) => (
                                    <li key={element.name}>
                                        {element.name} - Classement :{" "}
                                        {element.userRank}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <h2>Dommage ! Vous avez perdu le jeu.</h2>
                    )}
                </div>
            )}
        </div>
    );
};

export default Game;
