import config from "../config/config";
import {Client, ID, Databases, Storage, Query} from "appwrite";

export class Service {
    client = new Client();
    databases;
    storage;

    constructor() {
        this.client
        .setEndpoint(config.appWriteURL)
        .setProject(config.appWriteProjectID);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createPost({title, slug, content, featuredImage, status, userId}) {
        try {
            return await this.databases.createDocument(
                config.appWriteDatabaseID, 
                config.appWriteCollectionID, 
                slug, 
                {title, content, featuredImage, status, userId}
            )
        } catch (error) {
            console.log("AppWrite service :: createPost :: error", error);
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}) {
        try {
            return await this.databases.updateDocument(
                config.appWriteDatabaseID, 
                config.appWriteCollectionID, 
                slug, 
                {title, content, featuredImage, status}
            )
        } catch (error) {
            console.log("AppWrite service :: updatePost :: error", error);
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.updateDocument(
                config.appWriteDatabaseID, 
                config.appWriteCollectionID, 
                slug, 
            )
        } catch (error) {
            console.log("AppWrite service :: deletePost :: error", error);
            return false;
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                config.appWriteDatabaseID, 
                config.appWriteCollectionID, 
                slug, 
            )
        } catch (error) {
            console.log("AppWrite service :: grtPost :: error", error);
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                config.appWriteDatabaseID, 
                config.appWriteCollectionID,
                queries
            )
        } catch (error) {
            console.log("AppWrite service :: grtPosts :: error", error);
        }
    }

    async uploadFile(file) {
        try {
            return await this.storage.createFile(
                config.appWriteBucketID, 
                ID.unique(),
                file    
            )
        } catch (error) {
            console.log("AppWrite service :: uploadFile :: error", error);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.storage.deleteFile(
                config.appWriteBucketID, 
                fileId    
            )
            return true;
        } catch (error) {
            console.log("AppWrite service :: deleteFile :: error", error);
            return false;
        }
    }

    getFilePreview(fileId) {
        return this.storage.getFilePreview(
            config.appWriteBucketID,
            fileId
        )
    }
}

const service = new Service();

export default service;
