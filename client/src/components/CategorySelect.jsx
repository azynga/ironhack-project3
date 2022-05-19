import React from 'react';

const categories = [
    'Fashion',
    'Electronics',
    'Media',
    'Interior',
    'Sports',
    'Other',
];

const CategorySelect = ({ category, setCategory, isFilter }) => {
    const options = categories.map((categoryOption) => {
        return (
            <option key={categoryOption} value={categoryOption}>
                {categoryOption}
            </option>
        );
    });

    return (
        <>
            <label
                htmlFor='category'
                className={isFilter ? '' : 'visually-hidden'}
            >
                Category:
            </label>
            <select
                name='Category'
                id='category'
                onChange={(event) => setCategory(event.target.value)}
                value={category}
            >
                <option value=''>
                    {isFilter ? 'Any' : 'Select a category'}
                </option>

                {/* {isFilter ? <option value='Any'>Any</option> : ''} */}

                {options}
            </select>
        </>
    );
};

export default CategorySelect;
