# Wiseacre-Flashcard-App
codeLouisville FSJS Student Project

To install:
First, go to the root directory of the project in terminal. Next, run ‘npm install'. You should see the node_modules folder added in the root directory. (I added Bower as a post-install via npm, so you should also see the client/lib folder popluated. If not, then run ‘bower install’).
Open a new tab in your terminal and run ‘mongod'. In the other tab run ‘npm start’. Go to http://localhost:3000 to open the application.

Enter a flashcard question and answer, along with a category tag. To test create at least 5 flashcards in total. When complete, simply click the ‘Start the Quiz’ button. 

As you add different flashcard categories, you will see them appear in a list on the left nav bar. In some browsers, after adding a new category you may need to hit the refresh button in order for it to populate. Also, it’s important to note at this time the flashcard answers are set to be case-sensitive in order to encourage proper repetition. When taking the five question quiz, the flashcard questions are asked randomly, so it is possible you may be asked the same question multiple times or even consecutively. Again, this is by design to encourage learning through repetition. 


