const Logo = (props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="180"
      height="32"
      viewBox="0 0 180 32"
      {...props}
    >
      <text
        x="0"
        y="23"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="22"
        fontWeight="700"
        fill="#209F85"
        letterSpacing="0.3"
      >
        Tim&apos;s Apothecary
      </text>
    </svg>
  );
};

export default Logo;
