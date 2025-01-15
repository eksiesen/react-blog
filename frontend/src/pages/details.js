import React, { useEffect, useState } from "react";

const Details = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    "http://localhost:1337/api/blogs?publicationState=preview&populate=*"
                );
                const data = await response.json();
                console.log("API'den Gelen Veri:", data.data); // Gelen veriyi kontrol et
                setBlogs(data.data || []); // Blogları state'e ata
            } catch (error) {
                console.error("API çağrısı sırasında hata oluştu:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <p>Yükleniyor...</p>;
    }

    return (
        <div>
            <h1>Tüm Blog Yazıları</h1>
            {blogs.length > 0 ? (
                blogs.map((blog) => (
                    <div key={blog.id}>
                        <h2>{blog.title || "Başlık Yok"}</h2>
                        <p><strong>Yazar:</strong> {blog.author || "Yazar Yok"}</p>
                        <p>
                            <strong>İçerik:</strong>{" "}
                            {blog.body?.[0]?.children?.[0]?.text || "İçerik Yok"}
                        </p>
                    </div>
                ))
            ) : (
                <p>Hiç blog yazısı bulunamadı.</p>
            )}
        </div>
    );
};

export default Details;
