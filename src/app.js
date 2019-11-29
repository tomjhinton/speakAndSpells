import * as tf from '@tensorflow/tfjs';
import * as speechCommands from '@tensorflow-models/speech-commands';
import '@babel/polyfill'
// When calling `create()`, you must provide the type of the audio input.
// The two available options are `BROWSER_FFT` and `SOFT_FFT`.
// - BROWSER_FFT uses the browser's native Fourier transform.
// - SOFT_FFT uses JavaScript implementations of Fourier transform
//   (not implemented yet).
const recognizer = speechCommands.create('BROWSER_FFT');
let said = []
let saidDiv = document.getElementById('saidDiv')
// Make sure that the underlying model and metadata are loaded via HTTPS
// requests.
let words = []
async function loadModel(){
  await recognizer.ensureModelLoaded();

// See the array of words that the recognizer is trained to recognize.
console.log(recognizer.wordLabels());
words = recognizer.wordLabels()
// `listen()` takes two arguments:
// 1. A callback function that is invoked anytime a word is recognized.
// 2. A configuration object with adjustable fields such a
//    - includeSpectrogram
//    - probabilityThreshold
//    - includeEmbedding
recognizer.listen(result => {
  // - result.scores contains the probability scores that correspond to
  //   recognizer.wordLabels().
  // - result.spectrogram contains the spectrogram of the recognized word.
  console.log(result.scores)
  result.scores.map( x  =>{
    // console.log(words)
    if(x === 1){
      console.log(words[result.scores.indexOf(x)])
      saidDiv.innerHTML = words[result.scores.indexOf(x)]
    }
  })

}, {
  includeSpectrogram: true,
  probabilityThreshold: 0.75
});
recognizer.listen()
// Stop the recognition in 10 seconds.
setTimeout(() => recognizer.stopListening(), 10e3);
}

loadModel()




const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')


const player = {
  posX: 200,
  posY: 200,
  size: 40,

}

function  update(){

  if(saidDiv.innerHTML === 'left'){
    player.posX --

  }

  if(saidDiv.innerHTML === 'right'){
    player.posX ++

  }

  if(saidDiv.innerHTML === 'up'){
    player.posY --

  }

  if(saidDiv.innerHTML === 'down'){
    player.posY ++

  }


  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.globalAlpha = 0.2
  ctx.fillStyle = 'green'
  ctx.fillRect(player.posX, player.posY, player.size, player.size)


}



setInterval(update,  100)
