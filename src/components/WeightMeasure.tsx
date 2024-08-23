import React from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FaTrash } from "react-icons/fa";
import useStore from "../data_structure/store";
import { generateId } from "../data_structure/data";

function WeightMeasure({
  index,
  parentIndex,
}: {
  index: number;
  parentIndex: number;
}) {
  const store = useStore();

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    store.setWeight(value, parentIndex, index);
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);

    store.setPrice(value, parentIndex, index);
  };

  const addNewWeight = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    store.addWeightPackage(parentIndex);
  };

  const removeWeight = (e: React.MouseEvent<HTMLButtonElement>) => {
    //Předpokládáme, že bude alespoň 1 váha
    if (index > 0) {
      store.removeWeight(parentIndex, index);
    }
  };

  return (
    <div className="WeightMeasureRow">
      <FloatingLabel
        controlId={generateId("weight-label")}
        label="Váha"
        className="label_holder"
      >
        <Form.Control
          type="number"
          className="FieldComponent"
          onChange={handleWeightChange}
        />
      </FloatingLabel>
      <FloatingLabel
        controlId={generateId("price-label")}
        label="Cena"
        className="label_holder"
      >
        <Form.Control
          type="number"
          className="FieldComponent"
          onChange={handlePriceChange}
        />
      </FloatingLabel>
      <Button
        variant="outline-dark"
        className="FieldButton"
        onClick={addNewWeight}
      >
        Přidat hmotnost
      </Button>
      <Button variant="outline-dark" onClick={removeWeight}>
        <FaTrash />
      </Button>
    </div>
  );
}

export default WeightMeasure;
