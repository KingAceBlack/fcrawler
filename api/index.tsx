import { Button, Frog, TextInput } from 'frog'
import { devtools } from 'frog/dev'
import { serveStatic } from 'frog/serve-static'
// import { neynar } from 'frog/hubs'
import { handle } from 'frog/vercel'

// Uncomment to use Edge Runtime.
// export const config = {
//   runtime: 'edge',
// }

export const app = new Frog({
  assetsPath: '/',
  basePath: '/api',
  imageAspectRatio: '1:1',
  title: 'frameCrawler',
  // Supply a Hub to enable frame verification.
  // hub: neynar({ apiKey: 'NEYNAR_FROG_FM' })
})


// Define the player object
let player = {
  name: 'player',
  life: 60,
  points: 0,
  a1: 200,
  a2: 200,
  a3: 1,
  i1: 1,
  i2: 1,
  i3: 1,
  m1: 1,
  m2: 1,
  m3: 1,
 
};

// Define the enemy object
let enemy1 = {
  name: 'Enemy 1',
  life: 100,
};

// Define the enemy object
let rng = {
  name: 'rng',
  life: 2,
};

type FarcasterID = string;
type playerScore = number;

let farcasterid: FarcasterID = '20359';
let playerscore: playerScore = 0;




interface DataItem {
  fid: string;
  score: number;

  // Add other properties if there are any
}


 const validFrames: string[] = ['a1', 'a2', 'a3', 'i1', 'i2', 'i3', 'm1', 'm2', 'm3'];


// Array of image URLs with aspect ratio 1.22:1
const images = [
  { id: '1', url: '/images/base.jpg' },
  { id: '2', url: '/images/bomb.jpg' },
  { id: '3', url: '/images/red.jpg' },
  { id: '4', url: '/images/blue.jpg' },
  { id: '5', url: '/images/shock.jpg' },
  { id: '6', url: '/images/mist.jpg' },
  { id: '7', url: '/images/special.jpg' },
  { id: '8', url: '/images/usedItem.jpg' },
  { id: '9', url: '/images/noItem.jpg' },
  { id: '10', url: '/images/wrongInput.jpg' },
  { id: '11', url: '/images/action.jpg' },

];



app.frame('/', (c) => {
    let image;
    let intents;

    image = '/main.jpg',
    intents = [
           
            <Button action="/ambush">Explore Glaumbrung</Button>,
    ];
  return c.res({
    
    image: image,
    intents: intents
  })
});

app.frame('/ambush', (c) => {
    let image;
    let intents;

    image = '/images/ambush.jpg',
    intents = [
           
            <Button action="/battle">Fight</Button>,
    ];
  return c.res({
    
    image: image,
    intents: intents
  })
});




