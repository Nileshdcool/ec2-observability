import React from "react";
import { getAppVersion } from "../lib/version";

const AppFooter = () => {
  const env = process.env.NEXT_PUBLIC_ENV || "unknown";
  const version = process.env.NEXT_PUBLIC_VERSION || getAppVersion();
  return (
    <footer className="mt-auto pt-6 text-xs text-gray-500 dark:text-gray-400 text-center">
      <span>Version: {version} | Environment: {env}</span>
    </footer>
  );
};

export default AppFooter;
