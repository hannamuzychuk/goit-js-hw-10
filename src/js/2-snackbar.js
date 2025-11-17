// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
const button = form.querySelector("button[type='submit']")

form.addEventListener("submit", event => {
    event.preventDefault();

    button.disabled = true;

    const delay = Number(form.elements.delay.value);
    const state = form.elements.state.value;

    const promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === "fulfilled") {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    });

    promise.then(delay => {
        iziToast.success({
            message: `✅ Fulfilled promise in ${delay}ms`,
            position: "topRight",
            onClosing: () => form.reset(),
        });
    })
        .catch(delay => {
            iziToast.error({
                message: `❌ Rejected promise in ${delay}ms`,
                position: "topRight",
                onClosing: () => form.reset(),
            });
        })
        .finally(() => {
            button.disabled = false;
        });
});