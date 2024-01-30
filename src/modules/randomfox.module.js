import { Module } from '@/core/module';
import { random, clearWindows } from '@/utils';

export class RandomFoxModule extends Module {
    constructor(type, text) {
        super(type, text);
    }

    trigger() {
        clearWindows()
        const foxLoader = document.createElement('span');
        foxLoader.className = 'loading-box'
        foxLoader.textContent = 'Loading...';
        document.body.append(foxLoader);
        if (document.querySelector('.fox-container')) {
            const foxImage = document.querySelector('.fox-container');
            foxImage.remove();
        }
        async function getRandomFox() {
            try {
                const response = await fetch(`https://randomfox.ca/images/${random(1, 123)}.jpg`);
                document.body.insertAdjacentHTML('beforeend', `
                    <div class="fox-container">
                        <h3 class="message hidden-fox">Кликните по лисе, чтобы получить ещё одну👇</h3>
                        <img src="${response.url}" class="fox-image">
                    </div>
                `);
            }
            catch (error) {
                throw new Error(error);
            }
            finally {
                foxLoader.remove();
                const foxImage = document.querySelector('.fox-image');
                foxImage.addEventListener('click', () => {
                    document.querySelector('.fox-container').remove();
                    getRandomFox();
                })
                setTimeout(() => {
                    if(document.querySelector('.message').classList.contains('hidden-fox')) {
                        document.querySelector('.message').className = 'message';
                    }
                }, 3000);
            }
        }
        getRandomFox();
    }
}