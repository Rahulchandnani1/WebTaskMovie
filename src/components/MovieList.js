import React from 'react';

const MovieList = (props) => {
	const FavouriteComponent = props.favouriteComponent;

	return (
		<>
			{props.movies.map((movie, index) => (
				<div className='image-container' tabIndex="0">
					<img src={movie.Poster} alt={`Poster of ${movie.Title}`}></img>
					<p>{movie.Title}</p>
					<p>{movie.Year}</p>
					<div
						onClick={() => props.handleFavouritesClick(movie)}
						className='overlay'
						role="button"
						aria-pressed="false"
					>
						<FavouriteComponent />
					</div>
				</div>
			))}
		</>
	);
};

export default MovieList;
