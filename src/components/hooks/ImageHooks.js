import { useState, useEffect } from 'react';

function ImageHooks() {
    const [img, setImg] = useState('');
    const [imgClass, setImgClass] = useState('form-control')
    const [imgBlur, setImgBlur] = useState(false);

    useEffect(() => {
        console.log(img);
        if (imgBlur) {
            if (img.length === 0) {
                setImgClass('form-control');
            } else {
                setImgClass('form-control is-valid');
            }
        }
    }, [imgBlur, img])

	function handleImgChange(e) {
        let fileName = (e.target.files[0].name);
        let updatedName = (fileName.split(' ').join('_'))
		// setImg(`http://localhost:3001/public/images/${updatedName}`);
        setImg(e.target.files[0])
	}

	return [img, handleImgChange, setImgBlur, imgClass];
}

export default ImageHooks;