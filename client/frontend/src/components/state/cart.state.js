import React from 'react';
import { createState, useState } from '@hookstate/core';

const cartState = createState([]);

// export default cartState;

export default function useCartState() {
    const state = useState(cartState)
    

    // This function wraps the state by an interface,
    // i.e. the state link is not accessible directly outside of this module.
    // The state for tasks in TasksState.ts exposes the state directly.
    // Both options are valid and you need to use one or another,
    // depending on your circumstances. Apply your engineering judgement
    // to choose the best option. If unsure, exposing the state directly
    // like it is done in the TasksState.ts is a safe bet.        
    return ({
        get list() {
            return state.get()
        },
        addProduct(product) {
            state.set(p => [...p, { ...product, time: new Date().getTime() }])
        },
        remove(product) {
            console.log('remove product=', product);
            state.set(p => p.filter(item => item.time !== product.time))
        },
        get sumPrice() {
            return state.get().reduce((total, cur) => {
                console.log('cur=', cur)
                return total + Number(cur.price-cur.price/100*cur.discount)
            }, 0)
        }

    })
}