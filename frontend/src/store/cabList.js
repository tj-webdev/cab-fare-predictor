import jeep from "../lottieFiles/jeep.json";
import jeep2 from "../lottieFiles/jeep2.json";
import sedan from "../lottieFiles/sedan.json";
import sports from "../lottieFiles/sports.json";

/*
  1. Prices are given per kilometer
    a) mPrice = morning price
    b) nPrice = night price
*/

const cabList = [
  {
    id: 1,
    img: jeep2,
    name: 'Mini',
    mPrice: 50, 
    nPrice: 70,
  },
  {
    id: 2,
    img: sedan,
    name: 'Delux',
    mPrice: 90, 
    nPrice: 110,
  },
  {
    id: 3,
    img: jeep,
    name: 'Premium',
    mPrice: 120, 
    nPrice: 140,
  },
  {
    id: 4,
    img: sports,
    name: 'VIP',
    mPrice: 150, 
    nPrice: 180,
  }
]

export default cabList;