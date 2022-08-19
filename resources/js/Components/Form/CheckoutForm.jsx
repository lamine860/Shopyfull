import { useForm, usePage } from "@inertiajs/inertia-react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import Button from "../Button";
import Spinner from "../Spinner";
import FormGroup from "./FormGroup";

export default function CheckoutFrom() {
  const { setData, errors, data, clearErrors, setError, hasErrors } = useForm({
    address: "",
    city: "",
    country: "",
    postal_code: "",
    phone: "",
  });
  const elements = useElements();
  const stripe = useStripe();
  const { order } = usePage().props;
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    clearErrors();
    try {
      const response = await axios.post(route("order.pay", order), data);
    } catch (e) {
      const responseErrors = e.response.data.errors;
      const keys = Object.keys(responseErrors);
      keys.map((k) => {
        setError(k, responseErrors[k]);
      });
      setLoading(false);
      return;
    }
    if (!stripe || !elements) return;
    const result = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: route("payment.confirm", order),
      },
    });
    if (result.error) {
      setLoading(false);
      console.log(result.error.message);
    }
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <FormGroup error={errors.address}>
        <FormGroup.Label>Adresse</FormGroup.Label>
        <FormGroup.Control
          name="address"
          value={data.address}
          handleChange={setData}
          error={errors.address}
        />
      </FormGroup>
      <FormGroup error={errors.city}>
        <FormGroup.Label>Ville</FormGroup.Label>
        <FormGroup.Control
          name="city"
          value={data.city}
          handleChange={setData}
          error={errors.city}
        />
      </FormGroup>
      <FormGroup error={errors.country}>
        <FormGroup.Label>Pays</FormGroup.Label>
        <FormGroup.Control
          name="country"
          value={data.country}
          handleChange={setData}
          error={errors.country}
        />
      </FormGroup>
      <FormGroup error={errors.phone}>
        <FormGroup.Label>Téléphone</FormGroup.Label>
        <FormGroup.Control
          name="phone"
          value={data.phone}
          handleChange={setData}
          error={errors.phone}
        />
      </FormGroup>
      <FormGroup error={errors.postal_code}>
        <FormGroup.Label>Code postal</FormGroup.Label>
        <FormGroup.Control
          name="postal_code"
          value={data.postal_code}
          handleChange={setData}
          error={errors.postal_code}
        />
      </FormGroup>
      <PaymentElement />
      {!loading ? <Button className="mt-4">Payer</Button> : <Spinner />}
    </form>
  );
}
