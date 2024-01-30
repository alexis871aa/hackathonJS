import { Module } from '@/core/module';
import getRandomColor, { clearWindows } from '@/utils';

export class BackgroundModule extends Module {
    constructor(type, text) {
        super(type, text);
    }

    trigger() {
        clearWindows();

        const randomColor = getRandomColor();
        document.body.style.background = randomColor;

        const colorName = document.createElement('p');
        colorName.className = 'color-name';
        colorName.textContent = randomColor;
        document.body.append(colorName);

        const colorButton = document.createElement('button');
        colorButton.className = 'color-button';
        colorButton.textContent = 'Случайный фон';
        document.body.append(colorButton);

        colorButton.addEventListener('click', () => {
            const randomColor = getRandomColor();
            document.body.style.background = randomColor;
            colorName.textContent = randomColor;
        })
    }
}