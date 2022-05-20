import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../App';

import { createItem } from '../services/item-service';
import CategorySelect from './CategorySelect';
import ImageDropzone from './ImageDropzone';
import LocationForm from './LocationForm';

const Create = () => {
    const navigate = useNavigate();
    const { loggedInUser } = useContext(UserContext);
    const [title, setTitle] = useState('');
    const [imageUrls, setImageUrls] = useState([]);
    const [description, setDescription] = useState('');
    const [tags, setTags] = useState('');
    const [price, setPrice] = useState(0);
    const [category, setCategory] = useState('');
    const [location, setLocation] = useState(null);
    const [draft, setDraft] = useState(false);
    const initialRender = useRef(true);

    const saveChanges = () => {
        localStorage.setItem(
            'createFormData',
            JSON.stringify({
                title,
                imageUrls,
                description,
                tags,
                price,
                category,
                draft,
                location,
            })
        );
    };

    const handleCreateItem = (event) => {
        event.preventDefault();
        createItem({
            title,
            images: imageUrls,
            description,
            tags,
            price,
            category,
            public: !draft,
            publishedAt: draft ? null : Date.now(),
            location,
            owner: loggedInUser._id,
        })
            .then((response) => {
                if (!response.data._id) {
                    throw new Error('Item could not be created');
                }
                const newItem = response.data;
                localStorage.setItem('createFormData', JSON.stringify(''));
                navigate('/items/' + newItem._id);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    useEffect(() => {
        const storedFormData = JSON.parse(
            localStorage.getItem('createFormData')
        );

        if (storedFormData) {
            const {
                title,
                imageUrls,
                description,
                tags,
                price,
                category,
                draft,
                location,
            } = storedFormData;

            setTitle(title);
            setDescription(description);
            setImageUrls(imageUrls);
            setTags(tags);
            setPrice(price);
            setCategory(category);
            setDraft(draft);
            if (location) {
                setLocation(location);
            } else if (loggedInUser) {
                setLocation(loggedInUser.location);
            }
        }
    }, [loggedInUser]);

    useEffect(() => {
        if (!initialRender.current) {
            saveChanges();
        }
        initialRender.current = false;
    }, [title, imageUrls, description, tags, price, category, draft, location]);

    return (
        <main className='create col main-fill'>
            <h2>Create an ad</h2>
            <div className='create-container container'>
                <form className='create-form col' onSubmit={handleCreateItem}>
                    <ImageDropzone
                        imageUrls={imageUrls}
                        setImageUrls={setImageUrls}
                    />

                    <label htmlFor='title' className='visually-hidden'>
                        Title
                    </label>
                    <input
                        type='text'
                        id='title'
                        placeholder='Title'
                        autoFocus
                        required
                        minLength={5}
                        maxLength={100}
                        onChange={(event) => setTitle(event.target.value)}
                        value={title}
                    />

                    <label htmlFor='description' className='visually-hidden'>
                        Tags
                    </label>
                    <textarea
                        type='text'
                        id='tags'
                        placeholder='Tags'
                        required
                        minLength={5}
                        maxLength={100}
                        onChange={(event) => setTags(event.target.value)}
                        value={tags}
                    />
                    <label htmlFor='description' className='visually-hidden'>
                        Description
                    </label>
                    <textarea
                        type='text'
                        id='description'
                        placeholder='Description'
                        maxLength={1000}
                        onChange={(event) => setDescription(event.target.value)}
                        value={description}
                    />

                    <label htmlFor='price' className='visually-hidden'>
                        Price
                    </label>
                    <input
                        type='number'
                        id='price'
                        placeholder='Price'
                        step={1}
                        required
                        onChange={(event) => setPrice(event.target.value)}
                        value={price}
                    />
                    <LocationForm
                        location={location}
                        setLocation={setLocation}
                    />

                    <CategorySelect
                        category={category}
                        setCategory={setCategory}
                    />

                    <label htmlFor='draft' className='white'>
                        <input
                            type='checkbox'
                            name='draft'
                            id='draft'
                            onChange={() => setDraft(!draft)}
                            checked={draft}
                        />
                        Save as draft?
                    </label>

                    <button>Create</button>
                </form>
            </div>
        </main>
    );
};

export default Create;
