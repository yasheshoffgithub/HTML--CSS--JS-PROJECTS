document.addEventListener('DOMContentLoaded', function() {
    var audio = new Audio('sound.mp3');
    audio.loop = true;

    // Attempt to play the audio
    var playPromise = audio.play();

    // If autoplay is prevented, show a message
    if (playPromise !== undefined) {
        playPromise.catch(function(error) {
            // Autoplay was prevented, show a message
            var message = document.createElement('div');
            message.textContent = "Click anywhere on the page to enable audio playback.";
            message.style.color = "white";
            message.style.backgroundColor = "black";
            message.style.position = "fixed";
            message.style.top = "10px";
            message.style.left = "10px";
            message.style.padding = "10px";
            message.style.zIndex = "9999";
            document.body.appendChild(message);

            // Add event listener to enable audio on user interaction
            document.body.addEventListener('click', function() {
                audio.play().catch(function(error) {
                    console.error("Autoplay still prevented:", error);
                });
                // Remove the message
                document.body.removeChild(message);
            }, { once: true }); // The event listener is removed after being triggered once
        });
    }
});
