const url = "/liste_produits_quotidien.json";

export async function getAll() {
  try {
    const response = await fetch(url);

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

export function findOne(input, data) {
  if (input == null || data == null) {
    console.log("findOne: Parameter is null");

    return null;
  }

  const result = data.find((product) => product.nom === input);

  return result ?? null;
}



