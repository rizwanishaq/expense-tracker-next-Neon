'use server'
import { db } from '@/lib/db'
import {auth} from '@clerk/nextjs/server'
import { revalidatePath } from 'next/cache'


export const deleteTransaction = async (transactionId) => {
    const {userId} = auth();
    
    if(!userId) {
        return {error: 'User not found'}
    }

    try {
        
        await db.transaction.delete({
            where: {
                id: transactionId,
                userId
            }
        })
        revalidatePath('/')
        return {message: 'Transaction deleted successfully'}
        
    } catch (error) {
        return {error: 'Failed to fetch balance'}
    }
}