import Chat from 'twitch-chat-emotes';

// a default array of twitch channels to join
let channels = ['MOONMOON', 'A_Seagull', 'anny'];

// the following few lines of code will allow you to add ?channels=channel1,channel2,channel3 to the URL in order to override the default array of channels
const query_vars = {};
const query_parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
    query_vars[key] = value;
});
if (query_vars.channels) {
    channels = query_vars.channels.split(',');
}

// create our chat instance
const ChatInstance = new Chat({
    channels,
    duplicateEmoteLimit: 5,
})

const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
var ctx = canvas.querySelector("canvas").getContext('2d'),
      baseImage = new Image;

function resize() {

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();


baseImage.onload = function() {
    cxt.drawImage(this, 0, 0, canvas.width, canvas.height);
    ctx.drawImage(this, 0, 0);
}
baseImage.src = 'https://github.com/jafrizzell/moon_intro/blob/main/lofi.gif?raw=true';

// ctx.globalCompositeOperation = 'destination-out';


window.addEventListener('resize', resize);


let lastFrame = Date.now();
// Called once per frame
function draw() {
    window.requestAnimationFrame(draw);

    // number of seconds since the last frame was drawn
    const delta = (Date.now() - lastFrame) / 1000;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let o = emoteArray.length - 1; o >= 0; o--) {
        const emoteGroup = emoteArray[o];

        // Keep track of where we should be drawing the next emote per message
        let xOffset = 0;

        for (let i = 0; i < emoteGroup.emotes.length; i++) {
            const emote = emoteGroup.emotes[i];
            
            if (delta < 0.5) {
                            emoteGroup.y += delta * 15; 
            }
            
            else if ( 0.5 <= delta < 2.0) {
                            emoteGroup.y += delta * 30
            }
            
            else {
                            emoteGroup.y += delta * 60
            }
            
            xOffset = emote.gif.canvas.width;
            ctx.drawImage(emote.gif.canvas, xOffset + emoteGroup.x, emoteGroup.y);
//             ctx.globalCompositeOperation = 'source-over';

        }

        // Delete a group after 10 seconds
        if (emoteGroup.spawn < Date.now() - 10000) {
            emoteArray.splice(o, 1);
        }
    }

    lastFrame = Date.now();
}

// add a callback function for when a new message with emotes is sent
const emoteArray = [];
ChatInstance.on("emotes", (emotes) => {
    emoteArray.push({
        emotes,
        x: Math.floor(Math.random() * (canvas.width - 112)),
        y: Math.floor(Math.random() * (canvas.height - 112)),
        spawn: Date.now()
    });
})

draw();
