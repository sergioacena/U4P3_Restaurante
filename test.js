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

// //Obtenemos el iterador de las categorías
// const categoriesIterator1 = manager.getCategories();

// //Se recorren las categorías usando el iterador y se muestran en un toString
// for (const category of categoriesIterator1) {
//   console.log(category.toString());
// }

console.log(manager.toStringCategory());

console.log("----REMOVE CATEGORY----");
//AVISO -- hay que crear un iterador por cada vez que se quiera hacer toString u otra operación
//AVISO2 -- no es necesario, he encontrado otra forma (no se si mas limpia) de hacer los toString
// const categoriesIterator2 = manager.getCategories();
manager.removeCategory(category1); //Se elimina el elemento de la categoría sin problema

try {
  manager.removeCategory(category6); //Salta NotRegisteredElement, no se elimina nada
} catch (error) {
  console.log(error);
}

console.log(manager.toStringCategory());

// for (const category of categoriesIterator2) {
//   console.log(category.toString()); //Muestra todas las categorías
// }

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
// const menuIterator1 = manager.getMenu();

// for (const menu of menuIterator1) {
//   console.log(menu.toString());
// }

//Esto muestra bien los menús
console.log(manager.toStringMenu());

console.log("----REMOVE MENU----");
manager.removeMenu(menu1); //Se elimina el elemento del menú sin problema

try {
  manager.removeMenu(menu6); //Salta NotRegisteredElement, no se elimina nada
} catch (error) {
  console.log(error);
}

console.log(manager.toStringMenu());

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

// //Obtenemos el iterador de los alérgenos
// const allergenIterator1 = manager.getAllergen();

// for (const allergen of allergenIterator1) {
//   console.log(allergen.toString());
// }

console.log(manager.toStringAllergen());

console.log("----REMOVE ALLERGEN----");
// const allergenIterator2 = manager.getAllergen();
manager.removeAllergen(allergen1); //Se elimina el elemento de los alérgenos sin problema

try {
  manager.removeAllergen(allergen6); //Salta NotRegisteredElement, no se elimina nada
} catch (error) {
  console.log(error);
}

// for (const allergen of allergenIterator2) {
//   console.log(allergen.toString()); //Muestra todos los alérgenos
// }
console.log(manager.toStringAllergen());

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

//Obtenemos el iterador de los platos???????????? - no hay iterador en la practica (lo hago para probarlo - no sirve al final)
// const dishIterator1 = manager.getDish();

// for (const dish of dishIterator1) {
//   console.log(dish.toString());
// }

console.log(manager.toStringDish());

console.log("----REMOVE DISHES----");
// const dishIterator2 = manager.getDish();
manager.removeDish(dish2); //Se elimina el elemento de la categoría sin problema

try {
  manager.removeDish(dish6); //Salta NotRegisteredElement, no se elimina nada
} catch (error) {
  console.log(error);
}

// for (const dish of dishIterator2) {
//   console.log(dish.toString()); //Muestra todos los platos
// }

console.log(manager.toStringDish());

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

console.log(manager.toStringRestaurant());

// //Obtenemos el iterador de los restaurantes
// const restaurantIterator1 = manager.getRestaurants();

// for (const restaurant of restaurantIterator1) {
//   console.log(restaurant.toString());
// }

console.log("----REMOVE RESTAURANT----");
// const restaurantIterator2 = manager.getRestaurants();
manager.removeRestaurant(restaurant1); //Se elimina el elemento de la categoría sin problema

try {
  manager.removeRestaurant(restaurant3); //Salta NotRegisteredElement, no se elimina nada
} catch (error) {
  console.log(error);
}

// for (const restaurant of restaurantIterator2) {
//   console.log(restaurant.toString()); //Muestra todos los restaurantes
// }

console.log(manager.toStringRestaurant());

console.log("----ASSIGN CATEGORY TO DISH----");
try {
  manager.assignCategoryToDish(category2); //Salta NullException
} catch (error) {
  console.log(error);
}

try {
  manager.assignCategoryToDish(dish2); //Salta NullException de nuevo
} catch (error) {
  console.log(error);
}

try {
  manager.assignCategoryToDish(category2, dish1); //Se añade la categoría correctamente al plato 1
} catch (error) {
  console.log(error);
}

try {
  manager.assignCategoryToDish(category3, dish1); //Se añade una categoría que no existía al plato1
} catch (error) {
  console.log(error);
}

try {
  manager.assignCategoryToDish(category3, dish3); //Se añade una categoría a un plato que no existía en el sistema
} catch (error) {
  console.log(error);
}

try {
  manager.assignCategoryToDish(category3, dish3); //No deja añadir la categoría ya que se añadió previamente
} catch (error) {
  console.log(error);
}

console.log(manager.toStringDish()); //Se muestran las categorías correctamente dentro de los platos

// console.log("----DEASSIGN CATEGORY TO DISH----");
// try {
//   manager.deassignCategoryToDish(category2); //Salta NullException
// } catch (error) {
//   console.log(error);
// }

// try {
//   manager.deassignCategoryToDish(category2, dish1); //Salta NullException de nuevo
// } catch (error) {
//   console.log(error);
// }

// try {
//   manager.deassignCategoryToDish(category2, dish2); //NO SE DESASIGNA CORRECTAMENTE
// } catch (error) {
//   console.log(error);
// }
