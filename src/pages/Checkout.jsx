
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Button } from "@/components/ui/button";
import { upgradeToPro } from '@/lib/redux/slices/authSlice';

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePurchase = () => {
    dispatch(upgradeToPro());
    // Redirect back to the previous page or dashboard
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-6">Complete Your Purchase</h2>
        
        <div className="mb-6 p-4 bg-gray-50 rounded">
          <div className="flex justify-between mb-2">
            <span>Pro Plan (Monthly)</span>
            <span>$19.00</span>
          </div>
          <div className="flex justify-between text-sm text-gray-500">
            <span>Tax</span>
            <span>$1.90</span>
          </div>
          <div className="mt-4 pt-4 border-t flex justify-between font-bold">
            <span>Total</span>
            <span>$20.90</span>
          </div>
        </div>

        <Button 
          className="w-full"
          onClick={handlePurchase}
        >
          Purchase Now
        </Button>
        
        <button
          onClick={() => navigate(-1)}
          className="mt-4 w-full text-center text-gray-500 hover:text-gray-700"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Checkout;
