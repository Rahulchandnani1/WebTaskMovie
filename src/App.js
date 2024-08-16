import React, { useState, useEffect } from 'react';
import './App.css';
import MovieList from './components/MovieList';
import MovieListHeading from './components/MovieListHeading';
import SearchBox from './components/SearchBox';
import AddFavourites from './components/AddFavourites';
import RemoveFavourites from './components/RemoveFavourites';
import FilterOptions from './FilterOptions';
const App = () => {
	const [movies, setMovies] = useState([]);
	const [favourites, setFavourites] = useState([]);
	const [searchValue, setSearchValue] = useState('bhai');
	const [filters, setFilters] = useState({
		yearRange: [2000, new Date().getFullYear()],
	});

	
	const [page, setPage] = useState(1);
	const [loading, setLoading] = useState(false);

	const getMovieRequest = async (searchValue, page) => {
		setLoading(true);
		const url = `http://www.omdbapi.com/?s=${searchValue}&page=${page}&apikey=26b0fef1`;

		const response = await fetch(url);
		const responseJson = await response.json();

		if (responseJson.Search) {
			const filteredMovies = applyFilters(responseJson.Search);
			setMovies((prevMovies) => [...prevMovies, ...filteredMovies]);
		}
		setLoading(false);
	};

	useEffect(() => {
		setMovies([]);
		setPage(1); 
		getMovieRequest(searchValue, 1);
	}, [searchValue, filters]);
	useEffect(() => {
		const movieFavourites = JSON.parse(
			localStorage.getItem('react-movie-app-favourites')
		);

		if (movieFavourites) {
			setFavourites(movieFavourites);
		}
	}, []);
	useEffect(() => {
		const handleScroll = () => {
			if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100) {
				if (!loading) {
					setPage((prevPage) => prevPage + 1);
				}
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [loading]);

	useEffect(() => {
		if (page > 1) {
			getMovieRequest(searchValue, page);
		}
	}, [page]);


	const saveToLocalStorage = (items) => {
		localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));
	};

	const addFavouriteMovie = (movie) => {
		const newFavouriteList = [...favourites, movie];
		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	const removeFavouriteMovie = (movie) => {
		const newFavouriteList = favourites.filter(
			(favourite) => favourite.imdbID !== movie.imdbID
		);

		setFavourites(newFavouriteList);
		saveToLocalStorage(newFavouriteList);
	};

	const applyFilters = (movies) => {
		console.log(movies, "mov")
		return movies.filter((movie) => {
			const year = parseInt(movie.Year);


			const matchesYear = year >= filters.yearRange[0] && year <= filters.yearRange[1];
			return matchesYear;
		});
	};

	return (
		<div className='movie-app'>
			<header>
				<MovieListHeading heading='Movie Mania' />
				<div className='filterbox'>
				<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
				<FilterOptions filters={filters} setFilters={setFilters} />
				</div>
			</header>
			<main>
				<section aria-label="Search Results">
					<MovieList
						movies={movies}
						handleFavouritesClick={addFavouriteMovie}
						favouriteComponent={AddFavourites}
					/>
				</section>
				{loading && <div aria-live="polite">Loading more movies...</div>}
				<MovieListHeading heading='Favourites' />
				<section aria-label="Favourites">

					<MovieList
						movies={favourites}
						handleFavouritesClick={removeFavouriteMovie}
						favouriteComponent={RemoveFavourites}
					/>
				</section>

			</main>
		</div>
	);
};

export default App;
