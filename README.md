# FlashLearn:

#### <a href="https://flashlearn-app.netlify.app/" target="_blank">Launch FlashLearn</a>

<a href="https://teronbullock.com/project/flashcard-study-app/" target="_blank" aria-label="Go to FlashLearn project page on teronbullock.com">
<img src="https://github.com/Teronbullock/myImages/blob/main/gif/flashlearn-demo.gif?raw=true" width="100%" alt="Gif of the FlashLearn app"/>
</a>

Platform to help retain knowledge a easy. FlashLearn helps make your study sessions a success!

## Tech used: <img alt="Static Badge" src="https://img.shields.io/badge/React-0B62A4?style=flat&logo=React&logoColor=black&labelColor=white"> <img alt="Static Badge" src="https://img.shields.io/badge/Express.js-0B62A4?style=flat&logo=Express&logoColor=black&labelColor=white"> <img alt="Static Badge" src="https://img.shields.io/badge/Node.js-0B62A4?style=flat&logo=Node.js&logoColor=black&labelColor=white"> <img alt="Static Badge" src="https://img.shields.io/badge/JavaScript (ES6+)-0B62A4?style=flat&logo=JavaScript&logoColor=black&labelColor=white"> <img alt="Static Badge" src="https://img.shields.io/badge/TypeScript-0B62A4?style=flat&logo=TypeScript&logoColor=black&labelColor=white"> <img alt="Static Badge" src="https://img.shields.io/badge/PostgreSQL-0B62A4?style=flat&logo=PostgreSQL&logoColor=black&labelColor=white"> <img alt="Static Badge" src="https://img.shields.io/badge/Sequelize-0B62A4?style=flat&logo=Sequelize&logoColor=black&labelColor=white"> <img alt="Static Badge" src="https://img.shields.io/badge/Tailwind CSS-0B62A4?style=flat&logo=TailWindcss&logoColor=black&labelColor=white"> <img alt="Static Badge" src="https://img.shields.io/badge/SASS-0B62A4?style=flat&logo=SASS&logoColor=black&labelColor=white"> <img alt="Static Badge" src="https://img.shields.io/badge/JWT-0B62A4?style=flat&logo=JSON Web Tokens&logoColor=black&labelColor=white">

## Optimizations

One of the first things I would optimize is adding a password reset flow. Right now, users can't reset their passwords. I would also add an AI driven feature for smart spaced repetition. The app would calculate the best review times based on user accuracy. So if a user struggled with a card, the AI would schedule it to reoccur sooner.

## Lessons Learned

Built the backend with **Express.js** **Node** and **PostgreSQL**, reinforcing my understanding of **RESTful API design** and **full-stack architecture**. 

Through this, I learned how to **securely implement authentication with JWT**, structure a **modular and scalable backend**, and leverage **TypeScript** for type safety across both frontend and backend.

## Installation

1. Clone repo
2. run `npm install` then, run `npm run install:all`
3. add a .env and with the info from the .env-sample
4. replace the sample info in your .env file with your info.

#### Main lines to change in the .env file:

##### Client
- VITE_DEV_API_URL=

##### Server
- DATABASE_URL=
- JWT_SECRET=
- REFRESH_TOKEN_SECRET=
- SERVER_DEV_PORT=

## Usage

1. run `npm run dev`
2. Navigate to `http://localhost:5173`

## More Projects

<table bordercolor="#0B62A4">
  <tr>
    <td width="50%"  style="align:center;" valign="top">
      <a target="_blank" href="https://github.com/Teronbullock/ClearCast">ClearCast</a>
      <br />
      <a target="_blank" href="https://github.com/Teronbullock/myImages/blob/main/gif/clearcast-demo.gif">
        <img src="https://github.com/Teronbullock/myImages/blob/main/gif/clearcast-demo.gif?raw=true" width="100%"  alt="ClearCast"/>
      </a>
    </td>
    <td width="50%" valign="top">
      <a target="_blank" href="https://github.com/Teronbullock/teronbullock-theme">Portfolio</a>
      <br />
      <a target="_blank" href="https://github.com/Teronbullock/teronbullock-theme">
        <img src="https://github.com/Teronbullock/myImages/raw/main/gif/teronbullock-demo.gif" width="100%" alt="Portfolio"/>
      </a>
    </td>
  </tr>
</table>