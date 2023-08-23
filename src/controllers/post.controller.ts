import { prisma } from "../server"
import { Request, Response } from "express"

const createBlogPost = async (req : Request, res : Response) => {
    try {
        const { title, content } = req.body
        const newBlogPost = await prisma.post.create({
            data : {
                title,
                content
            }
        })
        res.status(200).json(newBlogPost)
    } catch (error) {
        res.status(500).json({ error : error })
    }
}

const createPostAndComments = async (req : Request, res : Response) => {
    try {
        const { title, content, comments} = req.body
        const newBlogPost = await prisma.post.create({
            data : {
                title,
                content,
                comments : {
                    create : comments
                }
            },
            include : {
                comments : true
            }
        })
        res.status(200).json(newBlogPost)
    } catch (error) {
        res.status(500).json({ error : error })
    }
}

const getBlogPost = async (req : Request, res : Response) => {
    try {
        const id = req.params.id
        const blogPost = await prisma.post.findUnique({
            where : {
                id : Number(id)
            }
        })
        res.status(200).json(blogPost)
    } catch (error) {
        res.status(500).json({ error : error})
    }
}

const getBlogPosts = async  (req : Request, res : Response) => {
    try {
        const blogPosts = await prisma.post.findMany()
        res.status(200).json(blogPosts)
    } catch (error) {
        res.status(500).json({ error : error })
    }
}

const updateBlogPost = async ( req : Request, res : Response) => {
    try {
        const { id, title, content } = req.body
        const updatedBlogPost = await prisma.post.update({
            where : {
                id : Number(id),
            },
            data : {
                title,
                content
            }
        })
        res.status(200).json(updatedBlogPost)
    } catch (error) {
        
    }
}

const deleteBlogPost = async (req : Request, res : Response) => {
    try {
        const id = req.params.id
        const deletedBlogPost = await prisma.post.delete({
            where : {
                id : Number(id)
            }
        })
        res.status(200).json(deletedBlogPost)
    } catch (error) {
        res.status(500).json({ error : error})
    }
}

const deleteAllBlogposts = async ( req : Request, res : Response) => {
    try {
        const deletedBlogPosts = await prisma.post.deleteMany()
        res.status(200).json(deletedBlogPosts)
    } catch (error) {
        res.status(500).json({ error : error})
    }
}

const likeBlogPost = async ( req : Request, res : Response) => {
    try {
        const { id } = req.body
        const likedBlogPost = await prisma.post.update({
            where : {
                id : Number(id)
            },
            data : {
                likesCount : {
                    increment : 1
                }
            }
        })
        res.status(200).json(likedBlogPost)
    } catch (error) {
        res.status(500).json({ error : error })
    }
}

export default {
    createBlogPost,
    createPostAndComments,
    updateBlogPost,
    deleteAllBlogposts,
    deleteBlogPost,
    getBlogPost,
    getBlogPosts,
    likeBlogPost
}