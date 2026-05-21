let list = [];

export function addItem(item) {
  if (item == null) {
    console.log("addItem: Parameter is null");

    return;
  }

  list.push(item);
}

export function removeItem(item) {
  if (item == null) {
    console.log("removeItem: Parameter is null");

    return;
  }

  const index = getItemIndex(item);

  if (index !== -1) {
    list.splice(index, 1);
  }
}

export function getItemIndex(item) {
  if (item == null) {
    console.log("getItemIndex: Parameter is null");

    return null;
  }

  return list.map((e) => e.nom).indexOf(item.nom);
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

export function getItemQuantity(item) {
  if (item == null) {
    console.log("getItemQuantity: Parameter is null");

    return 0;
  }

  return list.filter((element) => element.nom === item.nom).length;
}

export function displayTotalPrice() {
  let price = 0;

  list.forEach((element) => {
    price += element.prix_unitaire;
  });

  return price;
}
