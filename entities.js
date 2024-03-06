"use strict";

//Importación de excepciones - módulos

import {
  AbstractClassException,
  InvalidAccessConstructorException,
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
    return `Nombre: ${this.#name} , Descripción: ${
      this.#description
    } , Ingredientes: ${this.#ingredients.join(", ")} , Imagen: ${this.#image}`;
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
        if (!new.target) throw new InvalidAccessConstructorException();

        this.#name = name;
        this.#categories = categories;
        this.#allergens = allergens;
        this.#dishes = dishes;
        this.#menus = menus;
        this.#restaurants = restaurants;

        //Controlamos que el nombre no esté vacio
        if (this.#name === "") throw new EmptyValueException();
      }

      //Iterador de categorías
      *getterCategories() {
        for (let i = 0; i < this.#categories.length; i++) {
          yield this.#categories[i];
        }
      }
      //Iterador de menús
      *getterMenus() {
        for (let i = 0; i < this.#menus.length; i++) {
          yield this.#menus[i];
        }
      }
      //Iterador de alérgenos
      *getterAllergens() {
        for (let i = 0; i < this.#allergens.length; i++) {
          yield this.#allergens[i];
        }
      }
      //Iterador de restaurantes
      *getterRestaurants() {
        for (let i = 0; i < this.#restaurants.length; i++) {
          yield this.#restaurants[i];
        }
      }
      //Iterador de platos - NO LO PIDE PERO LO HAGO PARA LOS TESTEOS
      *getterDishes() {
        for (let i = 0; i < this.#dishes.length; i++) {
          yield this.#dishes[i];
        }
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

        return this;
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

        return this;
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
        return this;
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
        return this;
      }

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
        return this;
      }

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
        return this;
      }

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
        return this;
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
        return this;
      }

      //Asignar categoría a un plato
      assignCategoryToDish(dish, ...categories) {
        if (dish == null) throw new NullException(); //Si el plato es null salta excepción

        let positionD = this.#getDishPosition(dish);

        if (positionD === -1) {
          this.addDish(dish); //Si el plato no existe, hay que crearlo
          positionD = this.#getDishPosition(dish);
          console.log("Se ha creado un plato que no existía.");
        }

        for (const category of categories) {
          if (category == null) throw new NullException(); //Si la categoría es null salta excepción

          let positionC = this.#getCategoryPosition(category);
          if (positionC === -1) {
            this.addCategory(category); //Si la categoría no existe, hay que crearla
            console.log("Se ha creado una categoría que no existía.");
          }

          //Se asigna la categoría al plato según su posición
          this.#dishes[positionD].categories.push(category);
        }

        return this;
      }

      //Desasignar una categoría de un plato
      deassignCategoryToDish(dish, ...categories) {
        if (!(dish instanceof Dish) || dish == null) throw new NullException(); //Si el plato es null salta excepción

        let positionD = this.#getDishPosition(dish);
        if (positionD === -1) {
          throw new NotRegisteredElementException(); //Si no existe el plato, salta excepción
        }

        for (const category of categories) {
          if (!(category instanceof Category) || category == null)
            throw new NullException(); //Si la categoría es null salta excepción

          let positionC = this.#getCategoryPosition(category);
          if (positionC === -1) {
            throw new NotRegisteredElementException(); //Si no existe la categoría, salta excepción
          }

          //Se asigna la categoría al plato según su posición
          this.#dishes[positionD].categories.splice(positionC, 1);
        }

        return this;
      }

      //Asignación de alérgeno a un plato
      assignAllergenToDish(dish, ...allergens) {
        if (dish == null) throw new NullException(); //Si el plato es null salta excepción

        let positionD = this.#getDishPosition(dish);

        if (positionD === -1) {
          this.addDish(dish); //Si el plato no existe, hay que crearlo
          positionD = this.#getDishPosition(dish);
        }

        for (const allergen of allergens) {
          if (allergen == null) throw new NullException(); //Si el alérgeno es null salta excepción

          let positionA = this.#getAllergenPosition(allergen);
          if (positionA === -1) {
            this.addAllergen(allergen); //Si el alérgeno no existe, hay que crearlo
          }

          //Se asigna el alérgeno al plato según su posición
          this.#dishes[positionD].allergens.push(allergen);
        }

        return this;
      }
      //Desasignar un alérgeno de un plato
      deassignAllergenToDish(dish, ...allergens) {
        if (!(dish instanceof Dish) || dish == null) throw new NullException(); //Si el plato es null salta excepción

        let positionD = this.#getDishPosition(dish);
        if (positionD === -1) {
          throw new NotRegisteredElementException(); //Si no existe el plato, salta excepción
        }

        for (const allergen of allergens) {
          if (!(allergen instanceof Allergen) || allergen == null)
            throw new NullException(); //Si el alérgeno es null salta excepción

          let positionA = this.#getAllergenPosition(allergen);
          if (positionA === -1) {
            throw new NotRegisteredElementException(); //Si no existe el alérgeno, salta excepción
          }

          //Se desasigna el alérgeno del plato
          this.#dishes[positionD].allergens.splice(positionA, 1);
        }

        return this;
      }
      //Asignar un plato a un menú
      assignDishToMenu(menu, ...dishes) {
        if (menu == null) throw new NullException(); //Si el menu es null salta excepción

        let positionM = this.#getMenuPosition(menu);

        if (positionM === -1) {
          this.addMenu(menu); //Si el menu no existe, hay que crearlo
          positionM = this.#getMenuPosition(menu);
        }

        for (const dish of dishes) {
          if (dish == null) throw new NullException(); //Si el plato es null salta excepción

          let positionD = this.#getDishPosition(dish);
          if (positionD === -1) {
            this.addDish(dish); //Si el plato no existe, hay que crearlo
          }

          //Se asigna el plato al menú según su posición
          this.#menus[positionM].dishes.push(this.#dishes[positionD]);
        }

        return this;
      }

      //Desasignar un plato de un menú
      deassignDishToMenu(menu, ...dishes) {
        if (!(menu instanceof Menu) || menu == null) throw new NullException(); //Si el menu es null salta excepción

        let positionM = this.#getMenuPosition(menu);
        if (positionM === -1) {
          throw new NotRegisteredElementException(); //Si no existe el menu, salta excepción
        }

        for (const dish of dishes) {
          if (!(dish instanceof Dish) || dish == null)
            throw new NullException(); //Si el plato es null salta excepción

          let positionD = this.#getDishPosition(dish);
          if (positionD === -1) {
            throw new NotRegisteredElementException(); //Si no existe el plato, salta excepción
          }

          //Se desasigna el plato del menú
          this.#menus[positionM].dishes.splice(positionD, 1);
        }

        return this;
      }

      //ESTOS TOSTRING LOS HICE POR PROBAR PERO NO ERAN NECESARIOS PARA TESTEOS
      //TOSTRING - CATEGORIES
      //   toStringCategory(separator = "\n") {
      //     let str = "";
      //     for (const catObj of this.#categories) {
      //       const category = catObj;
      //       str += category + separator;
      //     }
      //     return str;
      //   }

      //   //TOSTRING - MENU
      //   toStringMenu(separator = "\n") {
      //     let str = "";
      //     for (const menuObj of this.#menus) {
      //       const menu = menuObj.menu;
      //       str += menu + separator;
      //       // for (const dishes of this.getCategoryProducts(category)) {
      //       //   // console.log(product.value.toString());
      //       //   str += product.toString() + separator;
      //       // }
      //     }
      //     return str;
      //   }

      //   //TOSTRING - ALLERGEN
      //   toStringAllergen(separator = "\n") {
      //     let str = "";
      //     for (const allObj of this.#allergens) {
      //       const allergen = allObj;
      //       str += allergen + separator;
      //     }
      //     return str;
      //   }

      //   //TOSTRING - DISHES
      //   toStringDish(separator = "\n") {
      //     let str = "";
      //     for (const dishObj of this.#dishes) {
      //       const dishes = dishObj.dish;
      //       str += dishes + separator; // Aquí se usa el método toString() de Dish directamente
      //     }
      //     return str;
      //   }

      //   //TOSTRING - RESTAURANT
      //   toStringRestaurant(separator = "\n") {
      //     let str = "";
      //     for (const restObj of this.#restaurants) {
      //       const restaurant = restObj;
      //       str += restaurant + separator;
      //     }
      //     return str;
      //   }
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
