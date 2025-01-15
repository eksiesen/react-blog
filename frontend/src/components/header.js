import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await fetch(
                    "http://localhost:1337/api/blogs?publicationState=preview&populate=*"
                );
                const data = await response.json();
                setBlogs(data.data || []); // Blogları state'e aktar
            } catch (error) {
                console.error("Blogları çekerken hata oluştu:", error);
            }
        };

        fetchBlogs();
    }, []);

    return (
        <nav className="navbar">
            <div className="container">
                <Link to="/" className="navbar-brand">Write...</Link>
                <div className="navbar-links">
                    <Link to="/" className="nav-link">All Blogs</Link>
                    <Link to="/addblog" className="nav-link">Add Blog</Link>
                    <div className="dropdown">
                        <button className="dropdown-toggle">Categories</button>
                        <div className="dropdown-menu">
                            {blogs.length > 0 ? (
                                blogs.map((blog) => (
                                    <Link
                                        key={blog.id}
                                        to={`/details/${blog.id}`} // Dinamik bağlantı
                                        className="dropdown-item"
                                    >
                                        {blog.attributes.title || "Başlık Yok"} {/* Blog başlığı */}
                                    </Link>
                                ))
                            ) : (
                                <p className="dropdown-item">Hiç blog bulunamadı.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
