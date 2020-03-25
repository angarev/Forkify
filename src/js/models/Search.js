import axios from 'axios';

class Search {
	constructor(query) {
		this.query = query;
	}

	/**
	 * Get search data from API response
	 */
	async getResults() {
		try {
			const res = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
			this.result = res.data.recipes;
		} catch (error) {
			alert(error);
		}
	}
}

export default Search;
