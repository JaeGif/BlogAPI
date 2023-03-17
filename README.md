# Totally Not Instagram

This page is a Front-End for an instagram clone calling a RESTful API also made by myself.

The purpose of this site is to practice my skills, learning about RESTful API's and JWT's in particular, as well as pick up a few new technologies along the way.

API src can be found here : [Api Src Repo](https://github.com/JaeGif/RESTful_API)
Live: [Site here](jaegif.github.io/BlogAPI/)

Run Locally:
`$ git clone https://github.com/JaeGif/BlogAPI.git`
To clone the source.
`$ npm i`
To install dependencies

If you were to run at the moment you would notice the API and PATH vars are not set. Create a .env file
`$ touch .env`
Copy and paste the following enviroment variables to the .env file and save.
```
VITE_BASE_PATH = /BlogAPI
VITE_RAILWAY_URL = https://instaapi-production.up.railway.app
```
Finally, run the project: `$ npx vite`

The project is most likely available on http://localhost:5173/BlogAPI/.

## Current Features

Totally Not Instagram showcases many of the same features that Instagram itself uses. While Stories and Discover are nowhere to be found you may be pleasantly surprised to see that the core functionalities are there.

Fully Implemented Feautures:

- mp4, png, jpg, and jpeg file support.
- Content carousels.
- User pages, including editable user information and stats for each user.
- A Follow system
- Users are only shown posts by people that they follow and themselves.
- Instagram filters
- Suggested users (mildly smart suggestions)
- User Auth handled by passport.js
- RESTful API, fully secured using JWT's
- Notifications
- Likes (Including the infamous double tap to like)
- Commenting
- New posts (up to 10 pieces of content per post)
- Post options, the ability to remove individual pieces of content from a post and edit other selections.
- Infinite Scroll (provided there is are more posts to see)
- Responsive\*

Technologies used for this project:

- React
- Express
- React Query (Tanstack)
- React Intersection Observer
- Mongoose (Mongo DB ORM)
- Passport.js
- Multer & Sharp

Filters courtesy of ...
Instagram.css v0.1.4 | MIT License | github.com/picturepan2/instagram.css

- Everything is responsive up to a large laptop size. Because some JS and JSX features require the inner window dimensions to be fully responsive, you may have to refresh the page at the size you are evaluating if you are using dev tools to gauge responsiveness. I decided this is an appropriate tradeoff as nearly all normal users would interact with the site in a set window and not expand or shrink the window.
