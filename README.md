# <a href="https://flashlearn-app.netlify.app/" target="_blank">FlashLearn</a>

<div align="center">
<a href="https://teronbullock.com/project/flashcard-study-app/" target="_blank" aria-label="Go to FlashLearn project page on teronbullock.com">
<img src="https://github.com/Teronbullock/myImages/blob/main/gif/flashlearn-demo.gif?raw=true" width="60%" alt="Gif of the FlashLearn app"/>
</a>
</div>

## <a href="https://flashlearn-app.netlify.app/" target="_blank">View FlashLearn</a>

FlashLearn is a full-stack web application built using the PERN (PostgreSQL, Express.js, React.js, Node.js) stack. This application is designed to help users create digital flashcards for retaining knowledge more efficiently. FlashLearn helps make your study sessions a success!
<br>
<br>
**Key Features:**
- Create digital flashcards with questions and answers
- Organize flashcards into decks and categories
- Search and filter flashcards
- User authentication and authorization

## Tech Stack: 
<img alt="Static Badge" src="https://img.shields.io/badge/PostgreSQL-0B62A4?style=flat&logo=PostgreSQL&logoColor=black&labelColor=white"> <img alt="Static Badge" src="https://img.shields.io/badge/React-0B62A4?style=flat&logo=React&logoColor=black&labelColor=white"> <img alt="Static Badge" src="https://img.shields.io/badge/Express.js-0B62A4?style=flat&logo=Express&logoColor=black&labelColor=white"> <img alt="Static Badge" src="https://img.shields.io/badge/Node.js-0B62A4?style=flat&logo=Node.js&logoColor=black&labelColor=white"> <img alt="Static Badge" src="https://img.shields.io/badge/JavaScript (ES6+)-0B62A4?style=flat&logo=JavaScript&logoColor=black&labelColor=white"> <img alt="Static Badge" src="https://img.shields.io/badge/TypeScript-0B62A4?style=flat&logo=TypeScript&logoColor=black&labelColor=white"> <img alt="Static Badge" src="https://img.shields.io/badge/Sequelize-0B62A4?style=flat&logo=Sequelize&logoColor=black&labelColor=white"> <img alt="Static Badge" src="https://img.shields.io/badge/Tailwind CSS-0B62A4?style=flat&logo=TailWindcss&logoColor=black&labelColor=white"> <img alt="Static Badge" src="https://img.shields.io/badge/SASS-0B62A4?style=flat&logo=SASS&logoColor=black&labelColor=white"> <img alt="Static Badge" src="https://img.shields.io/badge/JWT-0B62A4?style=flat&logo=jsonwebtokens&logoColor=black&labelColor=white">

## Optimizations

One of the first things I would optimize is adding a password reset flow. Right now, users can't reset their passwords. I would also add an AI driven feature for smart spaced repetition. The app would calculate the best review times based on user accuracy. So if a user struggled with a card, the AI would schedule it to reoccur sooner.

## Lessons Learned

Built the backend with **Express.js** **Node** and **PostgreSQL**, reinforcing my understanding of **RESTful API design** and **full-stack architecture**. 

Through this, I learned how to **securely implement authentication with JWT**, structure a **modular and scalable backend**, and leverage **TypeScript** for type safety across both frontend and backend.

## Installation
```shell
# Clone the repository
git clone https://github.com/Teronbullock/flashlearn-mern.git

# Navigate to project directory
cd flashlearn-mern

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local

# Add your API keys to .env.local
HOST='localhost'
VITE_DEV_API_URL='path-to-dev-your-api' # path to server url (don't include the protocol)
DATABASE_URL=postgres://user:pass@example.com:5432/dbname # replace user, pass, example.com, dbname with your DB info
DATABASE_DIALECT= '' # dialect of your DB (mysql, postgres, sqlite, mssql)
JWT_SECRET=jwt-secret
REFRESH_TOKEN_SECRET=refresh-secret
CORS_ORIGIN=origin-url
SERVER_DEV_PORT=server-dev-port 
```

## Usage

1. run `npm run dev`
2. Open `http://localhost:5173` to view the application.
<br>

## More Projects

<table bordercolor="#0B62A4">
  <tr>
    <td width="50%"  style="align:center;" valign="top">
      <h3><a target="_blank" href="https://github.com/Teronbullock/ClearCast">ClearCast</a></h3>
      <br />
      <a target="_blank" href="https://github.com/Teronbullock/myImages/blob/main/gif/clearcast-demo.gif">
        <img src="https://github.com/Teronbullock/myImages/blob/main/gif/clearcast-demo.gif?raw=true" width="100%"  alt="ClearCast"/>
      </a>
    </td>
    <td width="50%" valign="top">
      <h3><a target="_blank" href="https://github.com/Teronbullock/teronbullock-theme">Portfolio</a></h3>
      <br />
      <a target="_blank" href="https://github.com/Teronbullock/teronbullock-theme">
        <img src="https://github.com/Teronbullock/myImages/raw/main/gif/teronbullock-demo.gif" width="100%" alt="Portfolio"/>
      </a>
    </td>
  </tr>
</table>
