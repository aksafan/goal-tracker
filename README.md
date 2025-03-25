# Goal Tracker

This will be the API for the front-end React app part of our practicum project.

These instructions are for the **front-end team** so they can setup their local development environment to run
both the back-end server and their front-end app.

> The back-end server will be running on port 8000. The front-end app will be running on port 5173. You will need to run
> both the back-end server and the front-end app at the same time to test your app.

### Setting up local development environment

1. Create a folder to contain both the front-end and back-end repos
2. Clone this repository to that folder
3. Create `.env` file in the root of backend folder (you can copy from `.env.example` and set it with your vars)
4. Run `npm install` to install dependencies inside backend directory
5. Run `npm run dev` to start the development server
6. Open http://localhost:8000/api/v1/ with your browser to test
7. Your back-end server is now running. You can now run the front-end app
8. Swagger API Docs are available at http://localhost:8000/docs (json format at http://localhost:8000/docs.json)

> N.B. Start every coding session with pulling `main` branch of this repository.

#### Running the back-end server in Visual Studio Code

Note: In the below example, the group's front-end repository was named `bb-practicum-team1-front` and the back-end
repository was named `bb-practicum-team-1-back`. Your repository will have a different name, but the rest should look
the same.
![vsc running](docs/images/back-end-running-vsc.png)

#### Testing the back-end server API in the browser

![browser server](docs/images/back-end-running-browser.png)

#### To build TS into JS (production ready)

`npm run build` and then you can run `npm run start`

#### Running ESLint

`npm run lint` - to check everything.
`npm run lint:fix` - to fix everything.

#### Running Prettier

`npm run prettier:write` - to format everything.
