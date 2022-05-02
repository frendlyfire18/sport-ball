import React, {ReactNode, useEffect, useState} from 'react';
import {
    Text,
    Image,
    Box,
    Stack,
    Flex,
    Avatar,
    Link,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    useColorMode,
    Center, SimpleGrid, Badge, Icon,
} from '@chakra-ui/react';
import {
    IconButton,HStack
} from "@chakra-ui/react"
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import {FiShoppingCart,FiTrash2} from "react-icons/fi";
import {HamburgerIcon,CloseIcon} from "@chakra-ui/icons"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton
} from '@chakra-ui/react'
import {selectCart} from "../redux/feature/counter/counterSlice";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {useGetAllProductsQuery, useGetOneProductQuery} from "../generated/graphql";

import {
    deleteFromCart,
    increment,
    decrement
} from '../redux/feature/counter/counterSlice';
import {useRouter} from "next/router";
import {Form, Formik} from "formik";
import InputField from "./Inputs/InputFIeld";
import InputTextAreaField from "./Inputs/InputTextAresField";
import InputSelectField from "./Inputs/InputSelectField";
import FixedInputSelectField from "./Inputs/FixedInputSelectField";

const NavLink = ({ children,color,href }: { children: ReactNode,color:string,href:string }) => {
    const router = useRouter()
    return(
        <Link
            onClick={()=>{
                router.push(href)
            }}
            px={2}
            py={1}
            rounded={'md'}
            _hover={{
                textDecoration: 'none',
                bg: useColorModeValue('green.200', 'green.700'),
                color:`${color}`
            }}>
            {children}
        </Link>
    )
}

const BuyItem=({item})=>{
    const [variables,setV] = useState({_id: item.id})
    const [{data,fetching}] = useGetOneProductQuery({
        variables,
    })
    return(
        <>
            <Box>
                <Text>
                    {data.getOneProduct.name} : {item.num}, Цена: {(parseInt(item.num)*parseInt(data.getOneProduct.price))}₽
                </Text>
            </Box>
        </>
    )
}

const CartItem=({sum,hook,item,color})=>{
    const dispatch = useAppDispatch();
    const [variables,setV] = useState({_id: item.id})
    const [{data,fetching}] = useGetOneProductQuery({
        variables,
    })
    useEffect(() => {
        if(data){
            hook(sum+parseInt(data?.getOneProduct.price))
        }
    },[fetching])

    if(!data||fetching){
        return (
            <>
               Загрузка
            </>
        )
    }
    return(
        <Box>
            <Box p={5} sx={{
                '@media screen and (max-width: 540px) ':{
                    width:"200px"
                }
            }} width={"800px"}>
                <SimpleGrid columns={[1,null,4]}>
                    <Image
                        rounded={'lg'}
                        height={50}
                        width={"50%"}
                        mx={5}
                        objectFit={'cover'}
                        src={data.getOneProduct.image}
                    />
                    <SimpleGrid columns={[1,null,3]} mr={5}>
                        <Button onClick={()=>{
                            if(sum<(parseInt(data?.getOneProduct.price)*data?.getOneProduct.value)){
                                dispatch(increment({id:item.id}))
                                hook(sum+parseInt(data?.getOneProduct.price))
                            }
                        }} p={2} colorScheme={"green"}>+</Button>
                        <Box width={"50px"} color={color} mx={5} p={2}>
                            {item.num}
                        </Box>
                        <Button onClick={()=>{
                            dispatch(decrement({id:item.id}))
                            if(sum>parseInt(data?.getOneProduct.price))
                                hook(sum-parseInt(data?.getOneProduct.price))
                        }} p={2} colorScheme={"red"}>-</Button>
                    </SimpleGrid>
                    <Box color={color}>
                        {data.getOneProduct.name}
                    </Box>
                    <Button mr={5} colorScheme={"red"} ml={5} onClick={()=>{
                        dispatch(deleteFromCart({id:item.id,num:1}))
                        hook(sum-parseInt(data?.getOneProduct.price))
                    }}>
                        <FiTrash2/>
                    </Button>
                </SimpleGrid>
            </Box>
            <MenuDivider />
        </Box>
    )
}


