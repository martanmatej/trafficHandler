import React from "react";
import { Button } from "react-bootstrap";
import useStore from "../data_structure/store";
import {
  DphTypesNames,
  DphTypesValues,
  mergeDphData,
} from "../data_structure/data";

function ControllerComponent() {
  const store = useStore();

  const btnLog = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    store.storage.map((item) => {
      console.log(
        `Položka č.${item.id + 1}: \n
        Měna: ${item.pricePackage.currency} \n
        DPH: ${mergeDphData(item.pricePackage.dphTax)} \n
        Cena dobírky bez DPH: ${item.pricePackage.priceWithoutDph} \n
        ${item.weightPackage.map((weight) => {
          return `Váha: ${weight.weight} \n
          Cena: ${weight.price} ${item.pricePackage.currency}
          `;
        })}
        `
      );
    });

    console.log("Veškeré položky", store.storage);
  };

  return (
    <div className="Controller">
      <Button variant="success" onClick={btnLog}>
        Uložit
      </Button>
    </div>
  );
}

export default ControllerComponent;
