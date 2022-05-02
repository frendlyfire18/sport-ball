import React, { ReactNode } from 'react';
import {
    IconButton,
    Box,
    CloseButton,
    Flex,
    Icon,
    useColorModeValue,
    Link,
    Drawer,
    DrawerContent,
    Text,
    useDisclosure,
    BoxProps,
    FlexProps, Image,
} from '@chakra-ui/react';
import {
    FiHome,
    FiMoreHorizontal,
    FiPhoneCall,
    FiZoomIn,
    FiSettings,
    FiMenu,
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import { ReactText } from 'react';
import Nav from "./NavBar";
import {BsCart4} from "react-icons/bs";
import NextLink from "next/link"

interface LinkItemProps {
    name: string;
    href:string;
    icon: IconType;
}
const LinkItems: Array<LinkItemProps> = [
    { name: 'Главная',href:"/", icon: FiHome },
    { name: 'Контакты',href:"/contacts", icon: FiPhoneCall },
    { name: 'Настройки',href:"/settings",  icon: FiSettings },
];

export default function SimpleSidebar({ children }: { children: ReactNode }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <Box minH="100vh">
            <SidebarContent
                onClose={() => onClose}
                display={{ base: 'none', md: 'block' }}
            />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full">
                <DrawerContent>
                    <SidebarContent onClose={onClose} />
                </DrawerContent>
            </Drawer>
            {/* mobilenav */}
            <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
            <Box ml={{ base: 0, md: 60 }} p="10">
                {children}
            </Box>
        </Box>
    );
}

interface SidebarProps extends BoxProps {
    onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
    return (
        <Box
            bg={"black"}
            color={"white"}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            pos="fixed"
            h="full"
            {...rest}>
            <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
                <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                    <Flex><Text>ZOO-LOVE</Text><Image sx={{
                        '@media screen and (max-width: 540px) ':{
                            width:"15px",
                            height:"15px"
                        }
                    }} width={"30px"} height={"30px"} src={
                        "/heart.png"
                    }/></Flex>
                </Text>
                <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
            </Flex>
            {LinkItems.map((link) => (
                <NavItem key={link.name}  href={link.href} icon={link.icon}>
                    {link.name}
                </NavItem>
            ))}
            <NavItem key={'Корзина'} href={"#"} icon={BsCart4}>
                Корзина
            </NavItem>
        </Box>
    );
};

interface NavItemProps extends FlexProps {
    icon: IconType;
    href:string;
    children: ReactText;
}
const NavItem = ({ icon,href, children, ...rest }: NavItemProps) => {
    return (
        <NextLink href={href}>
            <Link style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
                <Flex
                    align="center"
                    p="4"
                    mx="4"
                    borderRadius="lg"
                    role="group"
                    cursor="pointer"
                    _hover={{
                        bg: 'white',
                        color: 'black',
                    }}
                    {...rest}>
                    {icon && (
                        <Icon
                            mr="4"
                            fontSize="16"
                            _groupHover={{
                                color: 'black',
                            }}
                            as={icon}
                        />
                    )}
                    {children}
                </Flex>
            </Link>
        </NextLink>
    );
};

interface MobileProps extends FlexProps {
    onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
    return (
        <Flex
            pt={"100px"}
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 24 }}
            height="20"
            alignItems="center"
            bg={useColorModeValue('white', 'gray.900')}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent="flex-start"
            {...rest}>
            <IconButton
                variant="outline"
                onClick={onOpen}
                aria-label="open menu"
                icon={<FiMenu />}
            />
        </Flex>
    );
};