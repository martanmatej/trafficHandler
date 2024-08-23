import React, { useEffect } from "react";
import Form from "react-bootstrap/Form";
import PriceMeasure from "./PriceMeasure";
import useStore from "../data_structure/store";

function FormComponent() {
  const store = useStore();

  //Init data pro základní funkce
  useEffect(() => {
    if (store.storage.length === 0) {
      store.addNewValue();
    }
  }, []);

  return (
    <Form className="FormCmp">
      {store.storage.map((item, index) => {
        return (
          <PriceMeasure
            store={store}
            index={index}
            key={`priceMeasure${index}`}
          />
        );
      })}
    </Form>
  );
}

export default FormComponent;
