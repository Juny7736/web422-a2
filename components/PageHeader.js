export default function PageHeader({ text, subtext }) {
  return (
    <>
      <div className="p-5 mb-4 bg-light border rounded-3">
        <h1 className="display-5 fw-bold text-primary">{text}</h1>
        {subtext && <p className="lead mb-0">{subtext}</p>}
      </div>
    </>
  );
}
