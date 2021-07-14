import './main.css';
import Chat from 'twitch-chat-emotes';

// a default array of twitch channels to join
let channels = ['MOONMOON'];

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

var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

// var foreground = new Image();
// foreground.src = "https://github.com/jafrizzell/moon_intro/blob/main/src/mug_overlay.png?raw=true";
// var lampOverlay = new Image();
// lampOverlay.src = "https://github.com/jafrizzell/moon_intro/blob/main/src/lamp.png?raw=true";



let lastFrame = Date.now();
// Called once per frame
function draw() {
    window.requestAnimationFrame(draw);

    // number of seconds since the last frame was drawn
    const delta = (Date.now() - lastFrame) / 1000;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let o = emoteArray.length - 1; o >= 0; o--) {
        const emoteGroup = emoteArray[o];
        
        if (emoteArray.length > 1) {
            // Keep track of where we should be drawing the next emote per message
            let xOffset = 0;
            
            for (let i = 0; i < emoteGroup.emotes.length; i++) {
                const emote = emoteGroup.emotes[i];
                
                if (i>0) { 
                    const prev_emote_spawn = emoteGroup.emotes[i-1].spawn;
                    
                    if (emoteGroup.spawn - prev_emote_spawn > 2000) {
                        xOffset = emote.gif.canvas.width;
                        emoteGroup.x -= delta * 20;
                        ctx.drawImage(emote.gif.canvas, xOffset + emoteGroup.x, emoteGroup.y, 56, 56);
                    }
                  
                }

            }
            
        }

        
        // Delete a group when it reaches the left side of the scrawler
        if (emoteGroup.x < canvas.width * 0.3) {
            emoteArray.splice(o, 1);
        }
    }
//     ctx.drawImage(lampOverlay, 0, 0, canvas.width, canvas.height);
//     ctx.drawImage(foreground, 0, 0, canvas.width, canvas.height);
    lastFrame = Date.now();
}

// add a callback function for when a new message with emotes is sent
const emoteArray = [];
ChatInstance.on("emotes", (emotes) => {
    if (emotes[0].id == 'NaM' || emotes[0].id == 'FishMoley') {}
    else {
        const type = Math.floor(Math.random() * 100);
        if (type < 70) {
            const obs = 0;
            const yVal = canvas.height * 0.5;
        }
        else {
            const obs = 1;
            const yVal = canvas.height * 0.6;
        }
        emoteArray.push({
            emotes,
            x: canvas.width * 0.7,
            y: yVal,
            obstacle: 0,
            spawn: Date.now()
        })
    }
})

draw();
