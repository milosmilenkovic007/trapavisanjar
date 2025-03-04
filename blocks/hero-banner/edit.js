import { __ } from '@wordpress/i18n';
import { useBlockProps, MediaUpload } from '@wordpress/block-editor';
import { Button, TextControl } from '@wordpress/components';

const Edit = ({ attributes, setAttributes }) => {
    const { bgImage, title, lottieJson, description } = attributes;

    return (
        <div { ...useBlockProps({ className: 'hero-banner-editor' }) }>
            <div className="hero-banner-editor__controls">
                <MediaUpload
                    onSelect={(media) => setAttributes({ bgImage: media.url })}
                    type="image"
                    render={({ open }) => (
                        <Button 
                            onClick={open} 
                            className="hero-banner-editor__upload-btn"
                        >
                            { bgImage ? __('Change Background', 'trapavisanjar') : __('Upload Background', 'trapavisanjar') }
                        </Button>
                    )}
                />
            </div>

            { bgImage && <img src={bgImage} alt="Hero Background" className="hero-banner-editor__bg-image" /> }

            <div className="hero-banner-editor__content">
                <TextControl
                    className="hero-banner-editor__input hero-banner-editor__title-input"
                    label={__('Title', 'trapavisanjar')}
                    value={title}
                    onChange={(value) => setAttributes({ title: value })}
                />
                <TextControl
                    className="hero-banner-editor__input hero-banner-editor__description-input"
                    label={__('Description', 'trapavisanjar')}
                    value={description}
                    onChange={(value) => setAttributes({ description: value })}
                />
                <TextControl
                    className="hero-banner-editor__input hero-banner-editor__lottie-input"
                    label={__('Lottie JSON URL', 'trapavisanjar')}
                    value={lottieJson}
                    onChange={(value) => setAttributes({ lottieJson: value })}
                />
            </div>
        </div>
    );
};

export default Edit;
