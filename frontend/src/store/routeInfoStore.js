import create from "zustand";



const routeInfoStore = create((set)=>({
  routeInfo: {
    pickup: '',
    drop: '',
    distance: '0',
    duration: '0'
  },

  setRouteInfo: (data) => set({routeInfo: data}),
}));

export default routeInfoStore;