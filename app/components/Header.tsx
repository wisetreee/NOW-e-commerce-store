"use client"
import { useUser } from '@clerk/nextjs'
import Form from 'next/form'
import React from 'react'

const Header = () => {
  const user = useUser();
  console.log(user);
  return (
    <header className="bg-content_black py-4 px-4 md:px-8 lg:px-16">
        <div className="container mx-auto max-w-7xl flex justify-between items-center">

          <div className="flex items-center gap-x-12">
          <div className="text-white text-4xl font-bold text-xl">NOW</div>
          <nav>
            <ul className="flex space-x-6 text-white">
              <li><a href="/">Мужчинам</a></li>
              <li><a href="/">Женщинам</a></li>
              <li><a href="/">Новости</a></li>
              <li><a href="/">О нас</a></li>
            </ul>
          </nav>
          </div>

          <div className='flex items-center gap-x-6'>
          <Form action="/search"
          className='relative'>
      {/* On submission, the input value will be appended to 
          the URL, e.g. /search?query=abc */}
        <input type= "text" name="query" placeholder='Поиск'
        className="bg-content_main_white text-content_black px-3 py-2 rounded-full placeholder: pl-[14px]" />
    </Form>
    <button>
     <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/></svg>
      <span>Download</span>
      </button>
        </div>
        </div>
    </header>
  )
}

export default Header;