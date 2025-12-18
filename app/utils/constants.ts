import type { Question } from '~/types'

export const STORAGE_KEY = "horizon_compliance_save";
export const TOTAL_CASES = 40;
export const QUIZ_CASES = [1, 6, 11, 13, 16, 21, 26, 31, 36];
export const ITEM_CASES = [38];
export const COLORS = ["#22d3ee", "#f43f5e", "#10b981", "#f59e0b"];

export const QUESTIONS: Question[] = [
  {
    category: "DCP",
    q: "Comment définit-on une Donnée à Caractère Personnel (DCP) ?",
    o: [
      "Toute info liée à une personne identifiable",
      "Uniquement le nom et prénom",
      "Toute donnée stockée sur un cloud",
    ],
    c: 0,
  },
  {
    category: "Minimisation",
    q: "Que stipule la règle d'or sur la minimisation des données ?",
    o: [
      "Collecter un maximum 'au cas où'",
      "Ne collecter que le strict nécessaire",
      "Compresser les fichiers pour gagner de la place",
    ],
    c: 1,
  },
  {
    category: "Conservation",
    q: "Combien de temps doit-on conserver les bulletins de paie selon le cours ?",
    o: ["1 mois", "5 ans", "10 ans"],
    c: 1,
  },
  {
    category: "Sanctions",
    q: "Quel est le montant max d'une amende administrative (Niveau 2) ?",
    o: ["10 000 €", "10 M€ ou 2% du CA", "20 M€ ou 4% du CA"],
    c: 2,
  },
  {
    category: "DPO",
    q: "La nomination d'un DPO (Délégué) est-elle toujours obligatoire ?",
    o: [
      "Oui, pour toutes les entreprises",
      "Non, mais toujours conseillée",
      "Seulement pour les start-ups",
    ],
    c: 1,
  },
  {
    category: "Portabilité",
    q: "En quoi consiste le droit à la portabilité des données ?",
    o: [
      "Le droit de déplacer ses meubles",
      "Recevoir ses données pour les transmettre ailleurs",
      "Le droit de changer de mot de passe",
    ],
    c: 1,
  },
  {
    category: "Intérêt légitime",
    q: "Traiter des données sans consentement nécessite :",
    o: [
      "Une raison valable et proportionnée",
      "Une simple envie de l'entreprise",
      "L'accord oral du client",
    ],
    c: 0,
  },
  {
    category: "Finalité",
    q: "Peut-on utiliser les données scolaires pour faire de la politique ?",
    o: [
      "Oui, si c'est pour l'école",
      "Non, c'est un détournement de finalité",
      "Seulement par mail",
    ],
    c: 1,
  },
];
