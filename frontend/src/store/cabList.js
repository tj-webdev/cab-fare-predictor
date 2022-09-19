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
    mPrice: 110, 
    nPrice: 130,
  },
  {
    id: 2,
    img: sedan,
    name: 'Delux',
    mPrice: 150, 
    nPrice: 180,
  },
  {
    id: 3,
    img: jeep,
    name: 'Premium',
    mPrice: 180, 
    nPrice: 210,
  },
  {
    id: 4,
    img: sports,
    name: 'VIP',
    mPrice: 200, 
    nPrice: 230,
  }
]

export default cabList;