app.frame('/battle', (c) => {
    let image;
    let intents;
    const { buttonValue, inputText, status, frameData, verified } = c;
    //addData(farcasterid, playerscore);
       
       
        image = (
          <div
              style={{
                  position: 'relative',  // Set the container to relative positioning
                  height: '100vh',
                  background: 'white',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
              }}
          >
              <img
                  src= {images[0].url}
                  alt="First Image"
                  style={{
                      width: '650px',
                      height: '650px',
                  }}
              />


            {player.a3 > 0 && (
                <img
                    src= {images[1].url}
                    alt="Second Image"
                    style={{
                        position: 'absolute',
                        width: '162px',
                        height: '84px',
                        top: `55.5%`,
                        left: `68.7%`,
                        transform: 'translate(-50%, -50%)',
                    }}
                />
              )}

              {player.i1 > 0 && (
                  <img
                    src= {images[2].url}
                    alt="third Image"
                    style={{
                        position: 'absolute',
                        width: '162px',
                        height: '84px',
                        top: `73.5%`,
                        left: `39.2%`,
                        transform: 'translate(-50%, -50%)',
                    }}
                />
              )}

              {player.i2 > 0 && (
                  <img
                    src= {images[3].url}
                    alt="fourth Image"
                    style={{
                        position: 'absolute',
                        width: '162px',
                        height: '84px',
                        top: `73.5%`,
                        left: `53.7%`,
                        transform: 'translate(-50%, -50%)',
                    }}
                />
              )}

              {player.i3 > 0 && (
                  <img
                    src= {images[3].url}
                    alt="fifth Image"
                    style={{
                        position: 'absolute',
                        width: '162px',
                        height: '84px',
                        top: `73.5%`,
                        left: `68.7%`,
                        transform: 'translate(-50%, -50%)',
                    }}
                />
              )}

              {player.m1 > 0 && (
                  <img
                    src= {images[4].url}
                    alt="sixth Image"
                    style={{
                        position: 'absolute',
                        width: '162px',
                        height: '84px',
                        top: `91.5%`,
                        left: `39.2%`,
                        transform: 'translate(-50%, -50%)',
                    }}
                />
              )}

              {player.m2 > 0 && (
                  <img
                    src= {images[5].url}
                    alt="seventh Image"
                    style={{
                        position: 'absolute',
                        width: '162px',
                        height: '84px',
                        top: `91.5%`,
                        left: `53.7%`,
                        transform: 'translate(-50%, -50%)',
                    }}
                />
              )}

              {player.m3 > 0 && (
                  <img
                    src= {images[6].url}
                    alt="eight Image"
                    style={{
                        position: 'absolute',
                        width: '162px',
                        height: '84px',
                        top: `91.5%`,
                        left: `68.7%`,
                        transform: 'translate(-50%, -50%)',
                    }}
                />
              )}

            <p
                style={{
                    position: 'absolute',
                    fontSize: '20px',
                    margin: '0',
                    color: 'red',
                    top: `3.9%`,
                    left: `28.7%`,
                    transform: 'translateX(-50%)',  // Center text horizontally
                }}
            >
                {player.life}
            </p>

            <p
                style={{
                    position: 'absolute',
                    fontSize: '20px',
                    margin: '0',
                    color: 'red',
                    top: `3.9%`,
                    left: `73%`,
                    transform: 'translateX(-50%)',  // Center text horizontally
                }}
            >
                {enemy1.life}
            </p>

          </div>
      );
        
    // Define the intents array with TextInput and conditional Button
    intents = [
      <TextInput placeholder="Select an action..." />,
      <Button action="/resolveInput">Continue</Button>,

    ];



    return c.res({
        image: image,
        intents: intents
    });
});      



app.frame('/resolveInput', async (c) => {
    let image;
    let intents;
    const { buttonValue, inputText, status, frameData, verified } = c;
    const { fid } = frameData || {};
    //farcasterid = fid !== undefined ? String(fid) : farcasterid; // Use existing farcasterid if fid is undefined
    

    // Convert inputText to lowercase for comparison
    const lowerCaseInput = inputText.toLowerCase();

    // Check if the input is valid

    if (validFrames.includes(lowerCaseInput)) {

        // Check if the player has the item

        if (player[lowerCaseInput] > 0) {

          // Item used
          player[lowerCaseInput] -= 1; // Correctly decrease the count of the used item
           

          if (["i1", "i2", "i3"].includes(lowerCaseInput)) {

            image = images[7].url;
            player.life += 5;
            console.log(player.life);

          } else if (["a1", "a2", "a3"].includes(lowerCaseInput)) {
            image = images[10].url;
            enemy1.life -= 5;

          } else {
            image = images[7].url;
            // Handle other cases
          }
        } else {
            // No item available
            image = images[8].url;
        }
    } else {
        // If inputText is not in validFrames, set an error image or response
        image = images[9].url;
        console.log('Invalid input!');
    }

    intents = [
        <Button action="/battle">Continue</Button>,
    ];

    return c.res({
        image: image,
        intents: intents
    });
});



/*app.frame('/battle', (c) => {
    let image;
    let intents;

    const randomIndex = 3;
    const selectedImage = images[randomIndex];

    image = (
          <div
              style={{
                  position: 'relative',  // Set the container to relative positioning
                  height: '100vh',
                  background: 'white',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
              }}
          >
              <img
                  src= {images[4 ].url}
                  alt="First Image"
                  style={{
                      width: '650px',
                      height: '650px',
                  }}
              />
        </div>
      );

  return c.res({
        image: image,
        intents: intents
  });
});*/

// @ts-ignore
const isEdgeFunction = typeof EdgeFunction !== 'undefined'
const isProduction = isEdgeFunction || import.meta.env?.MODE !== 'development'
devtools(app, isProduction ? { assetsPath: '/.frog' } : { serveStatic })

export const GET = handle(app)
export const POST = handle(app)
