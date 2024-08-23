import React from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FaTrash } from "react-icons/fa";
import {
  CurrencyTypes,
  DphTypesNames,
  DphTypesValues,
  generateId,
} from "../data_structure/data";
import { StoreState } from "../data_structure/store";
import WeightMeasure from "./WeightMeasure";

interface PriceMeasureProps {
  index: number;
  store: StoreState;
}

function PriceMeasure({ index, store }: PriceMeasureProps) {
  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    store.setCurrency(e.target.value, index);
  };

  const handlePriceWithoutDphChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = Number(e.target.value);
    store.setPriceWithoutDph(value, index);
  };

  const handleDphTaxChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = Number(e.target.value);
    store.setDphTax(value, index);
  };

  const handleAddPriceMeasure = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    store.addNewValue();
  };

  const removeValue = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (index > 0) {
      store.removeValue(index);
    }
  };

  return (
    <>
      <div className="WeightMeasureRow">
        <FloatingLabel
          key={`currency-label${index}`}
          label="Měna"
          className="label_holder"
        >
          <Form.Select
            className="FieldComponent"
            onChange={handleCurrencyChange}
            key={`currency-input${index}`}
          >
            <option value={CurrencyTypes.CZK}>{CurrencyTypes.CZK}</option>
            <option value={CurrencyTypes.EUR}>{CurrencyTypes.EUR}</option>
          </Form.Select>
        </FloatingLabel>
        <FloatingLabel
          controlId={generateId("width-label")}
          label="Cena dobírky bez DPH"
          className="label_holder"
          key={`price-wo-dph-label${index}`}
        >
          <Form.Control
            type="number"
            className="FieldComponent"
            key={`price-wo-dph-input${index}`}
            onChange={handlePriceWithoutDphChange}
          />
        </FloatingLabel>
        <FloatingLabel
          key={`dph-label${index}`}
          label="DPH"
          className="label_holder"
        >
          <Form.Select
            className="FieldComponent"
            onChange={handleDphTaxChange}
            key={`combo-dph${index}`}
          >
            <option value={DphTypesValues.SIMPLE}>
              {DphTypesNames.SIMPLE}
            </option>
            <option value={DphTypesValues.COMPLEX}>
              {DphTypesNames.COMPLEX}
            </option>
            <option value={DphTypesValues.EMPTY}>{DphTypesNames.EMPTY}</option>
          </Form.Select>
        </FloatingLabel>
        <Button
          variant="outline-dark"
          className="FieldButton"
          key={`btn-add-price${index}`}
          onClick={handleAddPriceMeasure}
        >
          Přidat měnu
        </Button>
        <Button
          variant="outline-dark"
          key={`btn-delete-price${index}`}
          onClick={removeValue}
        >
          <FaTrash />
        </Button>
      </div>
      {store.storage[index].weightPackage.map((value, myIndex) => {
        return (
          <React.Fragment key={index}>
            <WeightMeasure
              index={myIndex}
              parentIndex={index}
              key={`weightMeasure${myIndex}`}
            />
          </React.Fragment>
        );
      })}
    </>
  );
}

export default PriceMeasure;
