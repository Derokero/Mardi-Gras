// Initialize trivia, encapsulate in function to prevent external access
(function init() {

    // Check answers //
    function checkAnswers(correctAnswers) {
        // Validate required fields
        for (let i = 0; i < correctAnswers.length; i++) {
            const answer = document.getElementById("q" + i + "a0");
            if (!answer.reportValidity()) {
                setTimeout(() => answer.reportValidity(), 1000); // Display message after scroll
                return false; // Terminate on bad validity check (user didn't answer all questions)

            }
        }

        // Select all radio buttons
        const inputs = document.querySelectorAll("#triviaContent > div > input");

        // Initialize counters
        let ansIndex = 0,
            answered = 0,
            answeredCorrectly = 0;

        // Iterate through all radio buttons
        for (let i = 0; i < inputs.length; i++) {
            const input = inputs[i];

            // Set all to answered class (for CSS)
            input.nextSibling.setAttribute("class", "answered");

            // Set selected to incorrect first (for CSS)
            if (input.checked) {
                input.nextSibling.setAttribute("class", "incorrectAnswer");
                answered++; // Track questions answered
            }

            // Set correct answer class, overrides all other classes
            if (input.id === correctAnswers[ansIndex]) {
                input.nextSibling.setAttribute("class", "correctAnswer");
                ansIndex++;
                if (input.checked) { // Did the user answer correctly?
                    answeredCorrectly++;
                }
            }

            // Disable and uncheck all radio buttons
            input.setAttribute("disabled", "");
            input.checked = false;
        }

        // Display score message
        checkBtn.innerText = `You scored ${(answeredCorrectly/answered)*100}%\n (${answeredCorrectly} correct out of ${answered})`;
        checkBtn.scrollIntoView();
        return true; // Return true on success (used to remove the event listener)
    };



    // Generate trivia questions and possible answers //

    let qIndex = 0; // Question counter
    const correctAnswers = []; // Initialize correct answers array

    const triviaContent = document.getElementById("triviaContent"); // Trivia div reference

    function createQuestion(question, answers, correctAnswer) {

        // Create the trivia question DOM structure
        const qDiv = document.createElement("div");
        qDiv.setAttribute("class", "qDiv" + qIndex);

        const qHeading = document.createElement("h3");
        qHeading.innerText = question;

        qDiv.appendChild(qHeading);

        for (let ansIndex = 0; ansIndex < answers.length; ansIndex++) {
            // Radio button
            const input = document.createElement("input");
            input.setAttribute("type", "radio");
            input.setAttribute("required", "");
            input.setAttribute("name", "q" + qIndex);
            input.setAttribute("id", "q" + qIndex + "a" + ansIndex);

            // Label for the radio button
            const label = document.createElement("label");
            label.setAttribute("for", "q" + qIndex + "a" + ansIndex);
            label.innerText = answers[ansIndex]; // Insert answer from answers to label

            qDiv.appendChild(input);
            qDiv.appendChild(label);
            qDiv.appendChild(document.createElement("br"));
        }

        triviaContent.appendChild(qDiv);

        correctAnswers.push("q" + qIndex + "a" + correctAnswer); // Save correct answers to compare later

        qIndex++; // Increment question counter
    }


    // https://www.factmonster.com/take-quiz/mardigras1

    // Add questions
    createQuestion("The religious name for Mardi Gras is:", ["Shrove Tuesday", "Whitsunday", "PreLent"], 0);
    createQuestion("New Orleans and Mardi Gras are often associated with this type of music:", ["Jazz", "French folk songs", "Opera"], 0);
    createQuestion("This relatively small country features one of the largest Carnival celebrations in the world:", ["Jamaica", "Trinidad and Tobago", "Grenada"], 1);
    createQuestion("The Mardi Gras colors are:", ["Red, white and blue representing the American flag", "White and gold the colors of the French imperial navy", "Purple, green and gold in honor of the Russian royal family"], 2);
    createQuestion("\"Mardi Gras\" actually means:", ["Merry Times", "Fat Tuesday", "Spring Welcome"], 1);
    createQuestion("The young of all ages line the Mardi Gras parade route hoping to catch special coins tossed from the floats. The coins are known as:", ["Mardi Gras pennies", "Centimes", "Doubloons"], 2);
    createQuestion("In Rio de Janeiro, Brazil, the Mardi Gras celebration is known as:", ["Mardi Gras", "Brazil Day", "Carnival"], 2);
    createQuestion("King Cakes are a popular Mardi Gras tradition. Inside the cake is hidden a:", ["Plastic baby", "Silver dollar", "Treasurehunt map"], 0);
    createQuestion("In New Orleans, La., Mardi Gras celebrations are centered around this famous neighborhood:", ["Latin Quarter", "French Quarter", "Sin City"], 1);
    createQuestion("Many Mardi Gras events are organized by private clubs known as:", ["Brotherhoods", "Fraternities", "Krewes"], 2);


    // Create trivia check button
    const checkBtn = document.createElement("button");
    checkBtn.setAttribute("id", "triviaCheck");
    checkBtn.innerText = "Check Answers"
    triviaContent.appendChild(checkBtn);

    // Add event listener to button
    checkBtn.addEventListener("click", function check() {
        if (checkAnswers(correctAnswers))
            checkBtn.removeEventListener("click", check);
    });
    // DO NOT ADD MORE QUESTIONS AFTER THE SUBMIT BUTTON
})(); // Invoke