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
    passenger: '4 passenger',
    mPrice: 50, 
    nPrice: 70,
  },
  {
    id: 2,
    img: sedan,
    name: 'Delux',
    passenger: '4 passenger',
    mPrice: 90, 
    nPrice: 110,
  },
  {
    id: 3,
    img: jeep,
    name: 'Premium',
    passenger: '6 passenger',
    mPrice: 120, 
    nPrice: 140,
  },
  {
    id: 4,
    img: sports,
    name: 'VIP',
    passenger: '2 passenger',
    mPrice: 150, 
    nPrice: 180,
  }
]

export default cabList;