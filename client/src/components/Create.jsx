import React, { useState } from 'react';
import CategorySelect from './CategorySelect';

const Create = () => {
    return (
        <div className='create'>
            <form className='create-form col'>
                <label htmlFor='title' className='visually-hidden'>
                    Title
                </label>
                <input type='text' id='title' placeholder='Title' autoFocus />

                <label htmlFor='description' className='visually-hidden'>
                    Tags
                </label>
                <textarea type='text' id='tags' placeholder='Tags' />

                <label htmlFor='description' className='visually-hidden'>
                    Description
                </label>
                <textarea
                    type='text'
                    id='description'
                    placeholder='Description'
                />

                <label htmlFor='price' className='visually-hidden'>
                    Price
                </label>
                <input type='number' id='price' placeholder='Price' step={1} />

                <CategorySelect />

                {/* <div
                    className='image-drop'
                    style={{ width: 500, height: 300, backgroundColor: 'gray' }}
                    onDrop={(event) => {
                        event.preventDefault();
                        console.log(event);
                    }}
                    onDragOver={(event) => {
                        event.preventDefault();
                        console.log(event);
                    }}
                ></div> */}

                <button>Create</button>
            </form>
        </div>
    );
};

export default Create;
