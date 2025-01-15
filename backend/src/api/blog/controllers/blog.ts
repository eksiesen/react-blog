import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::blog.blog', ({ strapi }) => ({
    async find(ctx) {
        const query = ctx.query as any; // query'yi dinamik olarak türlendiriyoruz

        const entities = await strapi.db.query('api::blog.blog').findMany({
            where: {
                ...(query.filters || {}), // Eğer filters tanımlı değilse boş nesne kullan
                published_at: null, // Taslak içerikleri de filtrele
            },
            populate: ['author'], // İlişkili verileri dahil et (örneğin 'author')
        });

        ctx.body = entities;
    },
}));
