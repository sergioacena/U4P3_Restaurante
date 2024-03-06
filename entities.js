"use strict";

//Importación de excepciones - módulos

import {
  AbstractClassException,
  EmptyValueException,
  AlreadyExistsException,
  NotExistingException,
  NullException,
  NotRegisteredElementException,
  InvalidTypeException,
  InvalidLatitudeException,
  InvalidLongitudeException,
} from "./exception.js";

//LISTADO OBJETOS --

//1.Objeto Dish -- no lo pide pero he puesto categorías y alérgenos dentro para testear
class Dish {
  #name;
  #description;
  #ingredients;
  #image;
  #categories;
  constructor(name, description = "", ingredients = [], image = "") {
    this.#name = name;
    this.#description = description;
    this.#ingredients = ingredients;
    this.#image = image;
    this.#categories = [];
  }

  get name() {
    return this.#name;
  }

  set name(newName) {
    this.#name = newName;
  }

  get description() {
    return this.#description;
  }

  set description(newDescription) {
    this.#description = newDescription;
  }

  get ingredients() {
    return this.#ingredients;
  }

  set ingredients(newIngredients) {
    this.#ingredients = newIngredients;
  }

  get image() {
    return this.#image;
  }

  set image(newImage) {
    this.#image = newImage;
  }

  get categories() {
    return this.#categories;
  }

  set categories(newCategories) {
    this.#categories = newCategories;
  }

  //He modificado el toString para que me muestre las categorías para testeo (alérgenos aún no)
  toString() {
    let categoriesString = this.categories
      .map((category) => category.name)
      .join(", ");
    return `Dish: ${this.name}, Description: ${
      this.description
    }, Ingredients: ${this.ingredients.join(
      ", "
    )}, Categories: ${categoriesString}, Image: ${this.image}`;
  }
}

//2.Objeto Category
class Category {
  #name;
  #description;
  constructor(name, description = "") {
    this.#name = name;
    this.#description = description;
  }

  get name() {
    return this.#name;
  }

  set name(newName) {
    this.#name = newName;
  }

  get description() {
    return this.#description;
  }

  set description(newDescription) {
    this.#description = newDescription;
  }

  toString() {
    return `Category: ${this.#name}, Description: ${this.#description}`;
  }
}

//3.Objeto Allergen
class Allergen {
  #name;
  #description;
  constructor(name, description = "") {
    this.#name = name;
    this.#description = description;
  }

  get name() {
    return this.#name;
  }

  set name(newName) {
    this.#name = newName;
  }

  get description() {
    return this.#description;
  }

  set description(newDescription) {
    this.#description = newDescription;
  }

  toString() {
    return `Allergen: ${this.#name}, Description: ${this.#description}`;
  }
}

//4.Objeto Menu
class Menu {
  #name;
  #description;
  constructor(name, description = "") {
    this.#name = name;
    this.#description = description;
  }

  get name() {
    return this.#name;
  }

  set name(newName) {
    this.#name = newName;
  }

  get description() {
    return this.#description;
  }

  set description(newDescription) {
    this.#description = newDescription;
  }

  toString() {
    return `Menu: ${this.#name}, Description: ${this.#description}`;
  }
}

//5.Objeto Restaurant
class Restaurant {
  #name;
  #description;
  #location;
  constructor(name, description = "", location = undefined) {
    //Location debe ser opcional por lo que se pone undefined
    this.#name = name;
    this.#description = description;
    this.#location = location;
  }

  get name() {
    return this.#name;
  }

  set name(newName) {
    this.#name = newName;
  }

  get description() {
    return this.#description;
  }

  set description(newDescription) {
    this.#description = newDescription;
  }

  get location() {
    return this.#location;
  }

  set location(newLocation) {
    this.#location = newLocation;
  }

  toString() {
    //FORMA NO VÁLIDA SI QUEREMOS QUE LOCATION SEA OPCIONAL
    // return `Restaurant: ${this.#name}, Description: ${
    //   this.#description
    // }, Location: (${this.#location.latitude}, ${this.#location.longitude})`;

    //Hacemos a location un string, y en el caso de añadirse al crear el objeto se mostrará en el array
    let locationString = "";
    if (this.#location) {
      locationString = `, Location: (${this.#location.latitude}, ${
        this.#location.longitude
      })`;
    }
    //En el caso de no añadir una location, solo se mostrará el nombre y la descripción añadidos
    return `Restaurant: ${this.#name}, Description: ${
      this.#description
    }${locationString}`;
  }
}

