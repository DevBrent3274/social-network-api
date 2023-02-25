const usernameArray = [
  'tcruise',
  'clidell',
  'sfried',
  'jpaycheck',
  'mdutton',
  'rcotuor',
  'bjohnson',
  'abecker',
  'mhanoin',
  'wjennings',
  'janiston',
  'cthompson',
  'jsnyder',
  'msullivan',
  'jcash',
  'mscott',
  'dshrute',
  'galmes',
  'kvincent',
  'pmurphy'
];

const emailArray = [
  'topgun@gmail.com',
  'iceman@ufc.com',
  'theif@hotmail.com',
  'john@gmail.com',
  'yellowstone@hotmail.com',
  'randy@ufc.com',
  'brentjohnson3274@gamil.com',
  'adam@hotmail.com',
  'megmegs@gmail.com',
  'waylon@yahoo.com',
  'rachel@hotmail.com',
  'marky@aol.com',
  'maninblack@yahoo.com',
  'theoffice@aol.com',
  'dwight@yahoo.com',
  'garygary@aol.com',
  'kattytime@gmail.com',
  'longbeach@yahoo.com',
  'pizzatime@gmail.com',
  'thompsonville@gmail.com',
];

const thoughtArray = [
  'I have the need for speed!',
  'gonna knock you out!',
  'how much can I make off these suckers?',
  'take this job and shove it!',
  'everything we do, we do for the ranch',
  'captain america is the best',
  'I rather die on my feet then live on my knees',
  'live for today!',
  'money, money, money',
  'what was I doing again',
  'could this be the one',
  'I walk the line',
  'Hmm, how can I destroy Jim',
  'when will this class ever end',
  'green is my favorite color',
  'pizza, pizza. pizza',
  'lets go!',
  'bacon, bacon, bacon',
  'aliens are among us',
  'who am I, what am I, where am I?',
];

const reactionArray = [
  'great balls of fire!',
  'momma said',
  'that is criminal',
  'I aint working a here no more',
  'big sky country all the way!',
  'I strongly disagree',
  'I like money too!',
  'well said indeed',
  'I doubt it',
  'so the plot thinkens',
  'I would never have guessed',
  'Wow, that is amazing!',
  'alright, alright, alright!',
  'future is unclear',
  'that is a likely outcome',
  'I dont think so',
  'I love pizza!',
  'Duh, everyone knows that',
  'keep up the good work',
  'dont know, dont care',
];

// Get a random item given an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

// get random username
const getRandomUsername = () => getRandomArrItem(usernameArray);

// get random email
const getRandomEmail = () => getRandomArrItem(emailArray);

// Function to generate random thoughts that we can add to user object.
const getRandomThought = (int) => {
    const results = [];
    for (let i = 0; i < int; i++) {
      results.push({
        thoughtText: getRandomArrItem(thoughtArray),
        reactions: getRandomArrItem(reactionArray),
    
      });
    }
    console.log(results)
    return results;
  };


// Export the functions for use in seed.js
module.exports = { getRandomUsername, getRandomEmail, getRandomThought };