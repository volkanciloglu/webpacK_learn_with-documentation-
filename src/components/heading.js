import "./heading.scss";

class Heading {
  render() {
    const h = document.createElement("h1");
    h.innerHTML = "WEBPACK awesome";
    document.body.appendChild(h)
  }
}

export default Heading;