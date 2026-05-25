const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  try {
    let popUrl = '';
    if (formData.proofOfPayment) {
      // Bypasses Firebase Storage entirely to avoid CORS locks forever
      popUrl = await getBase64(formData.proofOfPayment);
    }
    if (db) {
      await addDoc(collection(db, 'event_registrations'), {
        fullName: formData.fullName,
        email: formData.email,
        paymentMethod: 'eft',
        proofOfPaymentUrl: popUrl,
        status: 'pending_verification',
        eventName: 'Shop Merchandise Purchase',
        eventDate: new Date().toLocaleDateString(),
        eventLink: 'N/A - Physical Gear Delivery',
        deliveryAddress: formData.address,
        courierChoice: chosenCourier?.name,
        courierCost: courierPrice,
        items: cart,
        totalCost: grandTotal,
        timestamp: serverTimestamp(),
      });
    }
    setStep(3);
  } catch (error) {
    console.error("Checkout failed entirely:", error);
    alert("An unexpected error occurred during submission. Please try again.");
  } finally {
    setIsSubmitting(false);
  }
};
