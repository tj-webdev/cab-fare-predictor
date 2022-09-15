import create from "zustand";

const bookingStore = create((set)=>({
  bookingData: {
    pickup: '',
    destination: '',
    cabId: '',
  },

  setBooking: (data) => set({bookingData: data})

}));

export default bookingStore;