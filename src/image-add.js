import kiwi from './images/kiwi.jpg'
const addImage = () => {
  const img = document.createElement('img');
  img.alt = "Kivi image";
  img.src = kiwi;
  img.width = 300;

  const body = document.querySelector("body");
  body.appendChild(img);
}

export default addImage;