import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";

// Replace with your Stripe publishable key
const stripePromise = loadStripe("your_stripe_publishable_key_here");

export const Stripe: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <Elements stripe={stripePromise}>{children}</Elements>;
};

interface StripeCheckoutProps {
  clientSecret: string;
  children: React.ReactNode;
}

export const StripeCheckout: React.FC<StripeCheckoutProps> = ({
  clientSecret,
  children,
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    console.log(elements?.getElement(CardElement));

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement)!,
        billing_details: {
          // You can add billing details here if needed
        },
      },
    });

    if (result.error) {
      // Show error to your customer
      console.error(result.error.message);
    } else {
      if (result.paymentIntent?.status === "succeeded") {
        // The payment has been processed!
        console.log("Payment succeeded");
        // You can add your post-payment logic here
      }
    }
  };
  const handleChange = () => {
    console.log(elements?.getElement(CardElement));
  };

  return (
    <form onSubmit={handleSubmit} onChange={handleChange}>
      {children}
    </form>
  );
};
