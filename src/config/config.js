const config = {
    appWriteURL : String(import.meta.env.VITE_APP_WRITE_URL),
    appWriteProjectID : String(import.meta.env.VITE_APP_WRITE_PROJECT_ID),
    appWriteDatabaseID : String(import.meta.env.VITE_APP_WRITE_DATABASE_ID),
    appWriteCollectionID : String(import.meta.env.VITE_APP_WRITE_COLLECTION_ID),
    appWriteBucketID : String(import.meta.env.VITE_APP_WRITE_BUCKET_ID),
};

export default config;