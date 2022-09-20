import create from "zustand";

const routeInfoStore = create((set)=>({
  routeInfo: {
    pickup: '',
    drop: '',
    pickupTime: '',
    distance: '',
    duration: ''
  },

  direction: null,

  setRouteInfo: (data) => set({routeInfo: data}),

  setDirection: (data) => set({direction: data})
}));

export default routeInfoStore;