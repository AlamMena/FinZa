export default function CardContainer({ children, className }) {
  return (
    <div className={`${className} bg-white rounded-xl shadow-sm p-4 my-4 `}>
      {children}
    </div>
  );
}
