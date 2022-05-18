import React from 'react';

const categories = [
    'Fashion',
    'Electronics',
    'Media',
    'Interior',
    'Sports',
    'Other',
];

const CategorySelect = ({ category, setCategory }) => {
    const radioButtons = categories.map((categoryOption) => {
        return (
            <label key={categoryOption}>
                <input
                    type='radio'
                    name='category'
                    id={categoryOption.toLowerCase()}
                    required
                    onChange={(event) => setCategory(event.target.value)}
                    value={categoryOption}
                    checked={categoryOption === category ? 'checked' : ''}
                />
                {categoryOption}
            </label>
        );
    });

    return (
        <fieldset className='col'>
            <legend>Select a category</legend>
            {radioButtons}
        </fieldset>
    );
};

export default CategorySelect;
