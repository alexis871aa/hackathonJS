import { Module } from '../core/module';
import { loremIpsum } from 'lorem-ipsum';


export class MessageModule extends Module {
  constructor(type, text) {
    super(type, text);
  }

  trigger() {
    const wrapper = document.createElement('div');
    wrapper.className = 'message-wrapper';

    const textBlock = document.createElement('div');
    textBlock.className = 'message-block';
    textBlock.style.opacity = 1;

    const text = document.createElement('p');
    text.textContent = `${loremIpsum()}`;

    const hasWrapper = document.querySelector('.message-wrapper');
    if (hasWrapper) {
      textBlock.append(text);
      hasWrapper.append(textBlock);
    } else {
      textBlock.append(text);
      wrapper.append(textBlock);
      document.body.prepend(wrapper);
    }
    setTimeout(() => {
      setInterval(() => {
        textBlock.style.opacity -= 0.05;
        if (textBlock.style.opacity <= 0) {
          textBlock.remove();
        }
      }, 35)
    }, 4000)
    setInterval(() => {
      if (!document.querySelector('.message-block')) {
        wrapper.remove();
      }
    }, 5000)
  }
}