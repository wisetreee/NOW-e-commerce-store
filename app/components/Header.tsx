"use client";
import { useUser } from "@clerk/nextjs";
import Form from "next/form";
import Link from "next/link";
import { useState } from "react";
import Logo from "./Logo";
import Image from "next/image";
import IconButton from "./IconButton";
const Header = () => {
  const user = useUser();
  console.log(user);
  const [menuOpen, setMenuOpen] = useState(false);
  const navLinks = [
    {
      name: "Мужчинам",
      href: "/",
    },
    {
      name: "Женщинам",
      href: "/",
    },
    {
      name: "Новости",
      href: "/",
    },
    {
      name: "О нас",
      href: "/",
    }
  ];
  return (
    <header className="bg-content_1 py-4">
      <div className="container flex items-center justify-between text-sm lg:text-base ">
              <div className='button-container w-1/3 flex items-center justify-start lg:w-auto lg:hidden'>

                <IconButton src="/burger-menu-icon.svg" theme="light" onClick={() => setMenuOpen(!menuOpen)}>
                </IconButton>

              </div>
              <div className="left-panel flex items-center w-1/3 justify-center lg:gap-x-12 lg:w-auto">                             
                  <Logo/>
                    <nav className='hidden lg:flex'>
                      <ul className="nav-panel inline-flex space-x-6 text-white underline-offset-4 ">
                        {navLinks.map((navLink) => (
                          <Link key={navLink.name} href={navLink.href}><li className="underline decoration-transparent decoration-2 transition duration-300 ease-in-out hover:decoration-inherit">{navLink.name}</li></Link>
                        ))}
                      </ul>
                    </nav>
              </div>
              <div className='right-panel flex items-center justify-end gap-x-4 sm:gap-x-6 w-1/3 lg:w-auto'>

                      <Form className="hidden lg:flex relative" action="/catalog">
                      
                    {/* On submission, the input value will be appended to 
                        the URL, e.g. /search?query=abc */}
                          <input type= "text" name="query" placeholder='Поиск'
                          className="search-field bg-content_main_white text-content_1 px-4 py-2 rounded-full" />
                          <Image src="/search-icon.svg" width="24" height="24" alt="" className="relative right-10 hover:brightness-75 transition "/>                   
                      </Form>
                      <IconButton src="/basket-icon.svg" theme="light" >
                      </IconButton>
                      <IconButton src="/user-icon.svg" theme="light" >
                      </IconButton>
              </div>
                

              {/* Боковая навигационная панель для небольших экранов  */}
                <div
                  className={`fixed z-20 bg-content_1 top-0 h-screen w-[75%] transition-all shadow-lg duration-500 lg:hidden ${
                     menuOpen ? "left-0" : "-left-full"
                    }`}
                  >
                 <div className="px-6 pt-4">
                    <div className='upper-panel flex justify-between mb-6'>
                        <Logo/>
                      <IconButton src="/x-white.svg" theme="light" onClick={() => setMenuOpen(!menuOpen)}>
                      </IconButton>               
                    </div>

                     {/* Строка поиска  */} 
                     <Form className="flex relative mb-6" action="/catalog">
                      
                      {/* On submission, the input value will be appended to 
                          the URL, e.g. /search?query=abc */}
                            <input type= "text" name="query" placeholder='Поиск'
                            className="search-field bg-content_main_white text-content_1 px-4 py-2 rounded-full w-full" />
                            <Image src="/search-icon.svg" width="24" height="24" alt="" className="relative right-10 hover:brightness-75 transition "/>                   
                        </Form> 

                    <ul className="nav-panel space-x-4 text-white underline-offset-4 ">
                        {navLinks.map((navLink) => (                        
                          <Link key={navLink.name} href={navLink.href}>
                            <div className="flex align-center justify-between">
                            <li className="underline decoration-transparent decoration-2 transition duration-300 ease-in-out hover:decoration-inherit">{navLink.name}</li>  
                            <IconButton src="/arrow-right-icon.svg" theme="light">
                            </IconButton>  
                            </div>
                          </Link>
                          
                        ))}
                    </ul>
                </div>
              </div>
      </div>

     
    </header>
  );
};
export default Header;