//6.Objeto Coordinate
class Coordinate {
  #latitude;
  #longitude;
  constructor(latitude, longitude) {
    this.#latitude = latitude;
    this.#longitude = longitude;
  }

  get latitude() {
    return this.#latitude;
  }

  set latitude(newLatitude) {
    this.#latitude = newLatitude;
  }

  get longitude() {
    return this.#longitude;
  }

  set longitude(newLongitude) {
    this.#longitude = newLongitude;
  }
}

const RestaurantsManager = (function () {
  let instantiated;
  function init() {
    class RestaurantsManager {
      #name;
      #categories = []; //Los platos pueden pertenecer a mas de una categoría
      #allergens = []; //Cada plato puede tener más de un alérgeno
      #dishes = [];
      #menus = []; //Agregacion de platos
      #restaurants = [];

      //Creamos el constructor de RestaurantsManager
      constructor(
        name,
        categories = [],
        allergens = [],
        dishes = [],
        menus = [],
        restaurants = []
      ) {
        this.#name = name;
        this.#categories = categories;
        this.#allergens = allergens;
        this.#dishes = dishes;
        this.#menus = menus;
        this.#restaurants = restaurants;

        //Controlamos que el nombre no esté vacio
        if (this.#name === "") throw new EmptyValueException();
      }

      // get name() {
      //   return this.#name;
      // }

      // set name(value) {
      //   this.#name = value;
      // }

      //Iterador de categorías
      getCategories() {
        return this.#categories[Symbol.iterator]();
      }
      //Iterador de menús
      getMenu() {
        return this.#menus[Symbol.iterator]();
      }
      //Iterador de alérgenos
      getAllergen() {
        return this.#allergens[Symbol.iterator]();
      }
      //Iterador de restaurantes
      getRestaurants() {
        return this.#restaurants[Symbol.iterator]();
      }
      //Iterador de platos - NO LO PIDE PERO LO HAGO PARA LAS PRUEBAS DE ADD/REMOVE DISH
      getDish() {
        return this.#dishes[Symbol.iterator]();
      }

      //Cogemos la posicion de la categoría en el array
      #getCategoryPosition(category) {
        return this.#categories.findIndex((x) => x.name === category.name);
      }

      //Cogemos la posicion del menu en el array
      #getMenuPosition(menu) {
        return this.#menus.findIndex((x) => x.menu.name === menu.name);
      }

      //Cogemos la posicion del plato en el array
      #getDishPosition(dish) {
        return this.#dishes.findIndex((x) => x.dish.name === dish.name);
      }

      //Cogemos la posicion del alérgeno en el array
      #getAllergenPosition(allergen) {
        return this.#allergens.findIndex((x) => x.name === allergen.name);
      }

      //Cogemos la posicion del restaurante en el array
      #getRestaurantPosition(restaurant) {
        return this.#restaurants.findIndex((x) => x.name === restaurant.name);
      }

      //Adición de categorías

      // addCategory(elem) {
      //   if (!(elem instanceof Category) || elem == null)
      //     throw new InvalidTypeException(); //Lanza excepción en el caso de no ser una categoría o ser null
      //   for (const existingCategory of this.#categories) {
      //     if (existingCategory.name === elem.name) {
      //       throw new AlreadyExistsException(); //Lanza excepción en el caso de que la categoría ya exista
      //     }
      //   }
      //   this.#categories.push(elem); //Añade la categoría al array
      //   return this; //Se pueden encadenar llamadas
      // }

      addCategory(...categories) {
        for (const category of categories) {
          if (!(category instanceof Category) || category === null) {
            //Si lo introducido no es una categoría o es null, salta excepción
            throw new InvalidTypeException();
          }
          //Busca la posición de las categorías añadidas por parámetros
          const position = this.#getCategoryPosition(category);

          //Si la categoría no se encuentra, se añade en el manager
          if (position === -1) {
            this.#categories.push(category);
          } else {
            //Si existe alguna categoría con el mismo nombre, salta excepción
            throw new AlreadyExistsException();
          }
        }

        return this; //Se pueden encadenar llamadas
      }

      //Método que elimina categorías
      removeCategory(...categories) {
        for (const category of categories) {
          //Busca la posición de las categorías nombradas por parámetros
          const position = this.#getCategoryPosition(category);

          //Si la categoría no se encuentra, salta excepción, si no, la elimina
          if (position === -1) {
            throw new NotRegisteredElementException(); //Salta excepción si el elemento no está añadido ya
          } else {
            this.#categories.splice(position, 1); //Se elimina el elemento con el índice deseado del array
          }
        }

        return this; //Se pueden encadenar llamadas
      }

      //Adición de menús
      addMenu(...menus) {
        for (const menu of menus) {
          if (!(menu instanceof Menu) || menu == null)
            throw new InvalidTypeException(); //Lanza excepción en el caso de no ser un menú o ser null
          //Busca la posición de los menús añadidos por parámetros
          const position = this.#getMenuPosition(menu);

          //Si no se encuentra, se añade en el manager
          if (position === -1) {
            //Se añade tanto el menú como un array vacío de platos donde más adelante se añadirán los platos
            this.#menus.push({ menu, dishes: [] });
          } else {
            //Si existe algun elemento con el mismo nombre, salta excepción
            throw new AlreadyExistsException();
          }
        }
        return this; //Se pueden encadenar llamadas
      }

      //Eliminación de menús
      removeMenu(...menus) {
        for (const menu of menus) {
          const position = this.#getMenuPosition(menu);

          if (position === -1) {
            throw new NotRegisteredElementException(); //Salta excepción si el elemento no está añadido ya
          } else {
            this.#menus.splice(position, 1); //Se elimina el elemento con el índice deseado del array
          }
        }
        return this; //Se pueden encadenar llamadas
      }

      //ARREGLAR A PARTIR DE AQUI--------------------------------
      //Adición de alérgenos
      addAllergen(...allergens) {
        for (const allergen of allergens) {
          if (!(allergen instanceof Allergen) || allergen === null) {
            //Si lo introducido no es una alérgeno o es null, salta excepción
            throw new InvalidTypeException();
          }
          //Busca la posición de los alérgenos añadidas por parámetros
          const position = this.#getAllergenPosition(allergen);

          //Si el alérgeno no se encuentra, se añade en el manager
          if (position === -1) {
            this.#allergens.push(allergen);
          } else {
            //Si existe otro alérgeno con el mismo nombre, salta excepción
            throw new AlreadyExistsException();
          }
        }

        return this;
      }

      //Eliminación de alérgenos
      removeAllergen(...allergens) {
        for (const allergen of allergens) {
          const position = this.#getAllergenPosition(allergen);

          if (position === -1) {
            throw new NotRegisteredElementException(); //Salta excepción si el elemento no está añadido ya
          } else {
            this.#allergens.splice(position, 1); //Se elimina el elemento con el índice deseado del array
          }
        }
        return this; //Se pueden encadenar llamadas
      }

      // //Adición de platos
      // addDish(elem) {
      //   if (!(elem instanceof Dish) || elem == null)
      //     throw new InvalidTypeException(); //Lanza excepción en el caso de no ser un plato o ser null
      //   for (const existingDish of this.#dishes) {
      //     if (existingDish.name === elem.name) {
      //       throw new AlreadyExistsException(); //Lanza excepción en el caso de que el plato ya exista
      //     }
      //   }
      //   this.#dishes.push(elem); //Añade el plato al array
      //   return this; //Se pueden encadenar llamadas
      // }

      //Adición de platos
      addDish(...dishes) {
        for (const dish of dishes) {
          if (!(dish instanceof Dish) || dish == null)
            throw new InvalidTypeException(); //Lanza excepción en el caso de no ser un plato o ser null
          //Busca la posición de los platos añadidos por parámetros
          const position = this.#getDishPosition(dish);

          //Si no se encuentra, se añade en el manager
          if (position === -1) {
            //Se añade tanto el plato junto a un array de categorías y otro de alérgenos
            this.#dishes.push({ dish, categories: [], allergens: [] });
          } else {
            //Si existe algun elemento con el mismo nombre, salta excepción
            throw new AlreadyExistsException();
          }
        }
        return this; //Se pueden encadenar llamadas
      }

      // //Eliminación de platos
      // removeDish(elem) {
      //   const index = this.#dishes.findIndex(function (dishes) {
      //     //Se busca a través de un index el elemento deseado
      //     return dishes.name === elem.name;
      //   });

      //   if (index === -1) {
      //     throw new NotRegisteredElementException(); //Salta excepción si el elemento no está añadido ya
      //   } else {
      //     this.#dishes.splice(index, 1); //Se elimina el elemento con el índice deseado del array
      //   }

      //   return this; //Se pueden encadenar llamadas
      // }

      //Eliminación de platos
      removeDish(...dishes) {
        for (const dish of dishes) {
          const position = this.#getDishPosition(dish);

          if (position === -1) {
            throw new NotRegisteredElementException(); //Salta excepción si el elemento no está añadido ya
          } else {
            this.#dishes.splice(position, 1); //Se elimina el elemento con el índice deseado del array
          }
        }
        return this; //Se pueden encadenar llamadas
      }

      //Adición de restaurantes
      addRestaurant(...restaurant) {
        for (const restaurants of restaurant) {
          if (!(restaurants instanceof Restaurant) || restaurants === null) {
            //Si lo introducido no es un restaurante o es null, salta excepción
            throw new InvalidTypeException();
          }
          //Busca la posición de los restaurantes añadidas por parámetros
          const position = this.#getRestaurantPosition(restaurants);

          //Si el restaurante no se encuentra, se añade en el manager
          if (position === -1) {
            this.#restaurants.push(restaurants);
          } else {
            //Si existe otro elemento con el mismo nombre, salta excepción
            throw new AlreadyExistsException();
          }
        }

        return this;
      }

      //Eliminación de restaurantes
      removeRestaurant(...restaurant) {
        for (const restaurants of restaurant) {
          const position = this.#getRestaurantPosition(restaurants);

          if (position === -1) {
            throw new NotRegisteredElementException(); //Salta excepción si el elemento no está añadido ya
          } else {
            this.#restaurants.splice(position, 1); //Se elimina el elemento con el índice deseado del array
          }
        }
        return this; //Se pueden encadenar llamadas
      }

      // //Asignar categoría a un plato

      // assignCategoryToDish(category, dish) {
      //   if (category == null || dish == null) throw new NullException(); //Lanza excepción en el caso de ser null

      //   // Verificar si la categoría ya está registrada en el manager
      //   const categoryExists = this.#categories.some(
      //     (existingCategory) => existingCategory.name === category.name
      //   );

      //   if (!categoryExists) {
      //     this.addCategory(category);
      //     console.log(
      //       "La categoría no existía en la colección, por lo que se ha añadido."
      //     );
      //   }

      //   // Verificar si el plato ya está registrado en el manager
      //   const dishExists = this.#dishes.some(
      //     (existingDish) => existingDish.dish.name === dish.name
      //   );

      //   // Si el plato no existe, lo añade
      //   if (!dishExists) {
      //     this.addDish(dish);
      //     console.log(
      //       "El plato no existía en la colección, por lo que se ha añadido."
      //     );
      //   }

      //   // Obtener el plato correspondiente del array de platos
      //   const targetDish = this.#dishes.find(
      //     (existingDish) => existingDish.dish.name === dish.name
      //   );

      //   if (targetDish) {
      //     // Asignar la categoría al plato
      //     // Si el plato ya tiene una categoría, se usa ese valor, si no se asigna un array vacío
      //     targetDish.dish.categories = targetDish.dish.categories || [];
      //     targetDish.dish.categories.push(category);
      //     console.log("La categoría ha sido añadida al plato especificado.");
      //   } else {
      //     console.log("El plato ya contiene esta categoría.");
      //   }

      //   return this; //Se puede encadenar
      // }
      assignCategoryToDish(category, dish) {
        if (category == null || dish == null) throw new NullException(); // Lanza excepción en caso de ser null

        // Verificar si la categoría ya está registrada en el manager
        const categoryExists = this.#categories.some(
          (existingCategory) => existingCategory.name === category.name
        );

        if (!categoryExists) {
          this.addCategory(category);
          console.log(
            "La categoría no existía en la colección, por lo que se ha añadido."
          );
        }

        // Verificar si el plato ya está registrado en el manager
        let targetDishIndex = this.#dishes.findIndex(
          (existingDishObj) => existingDishObj.dish.name === dish.name
        );

        // Si el plato no existe, lo añade
        if (targetDishIndex === -1) {
          this.addDish(dish);
          console.log(
            "El plato no existía en la colección, por lo que se ha añadido."
          );
          // Actualizar el índice del plato después de añadirlo
          targetDishIndex = this.#dishes.findIndex(
            (existingDishObj) => existingDishObj.dish.name === dish.name
          );
        }

        // Obtener el plato correspondiente del array de platos
        const targetDishObj = this.#dishes[targetDishIndex];

        // Verificar si la categoría ya ha sido asignada al plato
        if (!targetDishObj.dish.categories.includes(category)) {
          targetDishObj.dish.categories.push(category); //Se usa la propiedad 'categories' del objeto Dish
          console.log("La categoría ha sido añadida al plato especificado.");
        } else {
          console.log("El plato ya contiene esta categoría.");
        }

        return this; // Se puede encadenar
      }

      // //Desasignar un plato de una categoría
      // deassignCategoryToDish(category, dish) {
      //   if (category == null || dish == null) throw new NullException(); //Lanza excepción en el caso de ser null
      //   //Si se encuentra una categoría con el mismo nombre que la introducida por parámetro, categoryExists será true
      //   const categoryExists = this.#categories.some(
      //     (existingCategory) => existingCategory.name === category.name
      //   );
      //   //lo mismo con dish
      //   const dishExists = this.#dishes.some(
      //     (existingDish) => existingDish.name === dish.name
      //   );

      //   if (!categoryExists || !dishExists) throw new NotExistingException(); //Lanza excepción en el caso de no estar implementada la categoría o plato
      //   if (categoryExists && dishExists) {
      //     //Encuentra la categoría a la que se debe desasignar el plato
      //     const targetCategory = this.#categories.find(
      //       (existingCategory) => existingCategory.name === category.name
      //     );

      //     //Verifica si el plato está asignado a la categoría
      //     if (
      //       targetCategory &&
      //       targetCategory.dishes &&
      //       targetCategory.dishes.includes(dish)
      //     ) {
      //       //Elimina el plato de la categoría
      //       targetCategory.dishes = targetCategory.dishes.filter(
      //         (existingDish) => existingDish.name !== dish.name
      //       );

      //       console.log(
      //         "El plato ha sido desasignado de la categoría indicada."
      //       );
      //     } else {
      //       console.log("El plato no está asignado a la categoría indicada.");
      //     }
      //   }

      //   return this;
      // }

      //TOSTRING - CATEGORIES
      toStringCategory(separator = "\n") {
        let str = "";
        for (const catObj of this.#categories) {
          const category = catObj;
          str += category + separator;
        }
        return str;
      }

      //TOSTRING - MENU
      toStringMenu(separator = "\n") {
        let str = "";
        for (const menuObj of this.#menus) {
          const menu = menuObj.menu;
          str += menu + separator;
          // for (const dishes of this.getCategoryProducts(category)) {
          //   // console.log(product.value.toString());
          //   str += product.toString() + separator;
          // }
        }
        return str;
      }

      //TOSTRING - ALLERGEN
      toStringAllergen(separator = "\n") {
        let str = "";
        for (const allObj of this.#allergens) {
          const allergen = allObj;
          str += allergen + separator;
        }
        return str;
      }

      //TOSTRING - DISHES
      toStringDish(separator = "\n") {
        let str = "";
        for (const dishObj of this.#dishes) {
          const dishes = dishObj.dish;
          str += dishes + separator; // Aquí se usa el método toString() de Dish directamente
        }
        return str;
      }

      //TOSTRING - RESTAURANT
      toStringRestaurant(separator = "\n") {
        let str = "";
        for (const restObj of this.#restaurants) {
          const restaurant = restObj;
          str += restaurant + separator;
        }
        return str;
      }
    }

    return new RestaurantsManager();
  }
  return {
    getInstance() {
      if (!instantiated) {
        instantiated = init();
      }
      return instantiated;
    },
  };
})();

//Exportación clases para testeo
export {
  Dish,
  Category,
  Allergen,
  Menu,
  Restaurant,
  Coordinate,
  RestaurantsManager,
};
