import React, { useState } from 'react';

import { uploadImages } from '../services/item-service';
import LoadingIcon from './LoadingIcon';

const ImageDropzone = ({ imageUrls, setImageUrls }) => {
    const defaultStyle = {
        border: 'dotted 4px black',
        width: '100%',
        height: 200,
        position: 'relative',
    };

    const hoverStyle = {
        backgroundColor: 'hsla(0, 0%, 0%, 0.2)',
        border: 'solid 4px black',
    };
    // const [imageUrls, setImageUrls] = useState([]);
    const [uploadingFiles, setUploadingFiles] = useState(false);
    const [style, setStyle] = useState(defaultStyle);

    const handleUpload = (event) => {
        event.preventDefault();
        setStyle(defaultStyle);
        const files = Array.from(
            event.dataTransfer?.files || event.target.files
        );
        const uploadData = new FormData();
        files.forEach((file) => {
            uploadData.append('images', file);
        });

        setUploadingFiles(true);
        uploadImages(uploadData)
            .then((response) => {
                setImageUrls([...imageUrls, ...response.data]);
                setUploadingFiles(false);
            })
            .catch((error) => console.error(error));
    };

    const handleRemove = (event) => {
        const updatedUrls = imageUrls.filter((url) => url !== event.target.src);
        setImageUrls(updatedUrls);
    };

    const images = imageUrls?.map((url) => {
        return (
            <img
                key={Math.random().toString(36)}
                src={url}
                alt=''
                onClick={handleRemove}
            />
        );
    });

    return (
        <>
            <div className='selected-images'>{images}</div>
            <div className='image-dropzone' style={style}>
                <div
                    className='dropzone-text col'
                    style={{
                        position: 'absolute',
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0,
                        color: 'black',
                        alignItems: 'center',
                        justifyContent: 'center',
                        textAlign: 'center',
                    }}
                >
                    {uploadingFiles ? (
                        <LoadingIcon color='white' />
                    ) : (
                        <div>
                            <b>Drag images here</b>
                            <br />
                            or click to select
                        </div>
                    )}
                </div>
                <input
                    type='file'
                    accept='image/*'
                    style={{
                        opacity: 0,
                        width: '100%',
                        height: '100%',
                    }}
                    multiple
                    onDragOver={() =>
                        setStyle({
                            ...style,
                            ...hoverStyle,
                        })
                    }
                    onDragLeave={() => setStyle(defaultStyle)}
                    onDrop={handleUpload}
                    onChange={handleUpload}
                    // onDragOver={(event) => {
                    //     event.preventDefault();
                    //     setDropzoneStyle({
                    //         ...dropzoneStyle,
                    //         backgroundColor: 'white',
                    //     });
                    // }}
                ></input>
            </div>
        </>
    );
};

export default ImageDropzone;
