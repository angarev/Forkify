import { elements } from './base';
import { Fraction } from 'fractional';

export const clearRecipe = () => (elements.recipe.innerHTML = '');

const formatCount = count => {
	if (count) {
		// count = 2.5 ---> 2 1/2
		const [int, dec] = count
			.toString()
			.split('.')
			.map(el => parseInt(el, 10));
		if (!dec) return count;
		if (int === 0) {
			const fr = new Fraction(count);
			return `${fr.numerator}/${fr.denominator}`;
		} else {
			const fr = new Fraction(count - int);
			return `${int} ${fr.numerator}/${fr.denominator}`;
		}
	}
	return 'n/a';
};

const createIngredient = ingredient => ` 
                    <li class="recipe__item">
                        <svg class="recipe__icon">
                            <use href="img/icons.svg#icon-check"></use>
                        </svg>
                        <div class="recipe__count">${formatCount(ingredient.count)}</div>
                        <div class="recipe__ingredient">
                            <span class="recipe__unit">${ingredient.unit}</span>
                            ${ingredient.ingredient}
                        </div>
                    </li>`;

export const renderRecipe = recipe => {
	const markup = `
            <figure class="recipe__fig">
                <img src="${recipe.img}" alt="${recipe.title}" class="recipe__img">
                <h1 class="recipe__title">
                    <span>${recipe.title}</span>
                </h1>
            </figure>

            <div class="recipe__details">
                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                        <use href="img/icons.svg#icon-stopwatch"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--minutes">${recipe.time}</span>
                    <span class="recipe__info-text"> minutes</span>
                </div>
                <div class="recipe__info">
                    <svg class="recipe__info-icon">
                        <use href="img/icons.svg#icon-man"></use>
                    </svg>
                    <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
                    <span class="recipe__info-text"> servings</span>

                    <div class="recipe__info-buttons">
                        <button class="btn-tiny">
                            <svg>
                                <use href="img/icons.svg#icon-circle-with-minus"></use>
                            </svg>
                        </button>
                        <button class="btn-tiny">
                            <svg>
                                <use href="img/icons.svg#icon-circle-with-plus"></use>
                            </svg>
                        </button>
                    </div>

                </div>
                <button class="recipe__love">
                    <svg class="header__likes">
                        <use href="img/icons.svg#icon-heart-outlined"></use>
                    </svg>
                </button>
            </div>

            <div class="recipe__ingredients">
                <ul class="recipe__ingredient-list">
                    ${recipe.ingredients.map(el => createIngredient(el)).join('')}
                </ul>

                <button class="btn-small recipe__btn">
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-shopping-cart"></use>
                    </svg>
                    <span>Add to shopping list</span>
                </button>
            </div>

            <div class="recipe__directions">
                <h2 class="heading-2">How to cook it</h2>
                <p class="recipe__directions-text">
                    This recipe was carefully designed and tested by
                    <span class="recipe__by">${recipe.author}</span>. Please check out directions at their website.
                </p>
                <a class="btn-small recipe__btn" href="${recipe.url}" target="_blank">
                    <span>Directions</span>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-right"></use>
                    </svg>

                </a>
            </div>
        </div>

        <div class="shopping">
            <h2 class="heading-2">My Shopping List</h2>

            <ul class="shopping__list">

                <!--
                <li class="shopping__item">
                    <div class="shopping__count">
                        <input type="number" value="500" step="100">
                        <p>g</p>
                    </div>
                    <p class="shopping__description">Pasta</p>
                    <button class="shopping__delete btn-tiny">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-cross"></use>
                        </svg>
                    </button>
                </li>

                <li class="shopping__item">
                    <div class="shopping__count">
                        <input type="number" value="0.5" step="0.1">
                        <p>cup</p>
                    </div>
                    <p class="shopping__description">Ricotta cheese</p>
                    <button class="shopping__delete btn-tiny">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-cross"></use>
                        </svg>
                    </button>
                </li>

                <li class="shopping__item">
                    <div class="shopping__count">
                        <input type="number" value="3.5" step="0.1">
                        <p>tbsp</p>
                    </div>
                    <p class="shopping__description">Toasted almond slices</p>
                    <button class="shopping__delete btn-tiny">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-cross"></use>
                        </svg>
                    </button>
                </li>

                <li class="shopping__item">
                    <div class="shopping__count">
                        <input type="number" value="0.5" step="0.1">
                        <p>tbsp</p>
                    </div>
                    <p class="shopping__description">Sea salt</p>
                    <button class="shopping__delete btn-tiny">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-cross"></use>
                        </svg>
                    </button>
                </li>

                <li class="shopping__item">
                    <div class="shopping__count">
                        <input type="number" value="0.25" step="0.1">
                        <p>cup</p>
                    </div>

                    <p class="shopping__description">Minced green onions</p>
                    <button class="shopping__delete btn-tiny">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-cross"></use>
                        </svg>
                    </button>
                </li>

                <li class="shopping__item">
                    <div class="shopping__count">
                        <input type="number" value="45" step="10">
                        <p>g</p>
                    </div>
                    <p class="shopping__description">Sesame seeds</p>
                    <button class="shopping__delete btn-tiny">
                        <svg>
                            <use href="img/icons.svg#icon-circle-with-cross"></use>
                        </svg>
                    </button>
                </li>
    `;

	elements.recipe.insertAdjacentHTML('afterbegin', markup);
};
