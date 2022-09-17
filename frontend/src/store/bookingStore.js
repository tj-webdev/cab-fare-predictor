import create from "zustand";



const bookingStore = create((set)=>({
  bookingData: {
    pickup: '',
    drop: ''
  },

  setPickDest: (data) => set({bookingData: data})

}));

export default bookingStore;