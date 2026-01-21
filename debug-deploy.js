// Add this to your app.js for deployment debugging
console.log('=== DEPLOYMENT DEBUG ===');
console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('PORT:', process.env.PORT);
console.log('ATLASDB_URL exists:', !!process.env.ATLASDB_URL);
console.log('SECRET exists:', !!process.env.SECRET);
console.log('CLOUD_NAME exists:', !!process.env.CLOUD_NAME);
console.log('HTTPS:', process.env.HTTPS);
console.log('========================');
