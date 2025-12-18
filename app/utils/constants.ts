import type { Question } from '~/types'

export const STORAGE_KEY = "horizon_compliance_save";
export const TOTAL_CASES = 40;
export const QUIZ_CASE_COUNT = 9;
export const ITEM_CASE_COUNT = 2; // Increased slightly for better distribution
export const QUIZ_TIMEOUT_SECONDS = 15;


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
  {
    category: "Mise en situation",
    q: "Quelle est la meilleure réponse ?",
    o: [
      "Oui, si c'est pour l'école",
      "Non, c'est un détournement de finalité",
      "Seulement par mail",
    ],
    c: 1,
  },
  {
    category: "Mise en situation",
    q: "Un employé perd une clé USB non chiffrée contenant des noms de clients. Que faire ?",
    o: [
      "Ignorer si la clé n'a pas de valeur marchande",
      "Signaler la violation à la CNIL sous 72h si le risque est élevé",
      "Changer simplement les mots de passe de l'entreprise",
    ],
    c: 1,
  },
  {
    category: "Mise en situation",
    q: "Un client demande la suppression de ses données (Droit à l'oubli). Quelle est votre action ?",
    o: [
      "Tout supprimer immédiatement, y compris les factures légales",
      "Supprimer les données marketing mais garder les obligations légales",
      "Lui dire que c'est impossible pour des raisons techniques",
    ],
    c: 1,
  },
  {
    category: "Mise en situation",
    q: "Pour l'inscription à une newsletter, comment doit être la case de consentement ?",
    o: [
      "Pré-cochée pour faciliter l'expérience utilisateur",
      "Décochée par défaut (Opt-in actif)",
      "Cachée dans les conditions générales de vente",
    ],
    c: 1,
  },
  {
    category: "Mise en situation",
    q: "Un collègue vous demande vos identifiants pour dépanner un client en votre absence :",
    o: [
      "Vous lui donnez, c'est l'esprit d'équipe",
      "Vous refusez, les accès doivent être personnels et uniques",
      "Vous les notez sur un post-it sur votre écran",
    ],
    c: 1,
  },
  {
    category: "Mise en situation",
    q: "Vous travaillez dans un café public sur des dossiers confidentiels. Quelle précaution prendre ?",
    o: [
      "Utiliser un filtre de confidentialité et un VPN",
      "Se connecter au Wi-Fi public sans protection",
      "Laisser l'ordinateur ouvert pendant que vous allez chercher un café",
    ],
    c: 0,
  },
  {
    category: "Mise en situation",
    q: "Vous créez un formulaire de contact. Quelles données collectez-vous ?",
    o: [
      "Le maximum d'infos pour mieux connaître le prospect",
      "Uniquement le nom et l'email (Minimisation)",
      "Le nom, l'adresse, l'âge et les opinions politiques",
    ],
    c: 1,
  },
  {
    category: "Mise en situation",
    q: "Un stagiaire veut utiliser son compte Dropbox personnel pour stocker des fichiers clients :",
    o: [
      "C'est autorisé si c'est plus rapide que le serveur interne",
      "C'est interdit pour des raisons de sécurité et de contrôle (Shadow IT)",
      "C'est autorisé s'il partage le mot de passe avec vous",
    ],
    c: 1,
  },
  {
    category: "Mise en situation",
    q: "Vous recevez un mail d'un 'fournisseur' demandant un virement urgent sur un nouveau RIB :",
    o: [
      "Vous payez immédiatement pour éviter les pénalités",
      "Vous appelez le fournisseur via un numéro connu pour vérifier",
      "Vous répondez au mail pour demander si c'est bien vrai",
    ],
    c: 1,
  },
  {
    category: "Mise en situation",
    q: "L'entreprise souhaite installer des caméras pour surveiller la productivité des salariés :",
    o: [
      "C'est légal si les salariés sont prévenus",
      "C'est illégal, on ne peut pas filmer un poste de travail en continu",
      "C'est obligatoire pour la sécurité incendie",
    ],
    c: 1,
  },
  {
    category: "Mise en situation",
    q: "Vous devez envoyer un fichier contenant 5000 emails clients à un partenaire :",
    o: [
      "Vous l'envoyez en pièce jointe simple par email",
      "Vous envoyez un lien de téléchargement sécurisé et chiffré",
      "Vous publiez le fichier sur un groupe WhatsApp public",
    ],
    c: 1,
  },


];
