
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from "@/components/ui/button";
import { Check, ArrowLeft } from "lucide-react";
import { upgradeToPro } from '@/lib/redux/slices/authSlice';
import Navbar from '@/components/common/Navbar';

const PricingPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { subscription } = useSelector((state) => state.auth);

  const handleUpgrade = () => {
    navigate('/checkout');
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Button
            variant="ghost"
            className="mb-6"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Simple, transparent pricing
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Choose the plan that best fits your needs
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-12 max-w-4xl mx-auto">
            {/* Free Plan */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="px-6 py-8">
                <h3 className="text-2xl font-semibold text-gray-900">Free</h3>
                <p className="mt-4 text-gray-500">Perfect for getting started</p>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-gray-900">$0</span>
                  <span className="text-base font-medium text-gray-500">/month</span>
                </p>
                <div className="mt-8 space-y-4">
                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="ml-3 text-gray-500">1 Portfolio</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="ml-3 text-gray-500">Basic Templates</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="ml-3 text-gray-500">Standard Support</span>
                  </div>
                </div>
                <Button
                  className="mt-8 w-full"
                  variant="outline"
                  disabled
                >
                  Current Plan
                </Button>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-purple-500">
              <div className="px-6 py-8">
                <h3 className="text-2xl font-semibold text-gray-900">Pro</h3>
                <p className="mt-4 text-gray-500">For professionals who need more</p>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-gray-900">$19</span>
                  <span className="text-base font-medium text-gray-500">/month</span>
                </p>
                <div className="mt-8 space-y-4">
                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="ml-3 text-gray-500">Unlimited Portfolios</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="ml-3 text-gray-500">Premium Templates</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="ml-3 text-gray-500">Priority Support</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="ml-3 text-gray-500">Custom Domain</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-green-500" />
                    <span className="ml-3 text-gray-500">Analytics</span>
                  </div>
                </div>
                <Button
                  className="mt-8 w-full"
                  onClick={handleUpgrade}
                  variant={subscription === 'pro' ? 'outline' : 'default'}
                  disabled={subscription === 'pro'}
                >
                  {subscription === 'pro' ? 'Current Plan' : 'Upgrade to Pro'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PricingPage;
