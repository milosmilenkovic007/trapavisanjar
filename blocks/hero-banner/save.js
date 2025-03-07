import { useBlockProps } from '@wordpress/block-editor';

const Save = ({ attributes }) => {
    const { bgImage, title, description, lottieJson, threeModelUrl } = attributes;

    return (
        <div { ...useBlockProps.save({ className: 'hero-banner', 'data-glb-url': threeModelUrl }) }>
            { bgImage && <img src={bgImage} alt="Hero Background" className="hero-banner-bg" /> }
            <div className="hero-banner-content">
                { title && <h2 className="hero-banner-title">{title}</h2> }
                { description && <p className="hero-banner-description">{description}</p> }
                { lottieJson && (
                    <lottie-player src={lottieJson} background="transparent" speed="1" loop autoplay></lottie-player>
                )}
                { threeModelUrl && <div className="three-container"></div> }
            </div>
        </div>
    );
};

export default Save;
