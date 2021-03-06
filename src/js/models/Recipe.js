import axios from 'axios';

class Recipe {
	constructor(id) {
		this.id = id;
	}

	async getRecipe() {
		try {
			const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
			this.title = res.data.recipe.title;
			this.author = res.data.recipe.publisher;
			this.img = res.data.recipe.image_url;
			this.url = res.data.recipe.source_url;
			this.ingredients = res.data.recipe.ingredients;
		} catch (error) {
			console.log(error);
		}
	}

	calcTime() {
		//Assuming that we need 15 min for each 3 ingredients
		const numberIngredients = this.ingredients.length;
		const periods = Math.ceil(numberIngredients / 3);
		this.time = periods * 15;
	}

	calcServings() {
		this.servings = 4;
	}

	parseIngredients() {
		const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds'];
		const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
		const units = [...unitsShort, 'kg', 'g'];

		const newIngredients = this.ingredients.map(el => {
			//1. Uniform units
			let ingredient = el.toLowerCase();
			unitsLong.forEach((unit, index) => {
				ingredient = ingredient.replace(unit, units[index]);
			});
			//2. Remove parentheses
			ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

			//3.Parse ingredients into count, unit and ingredient
			const arrIngredient = ingredient.split(' ');
			const unitIndex = arrIngredient.findIndex(el2 => unitsShort.includes(el2));

			let objIngredient;
			if (unitIndex > -1) {
				const arrCount = arrIngredient.slice(0, unitIndex);
				let count;
				if (arrCount.length === 1) {
					count = eval(arrIngredient[0].replace('-', '+'));
				} else {
					count = eval(arrIngredient.slice(arrIngredient[0], unitIndex).join('+'));
				}
				objIngredient = {
					count,
					unit: arrIngredient[unitIndex],
					ingredient: arrIngredient.slice(unitIndex + 1).join(' ')
				};
			} else if (parseInt(arrIngredient[0], 10)) {
				objIngredient = {
					count: parseInt(arrIngredient[0], 10),
					unit: '',
					ingredient: arrIngredient.slice(1).join(' ')
				};
			} else if (unitIndex === -1) {
				objIngredient = {
					count: 1,
					unit: '',
					ingredient
				};
			}

			return objIngredient;
		});
		this.ingredients = newIngredients;
	}

	updateServings(type) {
		//Servings
		const newServings = type === 'dec' ? this.servings - 1 : this.servings + 1;

		//Ingredients
		this.ingredients.forEach(ing => {
			ing.count *= newServings / this.servings;
		});

		this.servings = newServings;
	}
}

export default Recipe;
