import Image from "next/image";
import logo from "@/public/logo.svg"

export const Logo = () => {
    return <Image height={130} width={130} alt="logo" src={logo}/>
}
