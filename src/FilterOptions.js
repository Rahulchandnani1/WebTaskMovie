import React from 'react';

const FilterOptions = ({ filters, setFilters }) => {


	const handleYearRangeChange = (event) => {
		const yearRange = event.target.value.split('-').map(Number);
		setFilters({ ...filters, yearRange });
	};


	return (

		<fieldset className="filter-options" aria-labelledby="filter-heading">

			<div>
				<label htmlFor="yearRange">Year Range: </label>
				<input id="yearRange" type="text" value={filters.yearRange.join('-')} onChange={handleYearRangeChange} />
			</div>

		</fieldset>

	);
};

export default FilterOptions;
