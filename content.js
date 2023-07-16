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

            const useToastr = (message, type = "success") => {
                const div = document.createElement("div");
                const text = document.createTextNode(message);
                div.appendChild(text);
                const styleList = [
                    "position: fixed",
                    "bottom: 1%",
                    "left: 1%",
                    "transform: translateY(100%)",
                    "padding: 1rem", ,
                    "background-color: " + (type === "success" ? "#350054" : "#ff0000"),
                    "color: " + (type === "success" ? "#fff" : "#fff"),
                    "border-radius: 0.25rem",
                    "box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5)",
                    "opacity: 0",
                    "transition: all 0.5s ease-in-out",
                    "z-index: 9999",
                ];
                div.style.cssText = styleList.join(";");
                document.body.appendChild(div);
                setTimeout(() => {
                    div.style.opacity = "1";
                    div.style.transform = "translateY(0)";
                }, 1);
                setTimeout(() => {
                    div.style.opacity = "0";
                    div.style.transform = "translateY(-100%)";
                    setTimeout(() => {
                        document.body.removeChild(div);
                    }, 500);
                }, 2000);
            };

            const copy = (text, successMessage) => {
                navigator.clipboard.writeText(text);
                useToastr(successMessage);
            };

            const copyTestCasesButton = createButton("Copy 🧪", "Click to copy test cases", () => {
                try {
                    const testCases = document.querySelector('#compilationErrorsDiv #executionResultTablesContainerDiv');
                    if (testCases === null) {
                        throw new Error("Test cases not found!");
                    }
                    const testCasesText = testCases.innerText;
                    copy(testCasesText, "Test cases copied successfully!");
                } catch (error) {
                    useToastr(error.message, "error");
                }
            });

            const copyCodeButton = createButton("Copy 🧑‍💻", "Click to copy your code", () => {
                try {
                    const labelElement = document.querySelector('div.toggle.btn.btn-xs');
                    if (labelElement.classList.contains('btn-primary')) {
                        labelElement.click();
                    }

                    const code = document.querySelector('div.tab-content div.tab-pane.active div.ace_layer.ace_text-layer');
                    
                    if (code === null) {
                        throw new Error("Code not found!");
                    }

                    setTimeout(() => {
                        const codeText = code.innerText;
                        copy(codeText, "Code copied successfully!");
                    }, 1);
                } catch (error) {
                    useToastr(error.message, "error");
                }
            });

            const copyQuestionButton = createButton("Copy 📝", "Click to copy question", () => {
                try {
                    const question = document.getElementById('questionInfoDiv');
                    if (question === null) {
                        throw new Error("Question not found!");
                    }
                    copy(question.innerText, "Question copied successfully!");
                } catch (error) {
                    useToastr(error.message, "error");
                }
            });

            ctButtonBar.insertBefore(copyTestCasesButton, ctButtonBar.firstChild);
            ctButtonBar.insertBefore(copyCodeButton, ctButtonBar.firstChild);
            ctButtonBar.insertBefore(copyQuestionButton, ctButtonBar.firstChild);
        });
}