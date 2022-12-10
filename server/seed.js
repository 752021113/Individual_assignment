import collections from './config/collections.js';
import dbConnection from './config/connection.js';

const imageList = [
	{
		url: 'https://images.unsplash.com/photo-1533552755457-5b471cb2ab11?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
		title: 'image1',
		author: 'Haran',
		like: [],
		description: ''
	},
	{
		url: 'https://images.unsplash.com/photo-1531981462953-7cea7af328e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80',
		title: 'image2',
		author: 'Haran',
		like: [],
		description: ''
	},
	{
		url: 'https://images.unsplash.com/photo-1603384446936-5646a2481a36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
		title: 'image3',
		author: 'Haran',
		like: [],
		description: ''
	},
	{
		url: 'https://images.unsplash.com/photo-1508804185872-d7badad00f7d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
		title: 'image4',
		author: 'Haran',
		like: [],
		description: ''
	},
	{
		url: 'https://plus.unsplash.com/premium_photo-1661936340711-8b2300d5f063?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
		title: 'image5',
		author: 'Haran',
		like: [],
		description: ''
	},
	{
		url: 'https://images.unsplash.com/photo-1598250076988-8097b2815295?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80',
		title: 'image6',
		author: 'Haran',
		like: [],
		description: ''
	},
	
];

const main = async () => {
	// const imagesCol = await collections.images();
	// await imagesCol.insertMany(imageList);
	const db = await dbConnection();
	await db.dropDatabase();
	try {
		const imagesCol = await collections.images();
		await imagesCol.insertMany(imageList);
	} catch (error) {
		await db.dropDatabase();
	} finally {
		await db.s.client.close();
	}
};

main();
