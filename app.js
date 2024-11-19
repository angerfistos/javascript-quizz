/* -------------------------------------------------------------------------- */
/*                      1.  Declarer les valeurs globales                     */
/* -------------------------------------------------------------------------- */

const responses = ["c", "a", "b", "a", "c"]; // Lettres des bonnes réponses
const correctAnswers = [
  "Napoléon Bonaparte", // Bonne réponse pour la question 1
  "4 juillet 1776",     // Bonne réponse pour la question 2
  "476 ap. J.-C.",      // Bonne réponse pour la question 3
  "Ljubljana",          // Bonne réponse pour la question 4
  "4,9 Millions"        // Bonne réponse pour la question 5
]; // Bonnes réponses textuelles
const emojis = ["✔️", "✨", "👀", "😭", "👎"]; // Emojis pour le feedback

// Récupérer les questions
const questions = document.querySelectorAll(".question");

// Récupérer les éléments du DOM nécessaires
const resultMessage = document.querySelector("p"); // Paragraphe pour afficher le résultat
const validateButton = document.querySelector(".btn-validate"); // Bouton pour valider
const resetButton = document.querySelector(".btn-reset"); // Bouton pour réinitialiser


/* -------------------------------------------------------------------------- */
/*                        2.    Déclarer les functions                        */
/* -------------------------------------------------------------------------- */

// 2. Tester les résultats et afficher les bonnes réponses
function valider() {
  let score = 0; // Initialise le score à 0

  // Parcourt toutes les questions
  questions.forEach((question, index) => {
    const selectedInput = question.querySelector("input:checked"); // Trouve la réponse sélectionnée

    if (selectedInput) {
      // Vérifie si la réponse est correcte
      if (selectedInput.value === correctAnswers[index]) {
        score++; // Bonne réponse : incrémente le score
        question.classList.add("bg-green-200"); // Ajoute une couleur verte
      } else {
        question.classList.add("bg-red-200"); // Ajoute une couleur rouge
        afficherBonneReponse(question, correctAnswers[index]); // Affiche la bonne réponse
      }
    } else {
      question.classList.add("bg-yellow-200"); // Absence de réponse : jaune
      afficherBonneReponse(question, correctAnswers[index]); // Affiche la bonne réponse
    }
  });

  // Afficher le score final
  afficherResultat(score);
}

// Fonction pour afficher la bonne réponse
function afficherBonneReponse(question, correctAnswer) {
  const correctAnswerElement = document.createElement("p");
  correctAnswerElement.textContent = `Bonne réponse : ${correctAnswer}`;
  correctAnswerElement.classList.add("text-blue-500", "mt-2"); // Style Tailwind
}

// Fonction pour afficher le message de résultat
function afficherResultat(score) {
  if (score === questions.length) {
    resultMessage.textContent = `🎉 Félicitations ! Score parfait : ${score}/${questions.length} ${emojis[0]}`;
  } else if (score > questions.length / 2) {
    resultMessage.textContent = `👌 Bien joué ! Votre score : ${score}/${questions.length} ${emojis[1]}`;
  } else {
    resultMessage.textContent = `😔 Essayez encore. Votre score : ${score}/${questions.length} ${emojis[4]}`;
  }
}

// Fonction pour réinitialiser le quiz
function reset() {
  questions.forEach((question) => {
    question.classList.remove("bg-green-200", "bg-red-200", "bg-yellow-200"); // Retire les couleurs
    const selectedInput = question.querySelector("input:checked"); // Trouve l'input sélectionné
    if (selectedInput) {
      selectedInput.checked = false; // Décoche la réponse sélectionnée
    }

    // Supprime les bonnes réponses affichées
    const correctAnswer = question.querySelector("p.text-blue-500");
    if (correctAnswer) {
      correctAnswer.remove();
    }
  });

  // Réinitialise le message de résultat
  resultMessage.textContent = `Cliquez sur Valider pour voir les résultats.`;
}

/* -------------------------------------------------------------------------- */
/*                           Gestion des événements                           */
/* -------------------------------------------------------------------------- */

validateButton.addEventListener("click", valider); // Associe le bouton Valider à la fonction valider
resetButton.addEventListener("click", resetQuiz); // Associe le bouton Recommencer à la fonction resetQuiz
