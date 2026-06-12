import { findOne } from "../products";

const mockProducts = [
  { nom: "Pomme", prix_unitaire: 1.5, quantite_stock: 10 },
  { nom: "Banane", prix_unitaire: 0.8, quantite_stock: 5 },
  { nom: "Orange", prix_unitaire: 1.2, quantite_stock: 0 },
];

describe("findOne - recherche de produit", () => {
  test("retourne le produit correspondant à la recherche exacte", () => {
    const result = findOne("Pomme", mockProducts);
    expect(result).toEqual(mockProducts[0]);
  });

  test("la recherche est insensible à la casse", () => {
    expect(findOne("pomme", mockProducts)).toEqual(mockProducts[0]);
    expect(findOne("BANANE", mockProducts)).toEqual(mockProducts[1]);
  });

  test("ignore les espaces en début et fin de chaîne", () => {
    const result = findOne("  Banane  ", mockProducts);
    expect(result).toEqual(mockProducts[1]);
  });

  test("retourne null si aucun produit ne correspond", () => {
    const result = findOne("Fraise", mockProducts);
    expect(result).toBeNull();
  });

  test("retourne null pour un tableau de données vide", () => {
    const result = findOne("Pomme", []);
    expect(result).toBeNull();
  });

  test("retourne null si input est null", () => {
    expect(findOne(null, mockProducts)).toBeNull();
  });

  test("retourne null si data est null", () => {
    expect(findOne("Pomme", null)).toBeNull();
  });

  test("retourne null si les deux paramètres sont null", () => {
    expect(findOne(null, null)).toBeNull();
  });
});
