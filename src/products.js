import { addItem } from "./list";

function bindSearchForm() {
  const searchForm = document.getElementById("search-form");

  if (searchForm == null) {
    console.log("bindSearchForm: searchForm is null");

    return;
  }

  searchForm.addEventListener("input", async (event) => {
    event.preventDefault();

    await renderAll();
  });
}

function clearItems() {
  const products = getItemContainer();

  if (products == null) {
    return;
  }

  products.innerHTML = "";
}

function createItemCard(product) {
  const div = document.createElement("div");

  div.innerHTML = `
    <h3>${product.nom}</h3>
    <p>${product.prix_unitaire}</p>
    <p>Reste ${product.quantite_stock} en stock</p>
    <button type="button" class="addButton">Ajouter</button>
  `;

  const addButton = div.querySelector(".addButton");

  if (addButton != null) {
    addButton.addEventListener("click", () => {
      addItem(product);
      console.log("Added")
    });
  }

  return div;
}

export async function displayAll() {
  const products = getItemContainer();
  
  const data = await getAll();

  if (products == null || data == null) {
    return;
  }

  data.forEach((item) => {
    products.appendChild(createItemCard(item));
  });
}

export async function displayOne(product) {
  const products = getItemContainer();

  if (products == null || product == null) {
    return;
  }

  products.appendChild(createItemCard(product));
}

export async function displayTotal() {
  const element = document.getElementById("total-products");

  if (element == null) {
    console.log("displayTotal: element is null");

    return;
  }

  const total = await getTotal();

  element.textContent = String(total);
}

export function findOne(input, data) {
  if (input == null || data == null) {
    console.log("findOne: Parameter is null");

    return null;
  }

  const normalizedInput = input.trim().toLowerCase();

  const result = data.find((product) => product.nom.toLowerCase() === normalizedInput);

  return result ?? null;
}

export async function getAll() {
  try {
    const response = await fetch("/liste_produits_quotidien.json");

    if (!response.ok) {
      throw new Error(`Erreur : ${response.status}`);
    }

    const result = await response.json();

    return result ?? null;
  } catch (error) {
    console.log(error.message);

    return null;
  }
}

function getItemContainer() {
  return document.getElementById("products");
}

export function getSearchInput() {
  const input = document.getElementById("input");

  return input?.value ?? "";
}

export async function getTotal() {
  const data = await getAll();

  return data?.length ?? 0;
}

async function renderAll() {
  const input = getSearchInput();

  clearItems();

  if (input === "") {
    await displayAll();

    return;
  }

  const product = await searchItem();

  await displayOne(product);
}

export async function searchItem() {
  const input = getSearchInput();

  const data = await getAll();

  return findOne(input, data);
}

displayTotal();

bindSearchForm();

renderAll();
