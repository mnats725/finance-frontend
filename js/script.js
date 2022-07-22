const allSpends = [];

let nameInput = "";
let nameInputValue = "";

let numberInput = "";
let numberInputValue = "";

let changeSpendNameInput = "";
let changeSpendNumberInput = "";

let changeSpendNameValue = "";
let changeSpendNumberValue = "";
let changeSpendDateValue = "";

let editorOpened = false;
let spendSumCount = 0;

const currentDate = new Date().toJSON().slice(0, 10).replace(/-/g, ".");

window.onload = init = async () => {
  nameInput = document.getElementById("spend-name");
  numberInput = document.getElementById("spend-number");

  nameInput.addEventListener("change", updateNameValue);
  numberInput.addEventListener("change", updateNumberValue);

  renderSpendSum();
  render();
};

const addNewSpend = () => {
  if (nameInputValue === "" || nameInputValue === " ") return;
  if (numberInputValue <= 0) return;
  allSpends.push({
    spendName: nameInputValue,
    spendValue: numberInputValue,
    spendDate: currentDate,
    isEditing: false,
  });
  nameInput.value = "";
  numberInput.value = "";

  nameInputValue = "";
  numberInputValue = "";
  renderSpendSum();
  render();
};

const mainContent = document.getElementById("main-content");
const spendSum = document.createElement("p");
const spendSumText = document.createElement("p");

const deleteSpend = (index) => {
  delete allSpends[index];

  editorOpened = false;
  renderSpendSum();
  render();
};

const editVisible = (index) => {
  allSpends.forEach((elem) => {
    if (!editorOpened) {
      console.log(allSpends[index].isEditing);
      allSpends[index].isEditing = true;
      editorOpened = true;
      render();
    }
    if (elem.isEditing) return;
  });
};

const renderSpendSum = () => {
  updateSpendSumCount();
  spendSum.className = "total-sum";
  spendSum.appendChild(spendSumText);
  mainContent.appendChild(spendSum);
};

const updateSpendSumCount = () => {
  spendSumCount = 0;

  allSpends.forEach((elem) => {
    spendSumCount += +elem.spendValue;
  });
  spendSumCount > 0
    ? (spendSumText.innerText = `Итого: ${spendSumCount} р.`)
    : (spendSumText.innerText = "Нет трат");
};

const onRename = (index) => {
  if (changeSpendNameValue === "" || changeSpendNameValue === " ") return;
  editorOpened = false;
  console.log(changeSpendNameValue);
  allSpends[index].spendName = changeSpendNameValue;
  allSpends[index].spendValue = changeSpendNumberValue;
  allSpends[index].spendDate = changeSpendDateValue;
  allSpends[index].isEditing = false;
  renderSpendSum();
  render();
};

const onCancel = (index) => {
  editorOpened = false;
  allSpends[index].spendName = allSpends[index].spendName;
  allSpends[index].isEditing = false;
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

    const changeNameForm = document.createElement("input");
    changeNameForm.className = "change-name-input";
    changeNameForm.placeholder = "Введите новое название";
    changeNameForm.value = allSpends[index].spendName;
    changeSpendNameValue = allSpends[index].spendName;

    const updateSpendNameValue = (event) => {
      changeSpendNameValue = event.target.value;
    };
    changeNameForm.addEventListener("change", updateSpendNameValue);

    const spendDate = document.createElement("div");
    spendDate.className = "item_date";
    spendDate.innerText = allSpends[index].spendDate;

    const changeDateForm = document.createElement("input");
    changeDateForm.className = "change-date-input";
    changeDateForm.placeholder = "Введите новую дату";
    changeDateForm.value = allSpends[index].spendDate;
    changeSpendDateValue = allSpends[index].spendDate;

    const updateSpendDateValue = (event) => {
      changeSpendDateValue = event.target.value;
    };

    changeDateForm.addEventListener("change", updateSpendDateValue);

    const spendValue = document.createElement("div");
    spendValue.className = "item_sum";
    spendValue.innerText = `${item.spendValue} р.`;

    const changeNumberForm = document.createElement("input");
    changeNumberForm.className = "change-number-input";
    changeNumberForm.type = "number";
    changeNumberForm.placeholder = "Введите новую сумму";
    changeNumberForm.value = allSpends[index].spendValue;
    changeSpendNumberValue = allSpends[index].spendValue;

    const updateSpendNumberValue = (event) => {
      changeSpendNumberValue = event.target.value;
    };
    changeNumberForm.addEventListener("change", updateSpendNumberValue);

    const storageIcons = document.createElement("div");
    storageIcons.className = "icons";

    const deleteIcon = document.createElement("img");
    deleteIcon.className = "delete-icon";
    deleteIcon.src = "img/delete.svg";
    deleteIcon.onclick = () => deleteSpend(index);

    const renameIcon = document.createElement("img");
    renameIcon.className = "rename-icon";
    renameIcon.src = "img/edit.svg";
    renameIcon.onclick = () => editVisible(index);

    const doneIcon = document.createElement("img");
    doneIcon.className = "done-icon";
    doneIcon.src = "img/done.svg";
    doneIcon.onclick = () => onRename(index);

    const closeIcon = document.createElement("img");
    closeIcon.className = "close-icon";
    closeIcon.src = "img/cancel.svg";
    closeIcon.onclick = () => onCancel(index);

    container.appendChild(spendName);
    container.appendChild(spendDate);
    container.appendChild(spendValue);
    container.appendChild(storageIcons);

    storageIcons.appendChild(renameIcon);
    storageIcons.appendChild(deleteIcon);

    content.appendChild(container);

    if (item.isEditing) {
      spendName.replaceWith(changeNameForm);
      spendValue.replaceWith(changeNumberForm);
      spendDate.replaceWith(changeDateForm);
      storageIcons.removeChild(renameIcon);
      storageIcons.removeChild(deleteIcon);
      storageIcons.appendChild(doneIcon);
      storageIcons.appendChild(closeIcon);
    }

    mainContent.appendChild(content);
  });
};