const Cart =({color})=>{
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [sum,setSum] = useState(0)
    const cart = useAppSelector(selectCart);
    useEffect(() => {
        console.log(sum)
    },[sum])
    return(
        <>
            <Menu>
                <MenuButton p={1} borderRadius="lg" _hover={{
                    background:"hsl(125 100% 54%)",
                    color:"black",
                    textShadow:"none",
                }} sx={{
                    background:"hsl(323 21% 16%)",
                    color:"hsl(125 100% 54%)",
                    border:"hsl(125 100% 54%) 0.125em solid",
                    textShadow:"0 0 0.125em hsl(0 0% 100% / 0.3), 0 0 0.45em",
                    boxShadow:"inset 0 0 0.5em 0 hsl(125 100% 54%), 0 0 0.5em 0 hsl(125 100% 54%)",
                }}>
                    <Flex>
                        <Icon as={FiShoppingCart} h={7} w={7} alignSelf={'center'} />
                        <Center px={1}>
                            {cart?.length||0}
                        </Center>
                    </Flex>
                </MenuButton>
                <MenuList zIndex={10}>
                    {
                        !cart?.length
                        &&
                        <Text color={color} px={5}>
                            Корзина пуста
                        </Text>
                    }
                    {
                        cart?.length!==0
                        &&
                        cart?.map(item=>(
                            <CartItem sum={sum} hook={setSum} color={color} item={item}/>
                        ))
                    }
                    <Button onClick={onOpen} colorScheme={"green"} mx={10}>
                        Купить все за {sum} ₽
                    </Button>
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Оформление заказа (Дотавка только по Антрациту)</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Formik
                                    initialValues={
                                        {
                                            name:'',
                                            lastname:'',
                                            number:'',
                                            adress:'',
                                            email:''
                                        }}
                                    onSubmit={async (values, actions) => {
                                        console.log(values,cart)
                                        alert("Письмо о подтверждении заказа было отослано на почту " + values.email)
                                        onClose()
                                    }}
                                >
                                    {(props) => (
                                        <Form
                                        >
                                            <InputField
                                                placeholder={"Введите свое имя"}
                                                label={"Ваше имя"}
                                                name={"name"}
                                                type={"name"}
                                                width={"100%" as never}
                                            />
                                            <InputField
                                                placeholder={"Введите свою фамилию"}
                                                label={"Ваша фамилия"}
                                                name={"lastname"}
                                                type={"text"}
                                                width={"100%" as never}
                                            />
                                            <InputField
                                                placeholder={"Введите ваш контактный номер"}
                                                label={"Ваш контактный номерва"}
                                                name={"number"}
                                                type={"text"}
                                                width={"100%" as never}
                                            />
                                            <InputField
                                                placeholder={"Введите вашу почту"}
                                                label={"Ваша почта"}
                                                name={"email"}
                                                type={"email"}
                                                width={"100%" as never}
                                            />
                                            <InputField
                                                placeholder={"Введите ваш адрес"}
                                                label={"Ваш адрес"}
                                                name={"adress"}
                                                type={"text"}
                                                width={"100%" as never}
                                            />
                                            <Button
                                                isDisabled={(cart.length === 0)}
                                                mt={4}
                                                mb={10}
                                                width={"100%"}
                                                colorScheme={"green"}
                                                isLoading={props.isSubmitting}
                                                type='submit'
                                            >
                                                Купить
                                            </Button>
                                        </Form>
                                    )}
                                </Formik>
                            </ModalBody>
                            <ModalFooter>
                                <Stack>
                                    {
                                        cart?.length!==0
                                        &&
                                        cart?.map(item=>(
                                            <Box>
                                                <BuyItem item={item}/>
                                            </Box>
                                        ))
                                    }
                                </Stack>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </MenuList>
            </Menu>
        </>
    )
}

