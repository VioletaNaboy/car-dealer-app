export const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex items-center space-x-2">
        <div className="w-6 h-6 border-4 border-t-transparent border-blue-500 border-solid rounded-full animate-spin"></div>
        <span className="text-xl font-semibold text-blue-600">Loading...</span>
      </div>
    </div>
  );
};
