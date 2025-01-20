const videoElement = document.getElementById('video');
const button = document.getElementById('button');

//prompt to select media stream, pass to video element, then play
async function selectedMediaStream() {
    try {
        const mediaStream = await  navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = mediaStream;
        videoElement.onloadedmetadata = () => {
            console.log('inside selectedMediaStream func');
            videoElement.play();
        }
    } catch (error){
        //catch error here
        console.log('whoops, error here:', error);
    }
}
if(button){
button.addEventListener('click', async () => {
    //Disable Button
    button.disabled = true;
    //start Picture in Picture
    await videoElement.requestPictureInPicture();
    //reset button
    button.disabled = false;
});
}

//onLoad
selectedMediaStream();