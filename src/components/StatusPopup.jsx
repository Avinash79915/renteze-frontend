import React from "react";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

const StatusPopup = ({ type, message }) => {
  const iconProps = "w-5 h-5 mr-2";

  return (
    <div className="fixed top-6 right-6 z-50">
      <div
        className={`flex items-center px-4 py-3 rounded-lg shadow-lg text-white 
          ${type === "success" ? "bg-green-600" : type === "error" ? "bg-red-600" : "bg-blue-600"}
        `}
      >
        {type === "success" && <CheckCircle className={iconProps} />}
        {type === "error" && <XCircle className={iconProps} />}
        {type === "loading" && (
          <Loader2 className={`${iconProps} animate-spin`} />
        )}
        <span>{message}</span>
      </div>
    </div>
  );
};

export default StatusPopup;
