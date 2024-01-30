import { Module } from "@/core/module";
import getRandomColor, { random, clearWindows } from "@/utils";

export class ShapeModule extends Module {
  #count

  constructor(type, text) {
    super(type, text);
  }

  trigger() {
    clearWindows();

    this.heading = document.createElement('h3');
    this.resultHeading = document.createElement('h3');
    this.result = 1;

    this.heading.className = 'heading-box';
    this.resultHeading.className = 'heading-box';

    this.heading.textContent = 'Кликай по фигуре, чтобы создать новую👇';
    this.resultHeading.textContent = `Ты сгенерил уже ${this.result} фигур(ы)!`;

    document.body.append(this.heading)
    document.body.append(this.resultHeading)

    this.randomPositionBox();
  }

  randomPositionBox() {
    if (document.querySelector("div.box") !== null) {
      const deleteBox = document.querySelector("div.box");
      this.result += 1;
      this.resultHeading.textContent = `Ты сгенерировал уже ${this.result} фигур(ы)!`;
      deleteBox.remove();
      this.getRandonBox();
    } else {
      this.getRandonBox();
    }
  }

  getRandonBox() {
    const divBoxRandom = document.createElement("div");
    divBoxRandom.className = "box";
    document.body.append(divBoxRandom);
    const boxRandom = document.querySelector(".box");
    boxRandom.style.position = "fixed";
    boxRandom.style.bottom = `${random(10, 50)}%`;
    boxRandom.style.marginTop = `${random(1, 50)}%`;
    boxRandom.style.marginLeft = `${random(1, 50)}%`;
    boxRandom.style.marginRight = `${random(1, 50)}%`;
    if (random(1, 10) < 3) {
      boxRandom.style.height = 0;
      boxRandom.style.width = `${random(30, 300)}px`;
      boxRandom.style.borderBottom = `100px solid ${getRandomColor()}`;
      boxRandom.style.borderLeft = `${random(5, 50)}px solid transparent`;
      boxRandom.style.borderRight = `${random(5, 50)}px solid transparent`;
    } else {
      boxRandom.style.borderRadius = `${random(1, 75)}%`;
      boxRandom.style.width = `${random(3, 50)}%`;
      boxRandom.style.height = `${random(3, 50)}%`;
      boxRandom.style.background = getRandomColor();
    }

    boxRandom.addEventListener("click", (event) => {
      const { target } = event;
      if (target) {
        this.randomPositionBox();
      }
    });
  }

}
