import React from 'react';

const SearchBox = (props) => {
	return (
		<div className='col'>
			<label htmlFor="search" className="visually-hidden">Search Movies </label>

			<input
				id="search"
				className='form-control'
				value={props.searchValue}
				onChange={(event) => props.setSearchValue(event.target.value)}
				placeholder='Type to search...'
			></input>
		</div>
	);
};

export default SearchBox;
