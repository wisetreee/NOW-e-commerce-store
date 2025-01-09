"use client";
import { useUser } from "@clerk/nextjs";
import Form from "next/form";
import Link from "next/link";
import { useState } from "react";
import Logo from "./Logo";
import Image from "next/image";
const Header = () => {
  const user = useUser();
  console.log(user);
  const [menuOpen, setMenuOpen] = useState(false);
  // const [searchOpen, setSearchOpen] = useState(false);
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
    <header className="bg-content_1 py-4 ">
      <div className="container mx-auto flex px-6 items-center justify-between text-sm lg:px-16 lg:text-base">
              <div className='button-container w-1/3 flex items-center justify-start lg:w-auto lg:hidden'>
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  >
                    <Image src="/burger-menu-icon.svg" width="24" height="24" alt="" className="hover:brightness-75 transition"/>
                </button>
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
              <div className='right-panel flex items-center justify-end gap-x-6 w-1/3 lg:w-auto'>
                      <Form action="/search"
                      className='relative'>
                    {/* On submission, the input value will be appended to 
                        the URL, e.g. /search?query=abc */}
                      <input type= "text" name="query" placeholder='Поиск'
                      className="hidden lg:search-field bg-content_main_white text-content_1 px-2 py-2 rounded-full placeholder: pl-4" />
                      </Form>
                      <button className='text-black'>
                      <Image src="/basket-icon.svg" width="24" height="24" alt="" className="hover:brightness-75 transition text-black"/>
                      </button>
                      <button>
                      <Image src="/user-icon.svg" width="24" height="24" alt=""className="hover:brightness-75 transition"/>
                      </button>
              </div>
                         
                <div
                  className={`fixed z-20 bg-content_1 top-0 h-screen w-[75%] transition-all duration-500 lg:hidden ${
                     menuOpen ? "left-0" : "-left-full"
                    }`}
                  >
                 <div className="container mx-auto px-6 pt-4">
                    <div className='upper-panel flex justify-between mb-12'>
                      <Logo/>
                      <button 
                        className="inset-y-0 right-0"
                        onClick={() => setMenuOpen(!menuOpen)}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M20 4L4 20M20 20L4 4" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                    </button>
                    
                    </div>

                    <ul className="nav-panel space-x-6 text-white underline-offset-4 ">
                        {navLinks.map((navLink) => (
                          
                          <Link key={navLink.name} href={navLink.href}>
                            <div className="flex align-center justify-between">
                            <li className="underline decoration-transparent decoration-2 transition duration-300 ease-in-out hover:decoration-inherit">{navLink.name}</li>
                            <Image src="/arrow-right-icon.svg" width="24" height="24" alt="" className="hover:brightness-75 transition"/>
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