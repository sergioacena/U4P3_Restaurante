const dish = new Dish(
  "Pasta",
  "plato de pasta",
  ["pasta", "tomate frito", "queso"],
  "pasta_image.jpg"
);

// console.log(dish.toString());
// console.log(category1.toString());

const manager = RestaurantsManager.getInstance();

const category1 = new Category("Legumbres", "aaaaaaaa");
const category2 = new Category("Pasta", "bbbbbbb");
const category6 = new Category("Salsa", "jjjjj");

console.log("----ADD CATEGORY----");
//Se añaden las dos categorías al manager, pudiendo encadenarse
manager.addCategory(category1).addCategory(category2);

try {
  manager.addCategory(category2); //Salta AlreadyExistsException
} catch (error) {
  console.log(error);
}

try {
  manager.addCategory(dish); //Salta InvalidTypeException
} catch (error) {
  console.log(error);
}

//Obtenemos el iterador de las categorías
const categoriesIterator1 = manager.getCategories();

//Se recorren las categorías usando el iterador y se muestran en un toString
for (const category of categoriesIterator1) {
  console.log(category.toString());
}

console.log("----REMOVE CATEGORY----");
//AVISO-- hay que crear un iterador por cada vez que se quiera hacer toString u otra operación
const categoriesIterator2 = manager.getCategories();
manager.removeCategory(category1); //Se elimina el elemento de la categoría sin problema

try {
  manager.removeCategory(category6); //Salta NotRegisteredElement, no se elimina nada
} catch (error) {
  console.log(error);
}

for (const category of categoriesIterator2) {
  console.log(category.toString()); //Muestra todas las categorías
}
