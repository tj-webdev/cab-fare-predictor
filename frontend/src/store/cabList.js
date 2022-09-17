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
    name: 'Basic Cab',
    mPrice: 110, 
    nPrice: 130,
  },
  {
    id: 2,
    img: sedan,
    name: 'Delux Cab',
    mPrice: 50, 
    nPrice: 60,
  },
  {
    id: 3,
    img: jeep,
    name: 'Jeep',
    mPrice: 80, 
    nPrice: 90,
  },
  {
    id: 4,
    img: sports,
    name: 'Sports',
    mPrice: 150, 
    nPrice: 180,
  }
]

export default cabList;