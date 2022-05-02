import {
    createSlice
} from '@reduxjs/toolkit';
import type { RootState } from '../../store';

export type cartState = {
    goods: [];
};

const initialState: cartState = {
    goods: [],
};

const compareStrings = (id_1:string,id_2:string) => id_1.includes(id_2)

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        increment:(state, action)=>{
            let newArr=new Array();
            state.goods.forEach((good:any,value:any)=>{
                (newArr[value] as any) = good
                if(good.id===action.payload.id){
                    good.num += 1;
                    (newArr[value] as any) = good
                }
            })
            // @ts-ignore
            state.goods = newArr
        },
        decrement:(state, action)=>{
            let newArr=new Array();
            state.goods.forEach((good:any,value:any)=>{
                (newArr[value] as any) = good
                if(good.id===action.payload.id){
                    if(good.num>1)
                        good.num -= 1;
                        (newArr[value] as any) = good
                }
            })
            // @ts-ignore
            state.goods = newArr
        },
        addToCart: (state, action) => {
            let isInArray = false;
            let newArr = new Array();
            state.goods.forEach((good:any,value)=>{
                if(good.id===action.payload.id){
                    good.num += 1;
                    (newArr[value] as any) = good
                    isInArray = true
                }
                newArr[value] = good
            })
            if(isInArray){
                // @ts-ignore
                state.goods = newArr
            }else{
                state.goods.push((action.payload as never));
            }
        },
        deleteFromCart: (state, action) => {
            let newArr= new Array();
            state.goods.forEach((good:any,value:any)=>{
                if(good.id!==action.payload.id){
                    (newArr[value] as any) = good
                }
            })
            // @ts-ignore
            state.goods = newArr
        },
    },
});
export const {
    addToCart,
    deleteFromCart,
    increment,
    decrement
} = cartSlice.actions;

export const selectCart = (state: RootState) => state.counter.goods;

export default cartSlice.reducer;