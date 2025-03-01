import { useBlockProps } from '@wordpress/block-editor';

export default function Edit() {
    return (
        <div {...useBlockProps()}>
            <h2>Hero Banner - Gutenberg Blok</h2>
        </div>
    );
}
