'use server'
import { db } from '@/lib/db'
import {auth} from '@clerk/nextjs/server'


export const getTransactions = async () => {
    const {userId} = auth();
    
    if(!userId) {
        return {error: 'User not found'}
    }

    try {
        const transactions = await db.transaction.findMany({
            where: { userId},
            orderBy: {createdAt: 'desc'}
        })
        return {transactions}
        
    } catch (error) {
        return {error: 'Failed to fetch balance'}
    }
}