import React from 'react';

const categories = [
    'Fashion',
    'Electronics',
    'Media',
    'Interior',
    'Sports',
    'Other',
];

const CategorySelect = () => {
    const radioButtons = categories.map((category) => {
        return (
            <label key={category}>
                <input
                    type='radio'
                    name='category'
                    id={category.toLowerCase()}
                    value={category}
                />
                {category}
            </label>
        );
    });

    return (
        <fieldset className='col' style={{ color: 'white' }}>
            <legend>Select a category</legend>
            {radioButtons}
        </fieldset>
    );
};

export default CategorySelect;
