// Language messages
const langMessages = {
  vi: {
    addUsage: 'Sử dụng: samir add YourQuestionHere => YourAnswerHere',
    updateUsage: 'Sử dụng: samir update ExistingQuestion => NewAnswerHere',
    deleteUsage: 'Sử dụng: samir delete YourQuestionHere',
    invalidCommand: 'Lệnh không hợp lệ. Sử dụng: samir [add|update|delete] ...',
  },
  en: {
    addUsage: 'Usage: samir add YourQuestionHere => YourAnswerHere',
    updateUsage: 'Usage: samir update ExistingQuestion => NewAnswerHere',
    deleteUsage: 'Usage: samir delete YourQuestionHere',
    invalidCommand: 'Invalid command. Usage: samir [add|update|delete] ...',
  },
};

// Default language
const defaultLang = 'en';

// Function to retrieve language-specific messages
function getLang(lang, key) {
  // If the requested language is not available, use the default language
  if (!langMessages[lang]) {
    lang = defaultLang;
  }

  // If the key is not found in the selected language, use the default language
  if (!langMessages[lang][key]) {
    lang = defaultLang;
  }

  return langMessages[lang][key];
}

module.exports = {
  getLang,
};
