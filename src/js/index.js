// Global app controller
import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import { errorView } from './views/errorView';
import { elements, renderLoader, clearLoader } from './views/base';

/**
 * Global state of the app
 * - Search object
 * - Current recipe object
 * - Shopping list object
 * - Like recipes object
 */
const state = {};

/**
 * SEARCH CONTROLLER
 */
const controlSearch = async () => {
	// 1. Get query from view
	const query = searchView.getInput();

	if (query) {
		// 2. New search object and add to state
		state.search = new Search(query);

		//3. Prepare UI for results and clear input
		searchView.clearInput();
		searchView.clearResults();
		renderLoader(elements.searchResults);
		try {
			//4. Search for recipes
			await state.search.getResults();

			//5. Remove loader and render results on UI
			clearLoader();

			searchView.renderResults(state.search.result);
		} catch (error) {
			searchView.clearResults();
			errorView(error, elements.searchResultList);
			clearLoader();
		}
	}
};

elements.searchForm.addEventListener('submit', e => {
	e.preventDefault();
	controlSearch();
});

elements.searchResPages.addEventListener('click', e => {
	const btn = e.target.closest('.btn-inline');
	if (btn) {
		const goToPage = parseInt(btn.dataset.goto, 10);
		searchView.clearResults();
		searchView.renderResults(state.search.result, goToPage);
	}
});

/**
 * RECIPE CONTROLLER
 */
const controlRecipe = async () => {
	//Get Id from URL
	const id = window.location.hash.replace('#', '').trim();

	if (id) {
		//Prepare UI for changes
		recipeView.clearRecipe();
		renderLoader(elements.recipe);

		//Highlight selected recipe
		if (state.search) searchView.highlightSelected(id);

		//Create new recipe object
		state.recipe = new Recipe(id);

		try {
			//Render the recipe and parse ingredients
			await state.recipe.getRecipe();
			state.recipe.parseIngredients();

			//Calclate serving and time
			state.recipe.calcServings();
			state.recipe.calcTime();

			//Render recipe
			clearLoader();
			recipeView.renderRecipe(state.recipe);
		} catch (error) {
			console.log(error);

			searchView.clearResults();
			errorView(error, elements.recipe);
			clearLoader();
		}
	}
};
['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));
