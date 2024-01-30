import { Module } from '@/core/module';
import { TIME_TIMER } from '@/consts';
import { clearWindows } from '@/utils';

export class ClicksModule extends Module {
    constructor(type, text) {
        super(type, text);
    }

    #createTextHTML() {
        const textHTML = document.createElement('span');
        textHTML.className = 'text-block';
        return textHTML;
    }

    #removeTextHTML() {
        const textHTML = document.querySelector('.text-block');
        if (textHTML) {
            textHTML.remove();
        };
    }

    trigger() {
        clearWindows()
        let countClick = 0;
        let countDblClick = 0;
        this.#removeTextHTML();

        const body = document.querySelector('body');
        const textHTML = this.#createTextHTML();
        const timeHTML = this.#createTextHTML();
        timeHTML.textContent = `Осталось: 5 секунд`;
        body.insertAdjacentElement('afterbegin', textHTML);
        body.insertAdjacentElement('afterbegin', timeHTML);

        const startTime = new Date();

        const handleClick = () => {
            countClick++;
        };

        const handleDblClick = () => {
            countDblClick++;
        };

        window.addEventListener('click', handleClick);
        window.addEventListener('dblclick', handleDblClick);

        const intervalId = setInterval(() => {
            const currentTime = new Date();
            const elapsedTime = currentTime - startTime;
            const remainingTime = Math.max(0, (TIME_TIMER + 1000) - elapsedTime);
            timeHTML.textContent = `Осталось: ${Math.round(remainingTime / 1000)} секунды`;

            if (remainingTime === 0) {
                clearInterval(intervalId);
                this.#removeTextHTML();
                textHTML.textContent = `Ты накликал целых ${countClick - 1} раз(а)!`;
                window.removeEventListener('click', handleClick);
                window.removeEventListener('dblclick', handleDblClick);
            }
        }, 1000)
    }
}