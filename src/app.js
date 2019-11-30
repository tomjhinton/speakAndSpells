import * as tf from '@tensorflow/tfjs'
import * as speechCommands from '@tensorflow-models/speech-commands'
import '@babel/polyfill'
import wordsToNumbers from 'words-to-numbers'
import Typed from 'typed.js'

// When calling `create()`, you must provide the type of the audio input.
// The two available options are `BROWSER_FFT` and `SOFT_FFT`.
// - BROWSER_FFT uses the browser's native Fourier transform.
// - SOFT_FFT uses JavaScript implementations of Fourier transform
//   (not implemented yet).
const recognizer = speechCommands.create('BROWSER_FFT')
const saidDiv = document.getElementById('saidDiv')
// Make sure that the underlying model and metadata are loaded via HTTPS
// requests.
let words = []
async function loadModel(){
  await recognizer.ensureModelLoaded()
  await setInterval(update,  100)
  // See the array of words that the recognizer is trained to recognize.
  console.log(recognizer.wordLabels())
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
    //console.log(result.scores)
    result.scores.map( x  =>{
      // console.log(words)
      if(x === 1){
        // console.log(words[result.scores.indexOf(x)])
        saidDiv.innerHTML = words[result.scores.indexOf(x)]
      }
    })

  }, {
    includeSpectrogram: true,
    probabilityThreshold: 0.75
  })
  recognizer.listen()
  // Stop the recognition in 10 seconds.
  setTimeout(() => recognizer.stopListening(), 10e3)

}

loadModel()



import './style.scss'
const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')
const scoreDiv = document.getElementById('score')
const highScoreDiv = document.getElementById('highScore')
const rules = document.getElementById('rules')
var options = {
  strings: ['First sentence.', 'Fit the block through the gap. Move it by speaking.',' You can move it up, down, left or right.', 'Increase the speed to score more points.'],
  typeSpeed: 40,
  showCursor: false
}

var typed = new Typed(rules, options)




document.addEventListener('keydown', function (e) {



  if(e.keyCode===82){
    if(score > highScore){
      highScore = score
    }

    speed =  1
    score = 0
    playing = true
    saidDiv.innerHTML = 'speakAndSpells'
    wall.posX= canvas.width-10
    wall.gap = Math.ceil(Math.random()*  230)

  }


})



let speed = 1
let score = 0
let highScore = 0
scoreDiv.innerHTML = score
highScoreDiv.innerHTML = highScore

const player = {
  posX: 200,
  posY: 200,
  size: 40


}

const wall ={
  posX: canvas.width-10,
  posY: 0,
  height: canvas.height,
  gap: Math.ceil(Math.random()*  230)

}
console.log(wall.gap)

for(let i=0;i<10;i++){
  console.log(Math.ceil(Math.random()*  230))
}
let playing = true
ctx.clearRect(0, 0, canvas.width, canvas.height)
ctx.globalAlpha = 0.2
ctx.fillStyle = 'green'
ctx.fillRect(player.posX, player.posY, player.size, player.size)
ctx.globalAlpha = 0.7
ctx.fillStyle = 'blue'
ctx.fillRect(wall.posX, wall.posY, 10, wall.gap)
ctx.fillRect(wall.posX, 0+wall.gap +60 , 10, canvas.height)

function  update(){
  scoreDiv.innerHTML = score
  highScoreDiv.innerHTML = highScore
  if(!isNaN(wordsToNumbers(saidDiv.innerHTML))){
    speed = wordsToNumbers(saidDiv.innerHTML)
  }
  if(playing){
    wall.posX-=speed
    if(saidDiv.innerHTML === 'left'){
      if(player.posX>0){
        player.posX -=speed
      }

    }

    if(saidDiv.innerHTML === 'right'){
      if(player.posX<canvas.width-player.size){
        player.posX += speed
      }

    }

    if(saidDiv.innerHTML === 'up'){
      if(player.posY > 0){
        player.posY -= speed
      }

    }

    if(saidDiv.innerHTML === 'down'){
      if(player.posY<canvas.height-player.size){
        player.posY += speed
      }

    }

  }

  if(player.posX > wall.posX && player.posY > wall.gap && player.posY < wall.gap+60){
    score+= speed
    wall.posX = canvas.width-10
    wall.gap = Math.ceil(Math.random()*  230)

  }
  if(player.posX > (wall.posX-40) && player.posY < wall.gap ||player.posX > (wall.posX-40) &&  player.posY > wall.gap+60){
    playing = false
    saidDiv.innerHTML = 'R TO RESET'


  }

  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.globalAlpha = 0.2
  ctx.fillStyle = 'green'
  ctx.fillRect(player.posX, player.posY, player.size, player.size)
  ctx.globalAlpha = 0.7
  ctx.fillStyle = 'blue'
  ctx.fillRect(wall.posX, wall.posY, 10, wall.gap)
  ctx.fillRect(wall.posX, 0+wall.gap +60 , 10, canvas.height)


}
