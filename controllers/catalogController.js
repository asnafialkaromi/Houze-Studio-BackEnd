const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { sendSuccess, sendError } = require('../utils/baseResponse');
const cloudinary = require('cloudinary').v2;

const createCatalog = async (req, res) => {
    const { catalog_name, catalog_type, price, description } = req.body;

    if (!catalog_name || !catalog_type || !price || !description) {
        sendError(res, 'All fields are required', 400);
        return;
    }

    const latestCatalog = await prisma.catalog.findFirst({
        orderBy: { id: 'desc' },
    });
    let newCatalogId = 'K0001';
    if (latestCatalog) {
        const lastIdNumber = parseInt(latestCatalog.id.slice(1));
        const newIdNumber = lastIdNumber + 1;
        newCatalogId = `K${newIdNumber.toString().padStart(4, '0')}`;
    }

    try {
        const catalog = await prisma.catalog.create({
            data: {
                id: newCatalogId,
                catalog_name,
                catalog_type,
                price: parseFloat(price),
                description,
            },
        });

        const images = req.files.map((file) => file.path);
        const imageUrls = [];
        for (const image of images) {
            const result = await cloudinary.uploader.upload(image, {
                folder: 'catalogs-images',
            });
            imageUrls.push(result.secure_url);
        }

        await prisma.catalog_images.createMany({
            data: imageUrls.map((url, index) => ({
                catalog_id: catalog.id,
                image_url: url,
            })),
        });

        sendSuccess(res, catalog, 'Catalog created successfully');
    } catch (error) {
        sendError(res, error.message, 500);
        console.log(error);
    }
};

const getCatalog = async (req, res) => {
    try {
        const catalog = await prisma.catalog.findMany(
            {
                include: {
                    catalog_images: true
                }
            }
        );
        sendSuccess(res, catalog, 'Get catalog success');
    } catch (error) {
        sendError(res, error.message, 500);
        console.log(error);
    }
};

const getCatalogById = async (req, res) => {
    try {
        const { id } = req.params;
        const catalog = await prisma.catalog.findUnique({
            where: {
                id,
            },
            include: {
                catalog_images: true
            }
        });

        if (!catalog) {
            return sendError(res, 'Catalog not found', 404);
        }

        sendSuccess(res, catalog, 'Get catalog success');
    } catch (error) {
        sendError(res, error.message, 500);
        console.log(error);
    }
};

const deleteCatalog = async (req, res) => {
    try {
        const { id } = req.params;
        const catalog = await prisma.catalog.delete({
            where: {
                id,
            },
        });
        sendSuccess(res, catalog, 'Delete catalog success');
    } catch (error) {
        sendError(res, error.message, 500);
        console.log(error);
    }
};

module.exports = { createCatalog, getCatalog, getCatalogById, deleteCatalog };