import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  updatePortfolioTitle,
  savePortfolio,
} from "../../lib/redux/slices/portfolioSlice";
import {
  exportAsJSON,
  exportAsHTML,
  exportAsPDF,
} from "../../lib/utils/exportUtils";
import { useToast } from "../../hooks/use-toast";
import { ThemeToggle } from "../theme/ThemeToggle";

const EditorHeader = () => {
  const [isExporting, setIsExporting] = useState(false);
  const { currentPortfolio } = useSelector((state) => state.portfolio);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleTitleChange = (e) => {
    dispatch(updatePortfolioTitle(e.target.value));
  };

  const handleSave = () => {
    dispatch(savePortfolio());
    toast({
      title: "Portfolio saved",
      description: "Your portfolio has been saved successfully",
    });
  };

  const handleExportJSON = () => {
    exportAsJSON(currentPortfolio);
    setIsExporting(false);
    toast({
      title: "Export successful",
      description: "Your portfolio has been exported as JSON",
    });
  };

  const handleExportHTML = () => {
    exportAsHTML(currentPortfolio);
    setIsExporting(false);
    toast({
      title: "Export successful",
      description: "Your portfolio has been exported as HTML",
    });
  };

  const handleExportPDF = () => {
    exportAsPDF("portfolio-preview", currentPortfolio);
    setIsExporting(false);
    toast({
      title: "Export successful",
      description: "Your portfolio has been exported as PDF",
    });
  };

  return (
    <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
      <div className="px-4 sm:px-6 lg:px-8 flex flex-wrap gap-4 justify-between items-center min-h-[4rem] py-2">
        <div className="flex-1 flex items-center min-w-0 w-full sm:w-auto">
          <button
            onClick={() => navigate("/dashboard")}
            className="mr-4 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
          </button>
          <input
            type="text"
            value={currentPortfolio.title}
            onChange={handleTitleChange}
            className="block w-full border-0 px-0 py-1.5 text-gray-900 dark:text-gray-100 shadow-none ring-0 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-0 sm:text-xl sm:leading-6 font-medium bg-transparent"
            placeholder="Portfolio Title"
          />
        </div>
        <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
          <div className="mr-2">
            <ThemeToggle />
          </div>
          <button
            onClick={handleSave}
            className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>

          <div className="relative">
            <button
              onClick={() => setIsExporting(!isExporting)}
              className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Export
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4 ml-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </button>

            {isExporting && (
              <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 z-50">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  <button
                    onClick={handleExportJSON}
                    className="w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                    role="menuitem"
                  >
                    Export as JSON
                  </button>
                  <button
                    onClick={handleExportHTML}
                    className="w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                    role="menuitem"
                  >
                    Export as HTML
                  </button>
                  <button
                    onClick={handleExportPDF}
                    className="w-full text-left block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                    role="menuitem"
                  >
                    Export as PDF
                  </button>
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => navigate("/dashboard")}
            className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Exit
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditorHeader;
