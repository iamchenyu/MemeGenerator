// select DOM elements
const form = document.querySelector("form");
const imageURL = document.querySelector("#image");
const topTextInput = document.querySelector("#topText");
const bottomTextInput = document.querySelector("#bottomText");
const submitButton = document.querySelector("#submit");
const memeShowcase = document.querySelector("#memeShowcase");

// display saved memes from local storage
if (!localStorage.meme) {
  meme = [];
} else {
  meme = JSON.parse(localStorage.meme);
  for (let { image, topText, bottomText } of meme) {
    createAndDisplayElements(image, topText, bottomText);
  }
}

// create new memes
form.addEventListener("submit", formSubmitHandler);

// define formSubmitHandler function
function formSubmitHandler(e) {
  e.preventDefault();

  // validate the text
  if (!topTextInput.value && !bottomTextInput.value) {
    alert("Please type in the TOP text or the BOTTOM text or BOTH");
    return;
  }

  // get user inputs
  let image = imageURL.value;
  let topText = topTextInput.value;
  let bottomText = bottomTextInput.value;

  // save new memes to the local storage
  const savedMeme = {
    image,
    topText,
    bottomText,
  };

  meme.push(savedMeme);
  localStorage.setItem("meme", JSON.stringify(meme));

  // create meme elements
  createAndDisplayElements(image, topText, bottomText);

  // reset user inputs
  imageURL.value = "";
  topTextInput.value = "";
  bottomTextInput.value = "";
}

// define createAndDisplayElements function
function createAndDisplayElements(img, upperText, lowerText) {
  // create new elements
  const container = document.createElement("div");
  const image = document.createElement("img");
  const topText = document.createElement("p");
  const bottomText = document.createElement("p");
  const deleteButton = document.createElement("button");

  container.append(image);
  container.append(topText);
  container.append(bottomText);
  container.append(deleteButton);
  memeShowcase.prepend(container);

  // display elements
  image.setAttribute("src", img);

  topText.innerText = upperText.toUpperCase();
  topText.classList.add("topText");

  bottomText.innerText = lowerText.toUpperCase();
  bottomText.classList.add("bottomText");

  deleteButton.innerText = "X";
  deleteButton.style.visibility = "hidden";

  // add event listeners to show and hide the delete button
  container.addEventListener("mouseenter", function (e) {
    deleteButton.style.visibility = "";
  });

  container.addEventListener("mouseleave", function (e) {
    deleteButton.style.visibility = "hidden";
  });

  // add event listener to the delete button
  deleteButton.addEventListener("click", deleteButtonHandler);
}

// define deleteButtonHandler function
function deleteButtonHandler(e) {
  // find the deleted meme in DOM
  const memeContainer = e.target.parentElement;
  const deleteIndexinDOM = [...memeContainer.parentElement.children].indexOf(
    memeContainer
  );

  // match the position and delete it in the saved meme array
  meme = meme.filter(
    (el, index) => index != meme.length - 1 - deleteIndexinDOM
  );

  // update the local storage
  localStorage.setItem("meme", JSON.stringify(meme));

  // delete the meme
  memeContainer.remove();
}
