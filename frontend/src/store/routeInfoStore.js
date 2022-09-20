import create from "zustand";

const routeInfoStore = create((set)=>({
  routeInfo: {
    pickup: '',
    drop: '',
    pickupTime: '',
    distance: '',
    duration: ''
  },

  setRouteInfo: (data) => set({routeInfo: data}),
}));

export default routeInfoStore;