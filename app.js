/* -------------------------------------------------------------------------- */
/*                      1.  Déclarer les valeurs globales                     */
/* -------------------------------------------------------------------------- */

// Les emojis pour donner un feedback visuel (parfait, correct, incorrect, etc.)
const emojisFeedback = ["✔️", "✨", "👀", "😭", "👎"];

// Les lettres des bonnes réponses (facultatif, utile pour les indices)
const reponsesAttendues = ["c", "a", "b", "a", "c"];

// Les bonnes réponses textuelles pour chaque question
const bonnesReponses = [
  "Napoléon Bonaparte", // Bonne réponse pour la question 1
  "4 juillet 1776",     // Bonne réponse pour la question 2
  "476 ap. J.-C.",      // Bonne réponse pour la question 3
  "Ljubljana",          // Bonne réponse pour la question 4
  "4,9 Millions"        // Bonne réponse pour la question 5
];

// Récupérer toutes les questions dans le DOM
const listeQuestions = document.querySelectorAll(".question");

// Récupérer les éléments spécifiques du DOM nécessaires
const messageResultat = document.querySelector("p"); // Paragraphe pour afficher le résultat final
const boutonValider = document.querySelector(".btn-validate"); // Bouton pour valider les réponses
const boutonReinitialiser = document.querySelector(".btn-reset"); // Bouton pour réinitialiser le quiz

/* -------------------------------------------------------------------------- */
/*                        2.    Déclarer les fonctions                        */
/* -------------------------------------------------------------------------- */

/**
 * Fonction principale pour valider les réponses des utilisateurs
 * - Vérifie les réponses sélectionnées
 * - Compare avec les bonnes réponses
 * - Applique des styles en fonction des résultats
 * - Affiche les bonnes réponses en cas d'erreur
 */
function validerQuiz() {
  let scoreTotal = 0; // Initialise le score total à 0

  // Parcourt chaque question
  listeQuestions.forEach((question, index) => {
    // Trouver la réponse sélectionnée pour cette question
    const reponseSelectionnee = question.querySelector("input:checked");

    // Si une réponse est sélectionnée
    if (reponseSelectionnee) {
      // Comparer la réponse sélectionnée avec la bonne réponse
      if (reponseSelectionnee.value === bonnesReponses[index]) {
        scoreTotal++; // Bonne réponse : incrémenter le score
        question.classList.add("bg-green-200"); // Appliquer une couleur verte pour signaler le succès
      } else {
        question.classList.add("bg-red-200"); // Appliquer une couleur rouge pour signaler une erreur
        afficherBonneReponse(question, bonnesReponses[index]); // Afficher la bonne réponse
      }
    } else {
      // Si aucune réponse n'est sélectionnée
      question.classList.add("bg-yellow-200"); // Appliquer une couleur jaune pour signaler une absence de réponse
      afficherBonneReponse(question, bonnesReponses[index]); // Afficher la bonne réponse
    }
  });

  // Afficher le message final avec le score total
  afficherResultat(scoreTotal);
}

/**
 * Affiche la bonne réponse sous la question correspondante
 * @param {HTMLElement} question - La question concernée
 * @param {string} bonneReponse - La bonne réponse à afficher
 */

function afficherBonneReponse(question, bonneReponse) {
  const elementBonneReponse = document.createElement("p"); // Crée un élément <p> pour afficher la bonne réponse
  elementBonneReponse.textContent = `Bonne réponse : ${bonneReponse}`; // Ajoute le texte de la bonne réponse
  elementBonneReponse.classList.add("text-blue-500", "mt-2"); // Applique des styles avec Tailwind CSS
  question.appendChild(elementBonneReponse); // Ajoute cet élément au conteneur de la question
}

/**
 * Affiche un message final dans le paragraphe prévu pour le résultat
 * @param {number} score - Le score total obtenu par l'utilisateur
 */

function afficherResultat(score) {
  if (score === listeQuestions.length) {
    // Score parfait
    messageResultat.textContent = `🎉 Félicitations ! Score parfait : ${score}/${listeQuestions.length} ${emojisFeedback[0]}`;
  } else if (score > listeQuestions.length / 2) {
    // Score moyen ou supérieur
    messageResultat.textContent = `👌 Bien joué ! Votre score : ${score}/${listeQuestions.length} ${emojisFeedback[1]}`;
  } else {
    // Score faible
    messageResultat.textContent = `😔 Essayez encore. Votre score : ${score}/${listeQuestions.length} ${emojisFeedback[4]}`;
  }
}

/**
 * Réinitialise le quiz pour permettre une nouvelle tentative
 * - Supprime les couleurs et les bonnes réponses affichées
 * - Réinitialise les réponses sélectionnées et le message final
 */

function reinitialiserQuiz() {
  // Réinitialiser chaque question
  listeQuestions.forEach((question) => {
    question.classList.remove("bg-green-200", "bg-red-200", "bg-yellow-200"); // Retirer toutes les couleurs
    const reponseSelectionnee = question.querySelector("input:checked"); // Trouver la réponse sélectionnée
    if (reponseSelectionnee) {
      reponseSelectionnee.checked = false; // Décoche la réponse
    }

    // Supprime les bonnes réponses affichées sous la question
    const bonneReponseAffichee = question.querySelector("p.text-blue-500");
    if (bonneReponseAffichee) {
      bonneReponseAffichee.remove();
    }
  });

  // Réinitialise le message de résultat
  messageResultat.textContent = `Cliquez sur Valider pour voir les résultats.`;
}

/* -------------------------------------------------------------------------- */
/*                           Gestion des événements                           */
/* -------------------------------------------------------------------------- */

// Associe le bouton "Valider" à la fonction validerQuiz
boutonValider.addEventListener("click", validerQuiz);

// Associe le bouton "Recommencer" à la fonction reinitialiserQuiz
boutonReinitialiser.addEventListener("click", reinitialiserQuiz);
