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
  constructor(name, description = "", location) {
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
    return `Restaurant: ${this.#name}, Description: ${
      this.#description
    }, Location: (${this.#location.latitude}, ${this.#location.longitude})`;
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

      //Creamos el constructor de RestaurantsManager con solo el nombre
      constructor(name) {
        this.#name = name;

        //Controlamos que el nombre no esté vacio
        if ((this.#name = "")) throw new EmptyValueException();
      }

      get name() {
        return this.#name;
      }

      set name(value) {
        this.#name = value;
      }

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

      //Método creado para poder añadir categorías
      addCategory(elem) {
        if (!(elem instanceof Category) || elem == null)
          throw new InvalidTypeException(); //Lanza excepción en el caso de no ser una categoría o ser null
        for (const existingCategory of this.#categories) {
          if (existingCategory.name === elem.name) {
            throw new AlreadyExistsException(); //Lanza excepción en el caso de que la categoría ya exista
          }
        }
        this.#categories.push(elem); //Añade la categoría al array
        return this; //Se pueden encadenar elementos en este método
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
