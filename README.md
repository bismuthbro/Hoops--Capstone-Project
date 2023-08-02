REQUIREMENTS:
You will need to install Mongodb Atlas. This is the only real requirement apart from a browser and terminal.


HOW TO RUN HOOPS:

To run hoops simply open the folder this README file is located in with visual studio code and open two terminals.
With one terminal type 'cd backend' and press enter. Then type 'node server.js' and press enter to start the backend server.
With the other terminal type 'cd frontend' and press enter. Then type 'npm run dev' and press enter to start the front end. 
Then hold ctrl and click the link which appears in the frontend terminal or alternatively navigate to http://localhost:5173/ in your browser.

USING HOOPS:
You can either import the test data found in the Test Data folder into mongoDB compass or delete it and create your own using hoops.
Upon opening the website you will be met with the login/signup screen. You can login with a test account or create your own account. 
When creating an account you will need an image file to upload.
After logging in or signing up you will be taken to the court search screen, select a court to search from or go to add game to add a new game or court.
After searching for a game the available games at the selected court will be displayed, click join game to join one of them.
On the game display screen hover your mouse over one of the attending players to see their image and number of MVPs.
After clicking add game from the court search screen you can either fill out the form to create a game and click create game or click add court to add a new court to Hoops.
After clicking add court you will be taken to a form where you can add a new court, you will need the image address of an image for the court.
After clicking filling out the add court form and clicking add court you will be taken back the the create game screen and can use the newly added court to create a game.
After filling out the create game form and clicking create game you will be displayed the available games including your new game at the court you selected to create a game at.
If the user you log in with was attending a game of which the date has already passed and the logging in user was not the only player you will be prompted to vote for the MVP of that game.
After selecting your MVP click vote and you will be redirected to the court search screen.

NOTES:
The forward and back functions of your browser will work but refreshing the page will reset react context and log out the currently logged in user.
