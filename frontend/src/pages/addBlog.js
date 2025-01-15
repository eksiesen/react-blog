import React, { useState } from 'react';

const AddBlog = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:1337/api/blogs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                data: { title, content },
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Blog added:', data);
                setTitle('');
                setContent('');
            })
            .catch((error) => console.error('Error adding blog:', error));
    };

    return (
        <div>
            <h1>Add Blog</h1>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        type="text"
                        id="title"
                        className="form-control"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="content" className="form-label">Content</label>
                    <textarea
                        id="content"
                        className="form-control"
                        rows="5"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button type="submit" className="btn btn-primary">Add Blog</button>
            </form>
        </div>
    );
};

export default AddBlog;
