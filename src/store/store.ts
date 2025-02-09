import { create } from "zustand";
import { produce } from "immer";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CoffeeData from "../data/CoffeeData";
import BeansData from "../data/BeansData";

export const useStore = create(
  persist(
    (set, get) => ({
      CoffeeList: CoffeeData,
      BeanList: BeansData,
      CartPrice:0,
      FavouritesList: [],
      CartList: [],
      OrderHistoryList: [],
      addToCart: (item:any) => {
        set(
          produce((state) => {
            let found = false
            for (let i = 0; i < state.CartList.length; i++) {
              if (state.CartList[i].id === item.id) {
                found = true
                let size = false
                for (let j = 0; j < state.CartList[i].prices.length; j++) {
                  if (state.CartList[i].prices[j].size === item.prices[0].size) {
                    size = true;
                    state.CartList[i].prices[j].quantity++;
                    break;
                  }
                }
                if(size === false) {
                  state.CartList[i].prices.push(item.prices[0])
                } 
                state.CartList[i].prices.sort((a:any, b:any) => {
                  if(a.size > b.size) {return -1;}
                  if(a.size < b.size) {return 1;}
                  return 0;
                })
                break;
              }
            } 
            if(found === false) {
              state.CartList.push(item)
            }
          })
        );
      },

      calculateCartPrice: () => 
        set(
          produce(state => {
            let price = 0;
            for (let i = 0; i < state.CartList.length; i++) {
              let tempPrice = 0;
              for (let j = 0; j < state.CartList[i].prices.length; j++) {
                tempPrice += parseFloat(state.CartList[i].prices[j].price) * state.CartList[i].prices[j].quantity;
              }
              state.CartList[i].itemPrice = tempPrice.toFixed(2).toString();
              price += tempPrice;
            }
            state.CartPrice = price.toFixed(2).toString();
          })
        ),
        addTofavList:(type:string, id:string) =>set(produce(state=>{
          if(type == 'Coffee'){
            for(let i =0;i<state.CoffeeList.length;i++){
              if(state.CoffeeList[i].id == id){
                if(state.CoffeeList[i].favourite == false){
                  state.CoffeeList[i].favourite = true;
                  state.FavouritesList.unshift(state.CoffeeList[i])
                }
                break;
              }
            }
          }else if(type == 'Bean'){
            for(let i =0;i<state.BeanList.length;i++){
              if(state.BeanList[i].id == id){
                if(state.BeanList[i].favourite == false){
                  state.BeanList[i].favourite = true;
                  state.FavouritesList.unshift(state.BeanList[i])
                }
                break;
              }
            }
          }
        }),
      ),
      deleteFromFavorite:(type:string, id:string)=>set(produce(state=>{
        if(type == 'Coffee'){
          for(let i =0;i<state.CoffeeList.length;i++){
            if(state.CoffeeList[i].id == id){
              if(state.CoffeeList[i].favourite == true){
                state.CoffeeList[i].favourite = false;
              }
              break;
            }
          }
        }else if(type == 'Bean'){
          for(let i =0;i<state.BeanList.length;i++){
            if(state.BeanList[i].id == id){
              if(state.BeanList[i].favourite == true){
                state.BeanList[i].favourite = false;
              }
              break;
            }
          }
        }
        let spliceIndex = -1;
        for(let i =0;i<state.FavouritesList.length;i++){
          if(state.FavouritesList[i].id == id){
            spliceIndex = i;
            break;
          }
        }
        state.FavouritesList.splice(spliceIndex, 1);
      })
    ),
    incrementCartItemQuantity: (id: string, size: string) =>
      set(
        produce(state => {
          for (let i = 0; i < state.CartList.length; i++) {
            if (state.CartList[i].id == id) {
              for (let j = 0; j < state.CartList[i].prices.length; j++) {
                if (state.CartList[i].prices[j].size == size) {
                  state.CartList[i].prices[j].quantity++;
                  break;
                }
              }
            }
          }
        }),
      ),
    decrementCartItemQuantity: (id: string, size: string) =>
      set(
        produce(state => {
          for (let i = 0; i < state.CartList.length; i++) {
            if (state.CartList[i].id == id) {
              for (let j = 0; j < state.CartList[i].prices.length; j++) {
                if (state.CartList[i].prices[j].size == size) {
                  if (state.CartList[i].prices.length > 1) {
                    if (state.CartList[i].prices[j].quantity > 1) {
                      state.CartList[i].prices[j].quantity--;
                    } else {
                      state.CartList[i].prices.splice(j, 1);
                    }
                  } else {
                    if (state.CartList[i].prices[j].quantity > 1) {
                      state.CartList[i].prices[j].quantity--;
                    } else {
                      state.CartList.splice(i, 1);
                    }
                  }
                  break;
                }
              }
            }
          }
        }),
      ),
    addToOrderHistoryListFromCart: () =>
      set(
        produce(state => {
          let temp = state.CartList.reduce(
            (accumulator: number, currentValue: any) =>
              accumulator + parseFloat(currentValue.ItemPrice),
            0,
          );
          if (state.OrderHistoryList.length > 0) {
            state.OrderHistoryList.unshift({
              OrderDate:
                new Date().toDateString() +
                ' ' +
                new Date().toLocaleTimeString(),
              CartList: state.CartList,
              CartListPrice: temp.toFixed(2).toString(),
            });
          } else {
            state.OrderHistoryList.push({
              OrderDate:
                new Date().toDateString() +
                ' ' +
                new Date().toLocaleTimeString(),
              CartList: state.CartList,
              CartListPrice: temp.toFixed(2).toString(),
            });
          }
          state.CartList = [];
        }),
      ),
    
    }),
    {
      name: "coffee-app",
      storage: createJSONStorage(() => AsyncStorage),
    },
  )
)