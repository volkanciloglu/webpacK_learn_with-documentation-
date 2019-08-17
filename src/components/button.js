import "./button.scss";

class Buttons {
  buttonClass = "button"
  textClass = "text"
  render() {
    const button = document.createElement("button");
    button.classList.add(this.buttonClass);
    button.innerHTML = "Add Text";
    button.addEventListener("click", () => {
      const text = document.createElement('p');
      text.classList.add(this.textClass);
      text.innerHTML = "This is Text";
      document.body.appendChild(text);
    });
    document.body.appendChild(button);
  }
}

export default Buttons;