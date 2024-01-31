import TelegramIcon from "../img/telegram.svg"
import InstagramIcon from "../img/instagram.svg";
import ViberIcon from "../img/viber.svg";
import WhatsappIcon from "../img/whatsapp.svg";
import VkIcon from "../img/vk.svg";
import { ReactNode } from "react";

export type TMenuLink = { name: string, href: string }
export type TSocialLink = { icon: ReactNode, href: string }

export const menuLisksCol1 = [
    { name: "Каталог", href: "#" },
    { name: "Акции", href: "#" },
    { name: "Новости", href: "#" },
    { name: "Отзывы", href: "#" },
]

export const menuLisksCol2 = [
    { name: "Оплата и доставка", href: "#" },
    { name: "Часто спрашивают", href: "#" },
    { name: "Обратная связь", href: "#" },
    { name: "Контакты", href: "#" },
]

export const socialLinks = [
    { icon: <TelegramIcon />, href: "#" },
    { icon: <WhatsappIcon />, href: "#" },
    { icon: <ViberIcon />, href: "#" },
    { icon: <InstagramIcon />, href: "#" },
    { icon: <VkIcon />, href: "#" },
]