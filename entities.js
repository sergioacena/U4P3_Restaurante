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

//1.Objeto Dish
class Dish {
  #name;
  #description;
  #ingredients;
  #image;
  constructor(name, description = "", ingredients = [], image = "") {
    this.#name = name;
    this.#description = description;
    this.#ingredients = ingredients;
    this.#image = image;
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

  toString() {
    return `Dish: ${this.#name}, Description: ${
      this.#description
    }, Ingredients: ${this.#ingredients.join(", ")}, Image: ${this.#image}`;
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

          //Si el menú no se encuentra, se añade en el manager
          if (position === -1) {
            //Se añade tanto el menú como un array vacío de platos donde más adelante se añadirán los platos
            this.#menus.push({ menu, dishes: [] });
          } else {
            //Si existe algun menú con el mismo nombre, salta excepción
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
            this.#menus.splice(index, 1); //Se elimina el elemento con el índice deseado del array
          }
        }
        return this; //Se pueden encadenar llamadas
      }

      //Adición de alérgenos
      addAllergen(elem) {
        if (!(elem instanceof Allergen) || elem == null)
          throw new InvalidTypeException(); //Lanza excepción en el caso de no ser un alérgeno o ser null
        for (const existingAllergen of this.#allergens) {
          if (existingAllergen.name === elem.name) {
            throw new AlreadyExistsException(); //Lanza excepción en el caso de que el alérgeno ya exista
          }
        }
        this.#allergens.push(elem); //Añade el alérgeno al array
        return this; //Se pueden encadenar llamadas
      }

      //Eliminación de alérgenos
      removeAllergen(elem) {
        const index = this.#allergens.findIndex(function (allergen) {
          //Se busca a través de un index el elemento deseado
          return allergen.name === elem.name;
        });

        if (index === -1) {
          throw new NotRegisteredElementException(); //Salta excepción si el elemento no está añadido ya
        } else {
          this.#allergens.splice(index, 1); //Se elimina el elemento con el índice deseado del array
        }

        return this; //Se pueden encadenar llamadas
      }

      //Adición de platos
      addDish(elem) {
        if (!(elem instanceof Dish) || elem == null)
          throw new InvalidTypeException(); //Lanza excepción en el caso de no ser un plato o ser null
        for (const existingDish of this.#dishes) {
          if (existingDish.name === elem.name) {
            throw new AlreadyExistsException(); //Lanza excepción en el caso de que el plato ya exista
          }
        }
        this.#dishes.push(elem); //Añade el plato al array
        return this; //Se pueden encadenar llamadas
      }

      //Eliminación de platos
      removeDish(elem) {
        const index = this.#dishes.findIndex(function (dishes) {
          //Se busca a través de un index el elemento deseado
          return dishes.name === elem.name;
        });

        if (index === -1) {
          throw new NotRegisteredElementException(); //Salta excepción si el elemento no está añadido ya
        } else {
          this.#dishes.splice(index, 1); //Se elimina el elemento con el índice deseado del array
        }

        return this; //Se pueden encadenar llamadas
      }

      //Adición de restaurantes
      addRestaurant(elem) {
        if (!(elem instanceof Restaurant) || elem == null)
          throw new InvalidTypeException(); //Lanza excepción en el caso de no ser un restaurante o ser null
        for (const existingRestaurant of this.#restaurants) {
          if (existingRestaurant.name === elem.name) {
            throw new AlreadyExistsException(); //Lanza excepción en el caso de que el restaurante ya exista
          }
        }
        this.#restaurants.push(elem); //Añade el restaurante al array
        return this; //Se pueden encadenar elementos en este método
      }

      //Eliminación de restaurantes
      removeRestaurant(elem) {
        const index = this.#restaurants.findIndex(function (restaurant) {
          //Se busca a través de un index el elemento deseado
          return restaurant.name === elem.name;
        });

        if (index === -1) {
          throw new NotRegisteredElementException(); //Salta excepción si el elemento no está añadido ya
        } else {
          this.#restaurants.splice(index, 1); //Se elimina el elemento con el índice deseado del array
        }

        return this; //Se pueden encadenar llamadas
      }

      // //Asignar categoría a un plato
      // assignCategoryToDish(category, dish) {
      //   if (category == null || dish == null) throw new NullException(); //Lanza excepción en el caso de ser null

      //   // const categoryExists = this.#categories.some(function(existingCategory) {
      //   //   return existingCategory.name === category.name;
      //   // });

      //   //Verifica si la categoría y el plato existen en el sistema --- arrow functions
      //   //Si se encuentra una categoría con el mismo nombre que la introducida por parámetro, categoryExists será true
      //   const categoryExists = this.#categories.some(
      //     (existingCategory) => existingCategory.name === category.name
      //   );
      //   //lo mismo con dish
      //   const dishExists = this.#dishes.some(
      //     (existingDish) => existingDish.name === dish.name
      //   );

      //   //Si la categoría no existe, la agregamos al sistema
      //   if (!categoryExists) {
      //     this.addCategory(category);
      //     console.log("Se ha añadido la nueva categoría al sistema.");
      //   }

      //   //Si el plato no existe, lo agregamos al sistema
      //   if (!dishExists) {
      //     this.addDish(dish);
      //     console.log("Se ha añadido el nuevo plato al sistema.");
      //   }

      //   //Asignar la categoría al plato
      //   //Si el plato ya tiene una categoría, se usa ese valor, si no se asigna un array vacío
      //   dish.categories = dish.categories || [];
      //   dish.categories.push(category);
      //   console.log("La categoría ha sido añadida al plato especificado.");

      //   return this; //Se puede encadenar
      // }

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
