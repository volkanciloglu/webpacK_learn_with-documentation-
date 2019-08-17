import "./button.css";

class Buttons {
  render() {
    const button = document.createElement("button");
    button.classList.add("button");
    button.innerHTML = "Add Text";
    button.addEventListener('click', () => {
      const text = document.createElement('p');
      text.classList.add('text');
      text.innerHTML = "This is Text";
      document.body.appendChild(text);
    });
    document.body.appendChild(button);
  }
}

export default Buttons;