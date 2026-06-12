
describe("localStorage", () => {
  let mod;

  beforeEach(() => {
    localStorage.clear();
    jest.resetModules();
    mod = require("../list");
  });

  // ─── addItem ────────────────────────────────────────────────────────────────

  describe("addItem", () => {
    test("ajoute un produit dans localStorage", () => {
      const product = { nom: "Pomme", prix_unitaire: 1.5 };
      mod.addItem(product);
      const stored = JSON.parse(localStorage.getItem("list"));
      expect(stored).toHaveLength(1);
      expect(stored[0]).toEqual(product);
    });

    test("ajoute plusieurs produits distincts", () => {
      const p1 = { nom: "Pomme", prix_unitaire: 1.5 };
      const p2 = { nom: "Banane", prix_unitaire: 0.8 };
      mod.addItem(p1);
      mod.addItem(p2);
      const stored = JSON.parse(localStorage.getItem("list"));
      expect(stored).toHaveLength(2);
    });

    test("ne fait rien si l'argument est null", () => {
      mod.addItem(null);
      // save() n'est jamais appelé → clé absente
      expect(localStorage.getItem("list")).toBeNull();
    });
  });

  // ─── removeItem ─────────────────────────────────────────────────────────────

  describe("removeItem", () => {
    test("supprime un produit existant", () => {
      const product = { nom: "Pomme", prix_unitaire: 1.5 };
      mod.addItem(product);
      mod.removeItem(product);
      const stored = JSON.parse(localStorage.getItem("list"));
      expect(stored).toHaveLength(0);
    });

    test("ne supprime rien si l'argument est null", () => {
      const product = { nom: "Pomme", prix_unitaire: 1.5 };
      mod.addItem(product);
      mod.removeItem(null);
      const stored = JSON.parse(localStorage.getItem("list"));
      expect(stored).toHaveLength(1);
    });
  });

  // ─── getItemIndex ────────────────────────────────────────────────────────────

  describe("getItemIndex", () => {
    test("retourne l'index correct du produit", () => {
      const p1 = { nom: "Pomme", prix_unitaire: 1.5 };
      const p2 = { nom: "Banane", prix_unitaire: 0.8 };
      mod.addItem(p1);
      mod.addItem(p2);
      expect(mod.getItemIndex(p1)).toBe(0);
      expect(mod.getItemIndex(p2)).toBe(1);
    });

    test("retourne null si l'argument est null", () => {
      expect(mod.getItemIndex(null)).toBeNull();
    });
  });

  // ─── getItemQuantity ─────────────────────────────────────────────────────────

  describe("getItemQuantity", () => {
    test("retourne 0 si le produit n'est pas dans la liste", () => {
      const p = { nom: "Pomme", prix_unitaire: 1.5 };
      expect(mod.getItemQuantity(p)).toBe(0);
    });

    test("retourne la quantité correcte pour un produit ajouté plusieurs fois", () => {
      const p = { nom: "Pomme", prix_unitaire: 1.5 };
      mod.addItem(p);
      mod.addItem(p);
      mod.addItem(p);
      expect(mod.getItemQuantity(p)).toBe(3);
    });

    test("retourne 0 si l'argument est null", () => {
      expect(mod.getItemQuantity(null)).toBe(0);
    });
  });
});
