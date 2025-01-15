import React, { useEffect, useState } from "react";

const Category = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true); // Yükleniyor durumunu takip için

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:1337/api/categories");
                const data = await response.json();
                console.log("Gelen Veri:", data); // Gelen veriyi kontrol edin
                setCategories(data.data || []); // Gelen veriyi kaydet, yoksa boş array
            } catch (error) {
                console.error("Veri çekilirken hata oluştu:", error);
            } finally {
                setLoading(false); // Yükleniyor durumunu kapat
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return <p>Yükleniyor...</p>; // Yüklenme durumu
    }

    return (
        <div>
            <h1>Kategoriler</h1>
            {categories && categories.length > 0 ? (
                categories.map((category) => (
                    <div key={category.id}>
                        <h2>{category.attributes?.title || "Başlık Yok"}</h2>
                        <p>{category.attributes?.description || "Açıklama Yok"}</p>
                    </div>
                ))
            ) : (
                <p>Hiç kategori bulunamadı.</p>
            )}
        </div>
    );
};

export default Category;
