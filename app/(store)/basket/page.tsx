"use client"

import BasketProductCard from '@/app/components/basketPage/BasketProductCard';
import Button from '@/app/components/ui/Button';
import IconButton from '@/app/components/ui/IconButton';
import useBasketStore from '@/store/basket'
import { SignInButton, useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const BasketPage = () => {
    const groupedItems = useBasketStore((state) => state.getGroupedItems());
    const { removeItem, getTotalQuantity, getTotalPrice } = useBasketStore();
    const { isSignedIn } = useAuth();
    const router = useRouter();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true)
    }, [])
    if (!isClient) {
      return null;
    }

    const onCheckout = async () => {
      if (!isSignedIn) return;
      router.push('/checkout')
      }

    if (groupedItems.length === 0) {
      return (
      <div className='container'>
         <div className='flex flex-col items-center justify-center mt-16'>
          <h1 className='font-[velaSans] font-medium text-content_3 mb-4 text-center'>Тут пусто... Добавь сюда что-нибудь!</h1>
          <Button text="Перейти в каталог" onClick={() => router.push('/catalog')}/>
          </div>
      </div>
      
      )
    }
    console.log("Content in basket:", groupedItems)
  return (
    <div className='container'>
   <section className="mt-8 mb-16">    
        <IconButton src="/turn-back.svg" theme="light" onClick={() => router.back()}/>
        <h1>Корзина</h1>
        <div className='border-b mb-4'>
        {groupedItems.map((item, index) => 
            <div key={index} className='flex justify-between items-start mb-4'>  
            <BasketProductCard item={item}/>
            <IconButton src='/x.svg' onClick={()=>{removeItem(item)}}/>
            </div>
        )}
        </div>
        <h2 className='font-semibold  mb-2'>Ваш заказ:</h2>
        <p className='text-content_3  mb-2'>Вещи ({getTotalQuantity()}): {getTotalPrice()} ₽ </p>
        <p className='font-semibold mb-4'>Итого: {getTotalPrice()} ₽ </p>
        {isSignedIn ? (
          <Button text='Перейти к оплате' onClick={() => onCheckout()}/>
        ) : (
          <SignInButton mode="modal">
            <Button text='Авторизуйтесь, чтобы оплатить'/>
          </SignInButton>
        )
        }     
    </section>
    </div>
  )
}

export default BasketPage