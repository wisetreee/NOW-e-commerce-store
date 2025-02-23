"use client"

import Button from '@/app/components/ui/Button';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'

const ErrorPage = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const errorMessage = searchParams.get("message");
  
    return (
        <div className="container text-center flex flex-col items-center pt-16 pb-32">
        <h2 className="text-3xl font-medium mb-2">
          Упс... Похоже, что возникла ошибка оформления заказа...
        </h2>
        <p className="text-lg text-content_4 mb-8">
          Ошибка: {errorMessage || "Произошла неизвестная ошибка"}
        </p>
        <div className="flex justify-center gap-4">

          <Button
            text="Вернуться назад"
            onClick={() =>router.back()}
            theme="secondary"
          />
        </div>
      </div>
    );
  }


export default ErrorPage