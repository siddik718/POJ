import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const TextEditor = ({content,handleContentChange, style}) => {
    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ['bold', 'italic', 'underline'],
            ['image', 'code-block'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            [{ script: 'sub' }, { script: 'super' }],
            [{ indent: '-1' }, { indent: '+1' }],
            [{ direction: 'rtl' }],
            [{ size: ['small', false, 'large', 'huge'] }],
            ['link', 'blockquote', 'code-block'],
            [{ color: [] }, { background: [] }],
            [{ font: [] }],
            [{ align: [] }],
            ['clean'],
        ],
    };

    const formats = [
        'header',
        'bold',
        'italic',
        'underline',
        'image',
        'code-block',
        'list',
        'bullet',
        'script',
        'sub',
        'super',
        'indent',
        'direction',
        'size',
        'link',
        'blockquote',
        'code-block',
        'color',
        'background',
        'font',
        'align',
    ];
    return (
        <ReactQuill
            theme="snow" value={content} onChange={handleContentChange} modules={modules} formats={formats} style={{ ...style }} />
    )
}

export default TextEditor;