export default function Nav() {
    const router = useRouter();
    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Box
                 w="full" bg={"black"} px={4} color={"white"}>
                <Flex py={5} alignItems={'center'} justifyContent={'space-around'}>
                    <Box>
                        <Flex>
                            <Text sx={{
                                color:"hsl(125 100% 54%)",
                                textShadow:"0 0 0.125em hsl(0 0% 100% / 0.3), 0 0 0.45em",
                            }} fontSize="2xl" fontFamily="monospace" fontWeight="bold">SPORT-BALL</Text>
                            <Image width={"30px"} height={"30px"} src={"/logo.png"}/>
                            <Box display={{ base: 'none',md:"flex" }}>
                                <NavLink color={colorMode === 'light' ? "black" : "white"} href={"/"}>Каталог</NavLink>
                                <NavLink color={colorMode === 'light' ? "black" : "white"} href={"/categories"}>Категории</NavLink>
                                <NavLink color={colorMode === 'light' ? "black" : "white"} href={"/about"}>О нас</NavLink>
                            </Box>

                        </Flex>
                    </Box>
                    <IconButton
                        bg={"white"}
                        color={"black"}
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack
                    as={'nav'}
                    spacing={4}
                    display={{ base: 'none', md: 'flex' }}>
                        <Flex alignItems={'center'}>
                            <SimpleGrid columns={[1,null,2]} spacingX={"20px"}>
                                <Cart color={colorMode === 'light' ? "black" : "white"}/>
                                <Button _hover={{
                                    background:"hsl(125 100% 54%)",
                                    color:"black",
                                    textShadow:"none",
                                }} sx={{
                                    '@media screen and (max-width: 540px) ':{
                                        width:"25px",
                                        height:"25px"
                                    },
                                    background:"hsl(323 21% 16%)",
                                    color:"hsl(125 100% 54%)",
                                    border:"hsl(125 100% 54%) 0.125em solid",
                                    textShadow:"0 0 0.125em hsl(0 0% 100% / 0.3), 0 0 0.45em",
                                    boxShadow:"inset 0 0 0.5em 0 hsl(125 100% 54%), 0 0 0.5em 0 hsl(125 100% 54%)",
                                }} onClick={toggleColorMode} color={colorMode === 'light' ?"black":"white"}>
                                    {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                                </Button>
                            </SimpleGrid>
                        </Flex>
                        <Button _hover={{
                            background:"hsl(125 100% 54%)",
                            color:"black",
                            textShadow:"none",
                        }} sx={{
                            background:"hsl(125 21% 16%)",
                            color:"hsl(125 100% 54%)",
                            border:"hsl(125 100% 54%) 0.125em solid",
                            textShadow:"0 0 0.125em hsl(0 0% 100% / 0.3), 0 0 0.45em",
                            boxShadow:"inset 0 0 0.5em 0 hsl(125 100% 54%), 0 0 0.5em 0 hsl(125 100% 54%)",
                        }} onClick={()=>{
                            router.push("/enter")
                        }}>
                            Вход
                        </Button>
                    </HStack>
                </Flex>
                {isOpen ? (
                    <Box pl={10} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={4}>
                            <NavLink color={colorMode === 'light' ? "black" : "white"} href={"/"}>Каталог</NavLink>
                            <NavLink color={colorMode === 'light' ? "black" : "white"} href={"/categories"}>Категории</NavLink>
                            <NavLink color={colorMode === 'light' ? "black" : "white"} href={"/about"}>О нас</NavLink>
                            <Flex alignItems={'center'}>
                                <SimpleGrid columns={[2,null,2]} spacingX={"20px"}>
                                    <Button py={2} _hover={{
                                        background:"hsl(125 100% 54%)",
                                        color:"black",
                                        textShadow:"none",
                                    }} sx={{
                                        background:"hsl(323 21% 16%)",
                                        color:"hsl(125 100% 54%)",
                                        border:"hsl(125 100% 54%) 0.125em solid",
                                        textShadow:"0 0 0.125em hsl(0 0% 100% / 0.3), 0 0 0.45em",
                                        boxShadow:"inset 0 0 0.5em 0 hsl(125 100% 54%), 0 0 0.5em 0 hsl(125 100% 54%)",
                                    }} onClick={toggleColorMode} color={colorMode === 'light' ?"black":"white"}>
                                        {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                                    </Button>
                                    <Cart color={colorMode === 'light' ? "black" : "white"}/>
                                </SimpleGrid>
                            </Flex>
                            <Button _hover={{
                                background:"hsl(125 100% 54%)",
                                color:"black",
                                textShadow:"none",
                            }} sx={{
                                background:"hsl(323 21% 16%)",
                                color:"hsl(125 100% 54%)",
                                border:"hsl(125 100% 54%) 0.125em solid",
                                textShadow:"0 0 0.125em hsl(0 0% 100% / 0.3), 0 0 0.45em",
                                boxShadow:"inset 0 0 0.5em 0 hsl(125 100% 54%), 0 0 0.5em 0 hsl(125 100% 54%)",
                            }} onClick={()=>{
                                router.push("/enter")
                            }}>
                                Вход
                            </Button>
                        </Stack>
                    </Box>
                ) : null}
            </Box>
        </>
    );
}