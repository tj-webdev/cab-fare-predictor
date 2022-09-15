import create from "zustand";

/*
  1. Prices are given per kilometer
    a) mPrice = morning price
    b) nPrice = night price

*/

const cabStore = create((set)=>({
  cabList: [
    {
      id: 1,
      img: 'some image',
      name: 'sedans',
      mPrice: 50, 
      nPrice: 60,
    },
    {
      id: 2,
      img: 'some image',
      name: 'SUV',
      mPrice: 80, 
      nPrice: 90,
    },
    {
      id: 3,
      img: 'some image',
      name: 'primes',
      mPrice: 110, 
      nPrice: 130,
    },
    {
      id: 4,
      img: 'some image',
      name: 'special',
      mPrice: 150, 
      nPrice: 180,
    }
  ]

}));

export default cabStore;