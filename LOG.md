# Azure TTS

```js
sstartSpeakTextAsyncButton.addEventListener("click", function () {
    var speechConfig = SpeechSDK.SpeechConfig.fromSubscription("248ea9353a2949e5xxxxxxxxxx", "eastasia");
    synthesizer = new SpeechSDK.SpeechSynthesizer(speechConfig);
    let inputText = phraseDiv.value;
    synthesizer.speakTextAsync(
          inputText,
          function (result) {
            // success callback
          },
          function (err) {
            // unsuccess callback
          }
    )
})
```

TTS REST API:

https://learn.microsoft.com/zh-cn/azure/cognitive-services/speech-service/get-started-text-to-speech?pivots=programming-language-javascript&tabs=windows%2Cterminal

https://learn.microsoft.com/zh-cn/azure/cognitive-services/speech-service/get-started-text-to-speech?tabs=windows%2Cterminal&pivots=programming-language-rest


# MediaRecorder 

document: https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder

github: https://github.com/mdn/dom-examples/tree/main/media/web-dictaphone

demo: https://mdn.github.io/dom-examples/media/web-dictaphone/
