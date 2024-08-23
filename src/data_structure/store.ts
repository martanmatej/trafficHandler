import { create } from "zustand";
import { PackageDataInterface, CurrencyTypes, DphTypesValues } from "./data";

//! Interface pro store -> obsahuje reducery pro setting hodnot
//Veškeré hodnoty jsou uložené ve store.storage
export interface StoreState {
  setCurrency: (currency: string, index: number) => void;
  setPriceWithoutDph: (priceWithoutDph: number, index: number) => void;
  setDphTax: (dphTax: number, index: number) => void;
  setPrice: (price: number, parentIndex: number, index: number) => void;
  setWeight: (weight: number, parentIndex: number, index: number) => void;
  addWeightPackage: (parentIndex: number) => void;
  storage: PackageDataInterface[];
  setStorage: (values: PackageDataInterface[]) => void;
  addNewValue: () => void;
  removeWeight: (parentIndex: number, index: number) => void;
  removeValue: (index: number) => void;
}

//! Store reprezentující celou strukturu dat
// - Funguje podobně jako redux, ale s méně incializací a bez context providera {zustand}
const useStore = create<StoreState>((set) => ({
  storage: [
    {
      id: 0,
      pricePackage: {
        currency: CurrencyTypes.CZK,
        priceWithoutDph: 0,
        dphTax: DphTypesValues.SIMPLE,
      },
      weightPackage: [{ weight: 0, price: 0 }],
    },
  ],

  setCurrency: (currency, index) =>
    set((state) => {
      const updatedStorage = [...state.storage];
      updatedStorage[index] = {
        ...updatedStorage[index],
        pricePackage: {
          ...updatedStorage[index].pricePackage,
          currency,
        },
      };
      return { storage: updatedStorage };
    }),
  setPrice: (price, parentIndex, index) =>
    set((state) => {
      const updatedStorage = [...state.storage];
      updatedStorage[parentIndex] = {
        ...updatedStorage[parentIndex],
        weightPackage: updatedStorage[parentIndex].weightPackage.map((wp, i) =>
          i === index ? { ...wp, price } : wp
        ),
      };
      return { storage: updatedStorage };
    }),
  setPriceWithoutDph: (priceWithoutDph, index) =>
    set((state) => {
      const updatedStorage = [...state.storage];
      updatedStorage[index] = {
        ...updatedStorage[index],
        pricePackage: {
          ...updatedStorage[index].pricePackage,
          priceWithoutDph: Number(priceWithoutDph),
        },
      };
      return { storage: updatedStorage };
    }),
  setDphTax: (dphTax, index) =>
    set((state) => {
      const updatedStorage = [...state.storage];
      updatedStorage[index] = {
        ...updatedStorage[index],
        pricePackage: {
          ...updatedStorage[index].pricePackage,
          dphTax: Number(dphTax),
        },
      };
      return { storage: updatedStorage };
    }),
  setWeight: (weight, parentIndex, index) =>
    set((state) => {
      const updatedStorage = [...state.storage];
      updatedStorage[parentIndex] = {
        ...updatedStorage[parentIndex],
        weightPackage: updatedStorage[parentIndex].weightPackage.map((wp, i) =>
          i === index ? { ...wp, weight } : wp
        ),
      };
      return { storage: updatedStorage };
    }),
  addWeightPackage: (parentIndex) =>
    set((state) => {
      const updatedStorage = [...state.storage];
      const updatedWeightPackage = [
        ...updatedStorage[parentIndex].weightPackage,
        { weight: 0, price: 0 },
      ];
      updatedStorage[parentIndex] = {
        ...updatedStorage[parentIndex],
        weightPackage: updatedWeightPackage,
      };
      return { storage: updatedStorage };
    }),
  setStorage: (values) => set({ storage: values }),
  addNewValue: () =>
    set((state) => {
      const newValue = {
        id: state.storage.length,
        pricePackage: {
          currency: CurrencyTypes.CZK,
          priceWithoutDph: 0,
          dphTax: DphTypesValues.SIMPLE,
        },
        weightPackage: [{ weight: 0, price: 0 }],
      };
      return { storage: [...state.storage, newValue] };
    }),
  removeWeight: (parentIndex, index) =>
    set((state) => {
      const updatedStorage = [...state.storage];
      updatedStorage[parentIndex] = {
        ...updatedStorage[parentIndex],
        weightPackage: updatedStorage[parentIndex].weightPackage.filter(
          (_, i) => i !== index
        ),
      };
      return { storage: updatedStorage };
    }),
  removeValue: (index) =>
    set((state) => {
      const updatedStorage = state.storage.filter((_, i) => i !== index);
      return { storage: updatedStorage };
    }),
}));

export default useStore;
