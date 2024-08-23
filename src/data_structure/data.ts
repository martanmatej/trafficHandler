//Váha/cena
export interface WeightMeasureInterface {
  price: number;
  weight: number;
}

//Měna/Cena bez dobírky/DPH
export interface PriceMeasureInterface {
  currency: string;
  priceWithoutDph: number;
  dphTax: number;
}

//Merge setu ceny & setu hmotnosti
export interface PackageDataInterface {
  id: number;
  pricePackage: PriceMeasureInterface;
  weightPackage: WeightMeasureInterface[]; //N variant
}

export interface AllPackages {
  allPackages: PackageDataInterface[];
}

export enum CurrencyTypes {
  CZK = "CZK",
  EUR = "EUR",
}

//Reprezentuje DPH hodnotu -> zároveň je i ID
export enum DphTypesValues {
  SIMPLE = 21,
  COMPLEX = 12,
  EMPTY = 0,
}

//Hodnoty pro comboboxy u DPH
export enum DphTypesNames {
  SIMPLE = "Základní sazba",
  COMPLEX = "Snížená sazba",
  EMPTY = "Nulová sazba",
}

export function mergeDphData(dphValue: number) {
  switch (dphValue) {
    case DphTypesValues.SIMPLE:
      return `${DphTypesNames.SIMPLE} - ${DphTypesValues.SIMPLE}%`;
    case DphTypesValues.COMPLEX:
      return `${DphTypesNames.COMPLEX} - ${DphTypesValues.COMPLEX}%`;
    case DphTypesValues.EMPTY:
      return `${DphTypesNames.EMPTY} - ${DphTypesValues.EMPTY}%`;
    default:
      return "";
  }
}

//Generování automatického ID pro HTML DOM
export function generateId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}
