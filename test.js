const dish = new Dish(
  "Pasta",
  "plato de pasta",
  ["pasta", "tomate frito", "queso"],
  "pasta_image.jpg"
);

const allergen = new Allergen("");

console.log(dish.toString());
// console.log(category1.toString());

const manager = RestaurantsManager.getInstance();

const category1 = new Category("Legumbres", "");
const category2 = new Category("Pasta", "aaaaaaaa");

manager.addCategory(category1);
manager.addCategory(category2);

//Obtenemos el iterador de las categorías
const categoriesIterator = manager.getCategories();

//Se recorren las categorías usando el iterador
for (const category of categoriesIterator) {
  console.log(category.toString());
}
