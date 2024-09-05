const Button = ({ children, className, outline = false, ...rest }) => {
  return (
    <button
      {...rest}
      className={`bg-gamma/75 border text-white border-gamma/75 ${
        outline ? "hover:bg-transparent hover:text-gamma" : "hover:border-gamma hover:bg-gamma"
      } px-12 py-2.5 w-fit rounded-lg font-medium duration-[375ms] ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
