import { useBlockProps } from '@wordpress/block-editor';

export default function Save() {
    return (
        <div {...useBlockProps.save()}>
            <h2>Hero Banner - Gutenberg Blok</h2>
        </div>
    );
}
