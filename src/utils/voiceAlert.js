export function speak(message) {
  const speech = new SpeechSynthesisUtterance(message);
  speech.lang = "en-IN";
  speech.rate = 0.9;
  window.speechSynthesis.speak(speech);
}
