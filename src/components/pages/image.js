import { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
 

const Image = ({ url, nonImage, ...props }) => {
    const [imageUrl, setImageUrl] = useState(url ? url : nonImage);
    const [isFirst, setIsFirst] = useState(true);
    useEffect(() => {
        if(isFirst){
            setIsFirst(false);
        }else{
            setImageUrl(url);
        }
    }, [url]);

    const errorHandle = () => {
        setImageUrl(nonImage);
    }

    return (
        <img
            src={imageUrl}
            onError={errorHandle}
            {...props}
        />
    )
};
 
export default Image;