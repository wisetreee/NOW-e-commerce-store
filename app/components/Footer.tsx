import Image from "next/image";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className='w-full h-[17rem] bg-content_1 pt-8'>
        <div className="container">
            <Logo/>
            <div className="flex gap-4 mt-4">
            <Image src="/mail-icon.svg" width="24" height="24" alt="" className="hover:brightness-75 transition"/>
            <h3 className="text-white">nowsneakers@gmail.com</h3>
            </div>

            <div className="flex gap-4 mt-4">
            <Image src="/phone-icon.svg" width="24" height="24" alt="" className="hover:brightness-75 transition"/>
            <h3 className="text-white">8-999-999-99-99</h3>
            </div>

            <div className="flex gap-4 mt-4">
            <Image src="/geo-icon.svg" width="24" height="24" alt="" className="hover:brightness-75 transition"/>
            <h3 className="text-white">Ул.Пушкина, 1</h3>
            </div>
        </div>
    </footer>
  );
};

export default Footer;