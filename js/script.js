const allSpends = [];

let nameInput = "";
let nameInputValue = "";

let numberInput = "";
let numberInputValue = "";

const mainContent = document.getElementById("main-content");

const currentDate = new Date().toJSON().slice(0, 10).replace(/-/g, ".");

window.onload = init = async () => {
  nameInput = document.getElementById("spend-name");
  numberInput = document.getElementById("spend-number");

  nameInput.addEventListener("change", updateNameValue);
  numberInput.addEventListener("change", updateNumberValue);

  render();
};

const addNewSpend = () => {
  if (nameInputValue === "" || nameInputValue === " ") return;
  if (numberInputValue <= 0) return;
  allSpends.push({
    spendName: nameInputValue,
    spendValue: numberInputValue,
    spendDate: currentDate,
  });
  nameInput.value = "";
  numberInput.value = "";

  nameInputValue = "";
  numberInputValue = "";

  render();
};

const updateNameValue = (event) => {
  nameInputValue = event.target.value;
};

const updateNumberValue = (event) => {
  numberInputValue = event.target.value;
};

const content = document.createElement("div");
content.className = "list-spends";

const render = () => {
  while (content.firstChild) {
    content.removeChild(content.firstChild);
  }

  allSpends.map((item, index) => {
    const container = document.createElement("div");
    container.id = `spend_${index}`;
    container.className = "item";

    const spendName = document.createElement("p");
    spendName.className = "item-name";
    spendName.innerText = `${index + 1}) ${item.spendName}`;

    const spendDate = document.createElement("div");
    spendDate.className = "item_date";
    spendDate.innerText = currentDate;

    const spendValue = document.createElement("div");
    spendValue.className = "item_sum";
    spendValue.innerText = `${item.spendValue} р.`;

    container.appendChild(spendName);
    container.appendChild(spendDate);
    container.appendChild(spendValue);
    content.appendChild(container);

    mainContent.appendChild(content);
  });
};
