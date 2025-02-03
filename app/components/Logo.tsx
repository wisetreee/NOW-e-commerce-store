import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
        <Link href = "/">
        <Image src="logo.svg" width={90} height={30} alt="" />
        </Link>
  );
};

export default Logo;