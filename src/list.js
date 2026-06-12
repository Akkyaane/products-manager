const key = "list";

let list = JSON.parse(localStorage.getItem(key) || "[]");

function save() {
  localStorage.setItem(key, JSON.stringify(list));
}

export function addItem(item) {
  if (item == null) {
    console.log("addItem: Parameter is null");

    return;
  }

  if (item in list) {
    getItemIndex(item)
    
  }

  list.push(item);

  save();
}

export function calcSubTotal(item) {
  const quantity = getItemQuantity(item);

  return item.prix_unitaire * quantity;
}

function createItemRow(product) {
  const tr = document.createElement("tr");

  tr.innerHTML = `
  <td>${product.nom}</td>
    <td>${product.prix_unitaire}</td>
      <td>${getItemQuantity(product)}</td>
      <td>${calcSubTotal(product)}</td>
      <td><button type="button" class="removeButton">Supprimer</button></td>
  `;

  const removeButton = tr.querySelector(".removeButton");

  if (removeButton != null) {
    removeButton.addEventListener("click", () => {
      removeItem(product);
      console.log("Removed");
      displayAll();
      displayTotalPrice();
    });
  }

  return tr;
}

export function displayAll() {
  const tbody = getItemContainer();

  const data = list;

  if (tbody == null || data == null) {
    return;
  }

  tbody.innerHTML = "";

  data.forEach((item) => {
    tbody.appendChild(createItemRow(item));
  });
}

export function displayTotalPrice() {
  const total = document.getElementById("total");

  if (total == null) {
    return;
  }

  let price = 0;

  list.forEach((element) => {
    price += element.prix_unitaire;
  });

  total.textContent = new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
  }).format(price);
}

function getItemContainer() {
  return document.getElementById("tbody");
}

export function getItemIndex(item) {
  if (item == null) {
    console.log("getItemIndex: Parameter is null");

    return null;
  }

  return list.map((e) => e.nom).indexOf(item.nom);
}

export function getItemQuantity(item) {
  if (item == null) {
    console.log("getItemQuantity: Parameter is null");

    return 0;
  }

  return list.filter((element) => element.nom === item.nom).length;
}

export function removeItem(item) {
  if (item == null) {
    console.log("removeItem: Parameter is null");

    return;
  }

  const index = getItemIndex(item);

  if (index !== -1) {
    list.splice(index, 1);

    save();
  }
}

export function updateItemQuantity(number, item) {
  if (item == null) {
    console.log("updateItemQuantity: Parameter is null");

    return null;
  }

  let items = 0;

  list.forEach((element) => {
    if (element.nom == item.nom) {
      items++;
    }
  });

  if (items > number) {
    while (items !== number) {
      removeItem(item);
      items--;
    }
  } else if (items < number) {
    while (items !== number) {
      addItem(item);
      items++;
    }
  } else {
    return;
  }
}

displayAll();

displayTotalPrice();
