import wordBank from "../wordle-bank.txt"

export const boardDefault = [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
]


export const generateWordSet = async () => {
    let wordSet;
    let correctWord;
    await fetch(wordBank)
    .then((response) => response.text())
    .then((result) => {
        const wordArray = result.split("\n")
        correctWord = wordArray[Math.floor(Math.random() * wordArray.length)];
        wordSet = new Set(wordArray)
    });

    return {wordSet, correctWord};
}
