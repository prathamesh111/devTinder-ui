const Loader = () => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-base-100/80 backdrop-blur-[2px]"
      role="status"
      aria-label="Loading"
    >
      <span
        className="loading loading-ring loading-xl text-primary"
        aria-hidden="true"
      ></span>
    </div>
  );
};

export default Loader;