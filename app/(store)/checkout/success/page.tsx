"use client";

import { useRouter } from "next/navigation";
import Button from "@/app/components/ui/Button";
import Image from "next/image";

export default function CheckoutSuccessPage() {
  const router = useRouter();

  return (
    <div className="container text-center flex flex-col items-center pt-16 pb-32">
      <Image
      src="/gift-box.png"
      width = "600"
      height = "300"
      alt=""
      />
      <h2 className="text-3xl font-medium mb-2">Оплата прошла успешно!</h2>
      <p className="text-lg text-content_4 mb-8">
       Мы вышлем Вам чек на электронную почту.
      </p>
      <div className="flex justify-center gap-4">
        <Button
          text="На главную"
          onClick={() => router.push("/")}
        />
        <Button
          text="Мои заказы"
          onClick={() => router.push("/orders")}
          theme="secondary"
        />
      </div>
    </div>
  );
}