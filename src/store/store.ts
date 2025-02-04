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
                state.CartPrice[i].prices.sort((a:any, b:any) => {
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
          
        }))
    }),
    
    {
      name: "coffee-app",
      storage: createJSONStorage(() => AsyncStorage),
    },
  )
)