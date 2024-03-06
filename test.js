//Importación clases entities
import {
  Dish,
  Category,
  Allergen,
  Menu,
  Restaurant,
  Coordinate,
  RestaurantsManager,
} from "./entities.js";

//Creación objetos
const manager = RestaurantsManager.getInstance();

const dish1 = new Dish(
  "Espaguetis",
  "plato de espaguetis",
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

const dish3 = new Dish("Pimiento", "Rojo", ["Pimiento"], "pimiento.jpg");
const dish4 = new Dish(
  "Menestra",
  "Verduras varias",
  ["Brocoli, Berenjena"],
  "menestra.jpg"
);

const category1 = new Category("Legumbres", "aaaaaaaa");
const category2 = new Category("Pasta", "bbbbbbb");
const category6 = new Category("Pimiento", "jjjjj");
const category3 = new Category("Carne", "jjjjj");

const menu1 = new Menu("Diario", "aaaaaa");
const menu2 = new Menu("Vegano", "bbbbbb");
const menu6 = new Menu("Infantil", "jjjj");

const allergen1 = new Allergen("Pescado", "");
const allergen2 = new Allergen("Gluten", "Intolerancia al gluten");
const allergen6 = new Allergen("Lactosa", "Para intolerantes de la lactosa");

const coor1 = new Coordinate(41.40338, 2.17403);
const coor2 = new Coordinate(55.65482, 3.29581);

const restaurant1 = new Restaurant("La Perla", "aaaaaaa", coor1);
const restaurant2 = new Restaurant("100 Montaditos", "bbbbb");
const restaurant3 = new Restaurant("Burger King", "cccccc", coor2);

console.log("----ADD CATEGORY----");
//Se añaden las dos categorías al manager, pudiendo encadenarse
manager.addCategory(category1, category2);

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

//PARA MOSTRAR LOS DATOS ANTES Y DESPUES CREO DISTINTOS ITERADORES, SI NO NO PUEDO
//Obtenemos el iterador de las categorías
const categoriesIterator1 = manager.getterCategories();
for (const categories of categoriesIterator1) {
  console.log(categories.toString());
}

console.log("----REMOVE CATEGORY----");
const categoriesIterator2 = manager.getterCategories();
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
manager.addMenu(menu1, menu2);

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
let menuIterator1 = manager.getterMenus();

for (const menu of menuIterator1) {
  console.log(menu);
}

console.log("----REMOVE MENU----");
const menuIterator2 = manager.getterMenus();
manager.removeMenu(menu1); //Se elimina el elemento del menú sin problema

try {
  manager.removeMenu(menu6); //Salta NotRegisteredElement, no se elimina nada
} catch (error) {
  console.log(error);
}

for (const menu of menuIterator2) {
  console.log(menu);
}

console.log("----ADD ALLERGEN----");
manager.addAllergen(allergen1).addAllergen(allergen2);

try {
  manager.addAllergen(allergen2); //Salta AlreadyExistsException
} catch (error) {
  console.log(error);
}

try {
  manager.addAllergen(dish1); //Salta InvalidTypeException
} catch (error) {
  console.log(error);
}

//Obtenemos el iterador de los alérgenos
const allergenIterator1 = manager.getterAllergens();

for (const allergen of allergenIterator1) {
  console.log(allergen.toString());
}

console.log("----REMOVE ALLERGEN----");
const allergenIterator2 = manager.getterAllergens();
manager.removeAllergen(allergen1); //Se elimina el elemento de los alérgenos sin problema

try {
  manager.removeAllergen(allergen6); //Salta NotRegisteredElement, no se elimina nada
} catch (error) {
  console.log(error);
}

for (const allergen of allergenIterator2) {
  console.log(allergen.toString()); //Muestra todos los alérgenos
}

console.log("----ADD DISHES----");
manager.addDish(dish1).addDish(dish2);

try {
  manager.addDish(dish2); //Salta AlreadyExistsException
} catch (error) {
  console.log(error);
}

try {
  manager.addDish(menu1); //Salta InvalidTypeException
} catch (error) {
  console.log(error);
}

//Obtenemos el iterador de los platos - no hay iterador en la practica (lo hago para probarlo)
const dishIterator1 = manager.getterDishes();

for (const dish of dishIterator1) {
  console.log(dish);
}

console.log("----REMOVE DISHES----");
const dishIterator2 = manager.getterDishes();
manager.removeDish(dish2); //Se elimina el elemento de la categoría sin problema

try {
  manager.removeDish(dish6); //Salta NotRegisteredElement, no se elimina nada
} catch (error) {
  console.log(error);
}

for (const dish of dishIterator2) {
  console.log(dish); //Muestra todos los platos
}

console.log("----ADD RESTAURANT----");
manager.addRestaurant(restaurant1).addRestaurant(restaurant2);

try {
  manager.addRestaurant(restaurant2); //Salta AlreadyExistsException
} catch (error) {
  console.log(error);
}

try {
  manager.addRestaurant(menu1); //Salta InvalidTypeException
} catch (error) {
  console.log(error);
}

//Obtenemos el iterador de los restaurantes
const restaurantIterator1 = manager.getterRestaurants();

for (const restaurant of restaurantIterator1) {
  console.log(restaurant.toString());
}

console.log("----REMOVE RESTAURANT----");
const restaurantIterator2 = manager.getterRestaurants();
manager.removeRestaurant(restaurant1); //Se elimina el elemento de la categoría sin problema

try {
  manager.removeRestaurant(restaurant3); //Salta NotRegisteredElement, no se elimina nada
} catch (error) {
  console.log(error);
}

for (const restaurant of restaurantIterator2) {
  console.log(restaurant.toString()); //Muestra todos los restaurantes
}

console.log("----ASSIGN CATEGORY TO DISH----");
try {
  manager.assignCategoryToDish(category2); //Salta NullException
} catch (error) {
  console.log(error);
}

// try {
//   manager.assignCategoryToDish(dish2, null); //salta null (comentado por no añadir mas platos)
// } catch (error) {
//   console.log(error);
// }

try {
  manager.assignCategoryToDish(dish1, category2); //Se añade la categoría correctamente al plato 1
} catch (error) {
  console.log(error);
}

try {
  manager.assignCategoryToDish(dish1, category3); //Se añade una categoría que no existía al plato1
} catch (error) {
  console.log(error);
}

try {
  manager.assignCategoryToDish(dish3, category3); //Se añade una categoría a un plato que no existía en el sistema
} catch (error) {
  console.log(error);
}

const dishIterator3 = manager.getterDishes();

for (const dish of dishIterator3) {
  console.log(dish);
} //Se muestran las categorías correctamente dentro de los platos
//!!!AL DESASIGNAR UNA CATEGORÍA SE PIERDE EL DATO TAMBIÉN AQUÍ PERO ANTES DE DESASIGNAR FUNCIONABA

console.log("----DEASSIGN CATEGORY TO DISH----");
try {
  manager.deassignCategoryToDish(category2); //Salta NullException
} catch (error) {
  console.log(error);
}

try {
  manager.deassignCategoryToDish(dish1, category3); //Se desasigna correctamente
} catch (error) {
  console.log(error);
}

const dishIterator4 = manager.getterDishes();

for (const dish of dishIterator4) {
  //SALE QUE EL ARRAY TIENE 1
  console.log(dish);
}

console.log("----ASSIGN ALLERGEN TO DISH----");
try {
  manager.assignAllergenToDish(null, allergen1); //Salta NullException
} catch (error) {
  console.log(error);
}

try {
  manager.assignAllergenToDish(dish3, allergen2); //Se asigna correctamente
} catch (error) {
  console.log(error);
}
try {
  manager.assignAllergenToDish(dish3, allergen1); //Se asigna correctamente
} catch (error) {
  console.log(error);
}

const dishIterator5 = manager.getterDishes();

for (const dish of dishIterator5) {
  console.log(dish);
}

console.log("----DEASSIGN ALLERGEN TO DISH----");

try {
  manager.deassignAllergenToDish(null, allergen1); //Salta NullException
} catch (error) {
  console.log(error);
}

try {
  manager.deassignAllergenToDish(dish3, allergen2); //Se desasigna correctamente
} catch (error) {
  console.log(error);
}

const dishIterator6 = manager.getterDishes();

for (const dish of dishIterator6) {
  console.log(dish);
}

console.log("----ASSIGN DISH TO MENU----");
try {
  manager.assignDishToMenu(null, dish2); //Salta NullException
} catch (error) {
  console.log(error);
}

try {
  manager.assignDishToMenu(menu1, dish1); //Se asigna correctamente
} catch (error) {
  console.log(error);
}
try {
  manager.assignDishToMenu(menu1, dish6); //Se asigna correctamente
} catch (error) {
  console.log(error);
}

try {
  manager.assignDishToMenu(menu1, dish4); //Se asigna correctamente
} catch (error) {
  console.log(error);
}
try {
  manager.assignDishToMenu(menu2, dish3); //Se asigna correctamente
} catch (error) {
  console.log(error);
}

//PRUEBO AQUI EL CAMBIAR POSICIONES DE LOS PLATOS EN UN MENÚ
//Ya que aquí puedo ver todavía el dish1 que aparece bien y no undefined
try {
  manager.changeDishesPositionsInMenu(menu1, dish1, dish4); //El dish uno pasa de la posición 0 a la posición 2 correctamente
} catch (error) {
  console.log(error);
}

const menuIterator3 = manager.getterMenus();
//No se por que puedo ver desde el navegador el primer plato del menú, pero el segundo sale undefined???
for (const menu of menuIterator3) {
  console.log(menu);
}

console.log("----DEASSIGN DISH TO MENU----");

try {
  manager.deassignDishToMenu(null, dish2); //Salta NullException
} catch (error) {
  console.log(error);
}

try {
  manager.deassignDishToMenu(menu1, dish1); //Se desasigna correctamente
} catch (error) {
  console.log(error);
}

const menuIterator4 = manager.getterMenus();
//Solo queda 1 plato por menú, el problema es que sigue saliendo undefined...
for (const menu of menuIterator4) {
  console.log(menu);
}
