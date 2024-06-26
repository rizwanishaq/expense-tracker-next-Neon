'use server'

import {auth} from '@clerk/nextjs/server'
import { db } from '@/lib/db'
import { revalidatePath } from 'next/cache'

export const addTransaction = async (formData) => {
    const textValue = formData.get('text')
    const amountValue = formData.get('amount')


    if(!textValue || textValue === '' || !amountValue || amountValue === '') {
        return {error: "Text of amount is missing"}
    }


    // Check if user is signed in

    const {userId} = auth();
    
    if(!userId) {
        return {error: "User is not signed in"}
    }





    const text = textValue.toString()
    const amount = parseFloat(amountValue.toString())

    try {
        
        const transactionData = await db.transaction.create({
            data: {
                text,
                amount,
                userId
            }
        })
        revalidatePath('/')
        return {data: transactionData}
    } catch (error) {
        return {error: error.message}
    }


}
