import { Module } from '@/core/module';
import { clearWindows } from '@/utils';

export class TimerModule extends Module {
    #countdown

    constructor(type, text) {
        super(type, text);
    }

    #createTimerHTML() {
        const container = document.createElement('div');
        container.className = 'timer-block';
        const timer = document.createElement('span');
        timer.className = 'timer-block_timer';
        container.append(timer);

        const button = document.createElement('button');
        button.className = 'timer-block_button';
        button.textContent = 'Отключить';
        container.append(button);

        return container;
    }

    #timer(seconds) {
        const currentTime = Date.now();
        const endTime = currentTime + seconds * 1000;

        this.#displayTimer(seconds);

        this.#countdown = setInterval(() => {
            const secondsLeft = Math.round((endTime - Date.now()) / 1000);

            if (secondsLeft < 0) {
                this.#endTimer();
                clearInterval(this.#countdown);
                return;
            }

            this.#displayTimer(secondsLeft);
        }, 1000)
    }

    #endTimer() {
        clearWindows();
        const timerEndBlock = document.createElement('div');
        timerEndBlock.className = 'timer-end-block';
        
        const timerEndHeader = document.createElement('h1');
        timerEndHeader.className = 'timer-end-header';
        timerEndHeader.textContent = 'Время вышло!';

        const timerEndButton = document.createElement('button');;
        timerEndButton.className = 'timer-end-button';
        timerEndButton.type = 'button';
        timerEndButton.textContent = 'Повторить';

        timerEndBlock.append(timerEndHeader);
        timerEndBlock.append(timerEndButton);
        document.body.append(timerEndBlock);

        timerEndButton.addEventListener('click', () => {
            this.trigger();
            timerStartBlock.remove();
        })
    }

    #displayTimer(seconds) {
        const timerBlock = document.querySelector('.timer-block_timer');
        const minutes = Math.floor(seconds / 60);
        const remainderSeconds = seconds % 60;

        const display = `${minutes < 10 ? '0' : ''}${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
        timerBlock.textContent = display;
        document.title = display;
    }

    trigger() {
        clearWindows();

        const timerStartBlock = document.createElement('div');
        timerStartBlock.className = 'timer-start-block';
        
        const timerHeader = document.createElement('h1');
        timerHeader.className = 'timer-header';
        timerHeader.textContent = 'Введите время в секундах⏳';

        const timerInput = document.createElement('input');
        timerInput.className = 'timer-input';
        timerInput.type = 'number';

        const timerButton = document.createElement('button');;
        timerButton.className = 'timer-button';
        timerButton.type = 'button';
        timerButton.textContent = 'Запустить';

        timerStartBlock.append(timerHeader);
        timerStartBlock.append(timerInput);
        timerStartBlock.append(timerButton);
        document.body.append(timerStartBlock);

        timerButton.addEventListener('click', (event) => {
            const inputValue = document.querySelector('.timer-input').value;
            this.#timerStart(inputValue);
            timerStartBlock.remove();
        })

    }

    #timerStart(time) {
        if (time <= 3600) {
            const body = document.querySelector('body');
            const timerBlock = this.#createTimerHTML();
            body.insertAdjacentElement('afterbegin', timerBlock);
            this.#timer(time);
            const button = document.querySelector('.timer-block_button');
            if (button) {
                button.addEventListener('click', () => {
                    this.#endTimer();
                })
            }
        } else if (time > 3600) {
            alert('Введите время меньше часа, повторите операцию!');
        } else {
            alert('Вы ввели неверные данные, повторите операцию!');
        }
    }
}