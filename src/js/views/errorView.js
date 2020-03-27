export const errorView = (error, parent) => {
	const markup = `
	<div class="error-view">
		<h2 class="error-view__title">Error processing recipes.</h2>
		<p class="error-view__msg">${error.message}</p>
	</div>
	`;

	parent.insertAdjacentHTML('afterbegin', markup);
};
