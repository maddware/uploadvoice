const recordingForm = document.querySelector('#recording-form');
const recordButton = document.querySelector('#record-btn');
const stopButton = document.querySelector('#stop-btn');
const playbackButton = document.querySelector('#playback-btn');
const recording = document.querySelector('#recording');

let chunks = [];

recordButton.addEventListener('click', (event) => {
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then((stream) => {
      mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };
      mediaRecorder.start();
      recordButton.disabled = true;
      stopButton.disabled = false;
      playbackButton.disabled = true;
    });
});

stopButton.addEventListener('click', (event) => {
  mediaRecorder.stop();
  recordButton.disabled = false;
  stopButton.disabled = true;
  playbackButton.disabled = false;
});

playbackButton.addEventListener('click', (event) => {
  const blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' });
  recording.src = URL.createObjectURL(blob);
});

recordingForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const blob = new Blob(chunks, { type: 'audio/ogg; codecs=opus' });
  const formData = new FormData();
  formData.append('recording', blob);
  fetch('/upload.php', {
    method: 'POST',
    body: formData
  })
  .then((response) => {
    console.log('Recording uploaded');
  })
  .catch((error) => {
    console.error(error);
  });
});
