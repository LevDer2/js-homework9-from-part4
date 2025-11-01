const form = document.querySelector(".contact-form");
const firtsName = document.querySelector("#first-name");
const secondName = document.querySelector("#second-name");
const phone = document.querySelector("#phone");
const email = document.querySelector("#email");
const addButton = document.querySelector("#addBookmarkBtn");
const ul = document.querySelector("#bookmarkList");

const cancelBtn = document.createElement("button");
cancelBtn.type = "button";
cancelBtn.id = "cancelEditBtn";
cancelBtn.textContent = "Скасувати";
cancelBtn.hidden = true;
addButton.insertAdjacentElement("afterend", cancelBtn);

let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
let editIndex = null;

function renderContact(array) {
  ul.innerHTML = array
    .map(({ name, surname, phoneNumber, userEmail }, index) => {
      return `
      <li class="item" data-index="${index}">
        <p>${name}</p>
        <p>${surname}</p>
        <p>${phoneNumber}</p>
        <p>${userEmail}</p>
        <button type="button" class="edit-btn">Редагувати</button>
        <button type="button" class="delete-btn">Видалити</button>
      </li>`;
    })
    .join("");
}

function saveStorage() {
  localStorage.setItem("contacts", JSON.stringify(contacts));
  renderContact(contacts);
}

function resetEditingState() {
  editIndex = null;
  addButton.textContent = "Додати";
  cancelBtn.hidden = true;
  form.reset();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = firtsName.value.trim();
  const surname = secondName.value.trim();
  const phoneNumber = phone.value.trim();
  const userEmail = email.value.trim();

  if (!name || !surname || !phoneNumber || !userEmail) {
    alert("Будь ласка, заповніть усі поля!");
    return;
  } else {
    const payload = { name, surname, phoneNumber, userEmail };
    if (editIndex !== null) {
      contacts[editIndex] = payload;
    } else {
      contacts.push(payload);
    }
  }
  saveStorage();
  resetEditingState();
});

ul.addEventListener("click", (event) => {
  const li = event.target.closest("li");
  if (!li) return;
  const index = Number(li.dataset.index);

  if (event.target.classList.contains("delete-btn")) {
    contacts.splice(index, 1);
    saveStorage();

    if (editIndex === index) resetEditingState();
    return;
  }

  if (event.target.classList.contains("edit-btn")) {
    const c = contacts[index];
    firtsName.value = c.name;
    secondName.value = c.surname;
    phone.value = c.phoneNumber;
    email.value = c.userEmail;

    editIndex = index;
    addButton.textContent = "Зберегти";
    cancelBtn.hidden = false;
    form.scrollIntoView({ behavior: "smooth", block: "start" });
  }
});

cancelBtn.addEventListener("click", () => {
  resetEditingState();
});

renderContact(contacts);
