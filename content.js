console.log('👨‍💻 Author: Saurav Hathi \n🌟 GitHub: https://github.com/sauravhathi');

if (window.location.href.includes("https://lpu.codetantra.com/secure/topic-details1")) {
    const myModal = document.getElementById("myModal");

    const waitForModalToShow = () => {
        return new Promise((resolve) => {
            const checkModal = () => {
                const isModalShown = myModal.getAttribute("aria-modal") === "true";
                if (isModalShown) {
                    resolve();
                } else {
                    setTimeout(checkModal, 100);
                }
            };
            checkModal();
        });
    };

    waitForModalToShow()
        .then(() => {
            console.log("Modal shown!");
            const ctButtonBar = document.querySelector('div#ct-button-bar div#buttonsDiv');

            const createButton = (innerText, title, clickHandler) => {
                const button = document.createElement("span");
                button.classList.add("btn", "btn-outline-info", "btn-sm", "mx-1");
                button.setAttribute("type", "button");
                button.setAttribute("title", title);
                button.innerText = innerText;
                button.addEventListener("click", clickHandler);
                return button;
            };

            const copy = (text, successMessage) => {
                navigator.clipboard.writeText(text);
                console.log(successMessage);
            };

            const copyCodeButton = createButton("Copy 🧑‍💻", "Click to copy your code", () => {
                try {
                    const labelElement = document.querySelector('div.toggle.btn.btn-xs');
                    if (labelElement.classList.contains('btn-primary')) {
                        labelElement.click();
                    }

                    setTimeout(() => {
                        const code = document.querySelector('div.ace_layer.ace_text-layer');
                        const codeText = code.innerText;
                        copy(codeText, "Code copied successfully!");
                    }, 1);
                } catch (error) {
                    console.error(error);
                    alert("Error copying code!");
                }
            });

            const copyQuestionButton = createButton("Copy 📝", "Click to copy question", () => {
                try {
                    const question = document.getElementById('questionInfoDiv');
                    copy(question.innerText, "Question copied successfully!");
                } catch (error) {
                    console.error(error);
                    alert("Error copying question!");
                }
            });

            ctButtonBar.insertBefore(copyCodeButton, ctButtonBar.firstChild);
            ctButtonBar.insertBefore(copyQuestionButton, ctButtonBar.firstChild);
        });
}