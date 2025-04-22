import React from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Check } from "lucide-react";

const Features = () => {
  const subscription = useSelector((state) => state.auth.subscription);
  const navigate = useNavigate();

  const features = [
    {
      name: "Advanced Templates",
      description: "Access to premium portfolio templates",
      isPro: true,
    },
    {
      name: "Custom Branding",
      description: "Add your own logo and brand colors",
      isPro: true,
    },
    {
      name: "Analytics Dashboard",
      description: "Track portfolio views and engagement",
      isPro: true,
    },
    {
      name: "Basic Portfolio Editor",
      description: "Create and edit your portfolio",
      isPro: false,
    },
    {
      name: "Export to PDF",
      description: "Download your portfolio as PDF",
      isPro: false,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Features</h1>
        <div className="grid gap-6">
          {features.map((feature) => (
            <div
              key={feature.name}
              className="bg-white p-6 rounded-lg shadow-sm flex items-center justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold">{feature.name}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
              <div className="flex items-center gap-4">
                {feature.isPro && (
                  <span className="text-sm bg-blue-100 text-blue-800 py-1 px-3 rounded-full">
                    Pro
                  </span>
                )}
                {feature.isPro && subscription !== "pro" ? (
                  <Button
                    onClick={() => navigate("/pricing")}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    Upgrade
                  </Button>
                ) : (
                  <Check className="text-green-500 w-6 h-6" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
