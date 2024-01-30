export function random(min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1));
}
export function randomElementOfArray(array) {
  return [Math.floor(Math.random() * array.length)];
}
export default function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

export function clearWindows() {
  const body = document.querySelector('body');
  body.style.backgroundColor = '#ffffff';
  const menu = document.querySelector('#menu');
  body.innerHTML = '';
  body.append(menu);
}