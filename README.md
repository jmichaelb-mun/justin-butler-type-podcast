# The Type Podcast

## Overview

The Type Podcast is a mini game that quizzes the player on their knowledge of the pokemon type chart. Players will be given a type that they currently are on a particular level. In the level the player will be given 3 type options, they must choose the type that they will deal the most damage against or that they are super effective against. For example if the players current type is fire and the options are Grass, Water and Electric the player will earn points for selecting grass and lose HP if they select one of the other options.

### Instructions

To start the game create a .env file within the type-podcast-server folder with the lines:

```

PORT=8080
EXTERNAL_LINK="https://pokeapi.co/api/v2/type/"

 ```

Then within the console first cd into type-podcast-server and run ``` node --watch server.js ```
next cd to the folder type-podcast-client and run ``` npm run dev ```
at which point you can open the game in your browser at the link returned in your console after running npm run dev.

### Problem Space

My problem space is that the pokemon typechart has become convoluted as time has gone on and new types and type combos have been added. So I want to make a little mini game to quickly test your knowledge without having to play through entire games and encounter every pokemon so that they don't feel as if they've been thrown into the deepend when returning to play.

### User Profile

I would say anyone interested in pokemon, but more specifically players new to the series or returning players who haven't played since some of the earlier games as they're not as well practiced as to all the type matchups in the games.

### Features

- Get a random type for the player on rendering the level
- Get types that the player is super effective, neutral, not very effective or immune against while attacking.
- Check if the choice the user makes is correct or incorrect.
- Lives for the player so they don't lose on 1 incorrect answer.
- Home Screen with Play and High Scores options.
- High Scores Screen that displays around 5 top scores with the players name

## Implementation

### APIs

- PokeAPI

### Sitemap

- Home Page
- In-game level
- in-game Pause
- victory screen
- defeat screen
- high scores page


## Future Implementations

- Implement ability to handle dual types for the player to more closely simulate pokemon
- Settings menu with custom keybinds and audio settings
- Utilize pokemon sprites to better help visualize what pokemon are which types while they play
- User accounts and authentication
- Scoring system with multiplier for consecutive correct answers.
