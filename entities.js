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
      //Iterador de platos - NO LO PIDE PERO LO HAGO PARA LAS PRUEBAS DE ADD/REMOVE DISH
      getDish() {
        return this.#dishes[Symbol.iterator]();
      }

      //Adición de categorías
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

      //Método que elimina categorías
      removeCategory(elem) {
        const index = this.#categories.findIndex(function (category) {
          //Se busca a través de un index el elemento deseado
          return category.name === elem.name;
        });

        if (index === -1) {
          throw new NotRegisteredElementException(); //Salta excepción si el elemento no está añadido ya
        } else {
          this.#categories.splice(index, 1); //Se elimina el elemento con el índice deseado del array
        }

        return this; //Se pueden encadenar elementos en este método
      }

      //Adición de menús
      addMenu(elem) {
        if (!(elem instanceof Menu) || elem == null)
          throw new InvalidTypeException(); //Lanza excepción en el caso de no ser una categoría o ser null
        for (const existingMenu of this.#menus) {
          if (existingMenu.name === elem.name) {
            throw new AlreadyExistsException(); //Lanza excepción en el caso de que la categoría ya exista
          }
        }
        this.#menus.push(elem); //Añade el menú al array
        return this; //Se pueden encadenar elementos en este método
      }

      //Eliminación de menús
      removeMenu(elem) {
        const index = this.#menus.findIndex(function (menu) {
          //Se busca a través de un index el elemento deseado
          return menu.name === elem.name;
        });

        if (index === -1) {
          throw new NotRegisteredElementException(); //Salta excepción si el elemento no está añadido ya
        } else {
          this.#menus.splice(index, 1); //Se elimina el elemento con el índice deseado del array
        }

        return this; //Se pueden encadenar elementos en este método
      }

      //Adición de alérgenos
      addAllergen(elem) {
        if (!(elem instanceof Allergen) || elem == null)
          throw new InvalidTypeException(); //Lanza excepción en el caso de no ser una categoría o ser null
        for (const existingAllergen of this.#allergens) {
          if (existingAllergen.name === elem.name) {
            throw new AlreadyExistsException(); //Lanza excepción en el caso de que la categoría ya exista
          }
        }
        this.#allergens.push(elem); //Añade el menú al array
        return this; //Se pueden encadenar elementos en este método
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

        return this; //Se pueden encadenar elementos en este método
      }

      //Adición de platos
      addDish(elem) {
        if (!(elem instanceof Dish) || elem == null)
          throw new InvalidTypeException(); //Lanza excepción en el caso de no ser una categoría o ser null
        for (const existingDish of this.#dishes) {
          if (existingDish.name === elem.name) {
            throw new AlreadyExistsException(); //Lanza excepción en el caso de que la categoría ya exista
          }
        }
        this.#dishes.push(elem); //Añade el menú al array
        return this; //Se pueden encadenar elementos en este método
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

        return this; //Se pueden encadenar elementos en este método
      }

      //Adición de restaurantes
      addRestaurant(elem) {
        if (!(elem instanceof Restaurant) || elem == null)
          throw new InvalidTypeException(); //Lanza excepción en el caso de no ser una categoría o ser null
        for (const existingRestaurant of this.#restaurants) {
          if (existingRestaurant.name === elem.name) {
            throw new AlreadyExistsException(); //Lanza excepción en el caso de que la categoría ya exista
          }
        }
        this.#restaurants.push(elem); //Añade el menú al array
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
