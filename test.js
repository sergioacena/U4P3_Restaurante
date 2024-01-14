//Creación objetos
const manager = RestaurantsManager.getInstance();

const dish1 = new Dish(
  "Pasta",
  "plato de pasta",
  ["pasta", "tomate frito", "queso"],
  "pasta_image.jpg"
);
const dish2 = new Dish("Hamburguesa", "", [], "");
const dish6 = new Dish(
  "Entrecot",
  "Al punto",
  ["Carne de vaca", "sal", "pimienta"],
  "entrecot_image.jpg"
);

const category1 = new Category("Legumbres", "aaaaaaaa");
const category2 = new Category("Pasta", "bbbbbbb");
const category6 = new Category("Salsa", "jjjjj");

const menu1 = new Menu("Diario", "aaaaaa");
const menu2 = new Menu("Vegano", "bbbbbb");
const menu6 = new Menu("Infantil", "jjjj");

const allergen1 = new Allergen("Pescado", "");
const allergen2 = new Allergen("Gluten", "Intolerancia al gluten");
const allergen6 = new Allergen("Lactosa", "Para intolerantes de la lactosa");

const coor1 = new Coordinate(41.40338, 2.17403);
const coor2 = new Coordinate(22.69482, 0.12314);

const restaurant1 = new Restaurant("La Perla", "aaaaaaa", coor1);
const restaurant2 = new Restaurant("100 Montaditos", "bbbbb");
const restaurant3 = new Restaurant("Burger King", "cccccc", coor2);

console.log("----ADD CATEGORY----");
//Se añaden las dos categorías al manager, pudiendo encadenarse
manager.addCategory(category1).addCategory(category2);

try {
  manager.addCategory(category2); //Salta AlreadyExistsException
} catch (error) {
  console.log(error);
}

try {
  manager.addCategory(dish1); //Salta InvalidTypeException
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

console.log("----ADD MENU----");
manager.addMenu(menu1).addMenu(menu2);

try {
  manager.addMenu(menu2); //Salta AlreadyExistsException
} catch (error) {
  console.log(error);
}

try {
  manager.addMenu(dish1); //Salta InvalidTypeException
} catch (error) {
  console.log(error);
}

//Obtenemos el iterador de los menús
const menuIterator1 = manager.getMenu();

for (const menu of menuIterator1) {
  console.log(menu.toString());
}
