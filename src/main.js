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

var canvas = document.createElement('canvas'),
    ctx = canvas.getContext('2d');
document.body.appendChild(canvas);

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

var background = new Image();
background.src = "https://raw.githubusercontent.com/jafrizzell/moon_intro/9b633227f46b3b3826c19312eacf91f793a389be/lofi.gif";
background.onload = function() {
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
}

// let lastFrame = Date.now();
// // Called once per frame
// function draw() {
//     window.requestAnimationFrame(draw);

//     // number of seconds since the last frame was drawn
//     const delta = (Date.now() - lastFrame) / 1000;

//     ctx.clearRect(0, 0, canvas.width, canvas.height);

//     for (let o = emoteArray.length - 1; o >= 0; o--) {
//         const emoteGroup = emoteArray[o];

//         // Keep track of where we should be drawing the next emote per message
//         let xOffset = 0;

//         for (let i = 0; i < emoteGroup.emotes.length; i++) {
//             const emote = emoteGroup.emotes[i];
            
//             emoteGroup.y -= (Math.random() + 1) * delta * 30; 

//             xOffset = emote.gif.canvas.width;
//             ctx.drawImage(emote.gif.canvas, xOffset + emoteGroup.x, emoteGroup.y);
// //             ctx.globalCompositeOperation = 'source-over';

//         }

//         // Delete a group after 10 seconds
//         if (emoteGroup.spawn < Date.now() - 10000) {
//             emoteArray.splice(o, 1);
//         }
//     }

//     lastFrame = Date.now();
// }

// // add a callback function for when a new message with emotes is sent
// const emoteArray = [];
// ChatInstance.on("emotes", (emotes) => {
//     emoteArray.push({
//         emotes,
//         x: Math.floor(0.2 * canvas.width + Math.random() * 100),
//         y: Math.floor(0.8 * canvas.height),
//         spawn: Date.now()
//     });
// })

// draw();
