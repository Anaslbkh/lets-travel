
let playSpeech = document.querySelector('.audioArticel button');
playSpeech.addEventListener('click', (e) => {
    let title = document.querySelector('.placeTile').textContent;
    let text = document.querySelector('.text').textContent;
    let speech = new SpeechSynthesisUtterance();
    speech.lang = "en-US";
    speech.text = title + text + "  thank you for your listening";
    speech.volume = 1;
    speech.rate = 1;
    speech.pitch = 1;
    window.speechSynthesis.speak(speech);

})