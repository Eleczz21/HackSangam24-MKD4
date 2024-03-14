document.addEventListener("DOMContentLoaded", function() {
    const postForm = document.getElementById("post-form");
    const answerForm = document.getElementById("answer-form");
    const answersList = document.querySelector(".thread-answers ul");

    postForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const title = document.getElementById("thread-title").value;
        const content = document.getElementById("thread-content").value;

        // Add new thread to the Latest Threads section
        const latestThreadsList = document.querySelector(".latest-threads ul");
        const newThreadItem = document.createElement("li");
        const newThreadLink = document.createElement("a");
        newThreadLink.href = "#";
        newThreadLink.textContent = title;
        newThreadItem.appendChild(newThreadLink);
        latestThreadsList.appendChild(newThreadItem);

        // Clear the post form
        postForm.reset();
    });

    answerForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const answerContent = document.getElementById("answer-content").value;

        // Create a new answer element
        const newAnswerItem = document.createElement("li");
        const newAnswerContent = document.createElement("p");
        newAnswerContent.textContent = answerContent;
        newAnswerItem.appendChild(newAnswerContent);
        answersList.appendChild(newAnswerItem);

        // Clear the answer form
        answerForm.reset();
    });
});
