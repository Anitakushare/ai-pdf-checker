import { useState } from "react";
import axios from "axios";
import ResultTable from "./Components/ResultTable";

function App() {
  const [pdf, setPdf] = useState(null);
  const [rules, setRules] = useState(["", "", ""]);
  const [results, setResults] = useState([]);
  const [error,setError]=useState("")

  const handleRuleChange = (index, value) => {
    const updated = [...rules];
    updated[index] = value;
    setRules(updated);
  };

 const handleSubmit = async () => {
  try {
    const filledRules = rules.filter(r => r.trim() !== "");

    if (filledRules.length === 0) {
      setError("Please enter at least one rule.");
      return;
    }

    if (!pdf) {
      setError("Please upload a PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", pdf);
    formData.append("rules", JSON.stringify(filledRules));

    const res = await axios.post("http://localhost:3000/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    setResults(res.data.results);
    setError(""); // clear previous error
  } catch (err) {
    console.error(err);

    // gracefully show backend error
    setResults([]); 

    setError(
      err.response?.data?.message ||
        err.response?.data?.error ||
        "Something went wrong while processing your request!"
    );
  }
};

  return (
    <div className="bg-fuchsia-950 min-h-screen flex flex-col justify-center items-center gap-10">
    <div className="p-8 max-w-4xl bg-gray-200 rounded-lg mt-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">AI–PDF Rule Checker</h1>

      <input type="file" accept="application/pdf" onChange={(e) => setPdf(e.target.files[0])} className="mb-4 text-gray-800" />

      {/* Rules */}
      <div className="flex flex-col gap-3 mb-6">
        {rules.map((r, i) => (
          <input key={i} type="text" placeholder={`Rule ${i + 1}`} className="border border-gray-800 p-2 text-gray-800 rounded-lg" onChange={(e) => handleRuleChange(i, e.target.value)} />
        ))}
      </div>

      {/* Submit */}
      <button onClick={handleSubmit} className="bg-gray-300 text-gray-800 px-4 py-2 rounded">
        Check Document
      </button>
      {error && (
  <div className="mt-4 text-red-700 px-4 py-2 rounded text-center">
    {error}
  </div>
)}
      {/* Results */}
     
    </div>{Array.isArray(results) && results.length > 0 && (
  <ResultTable results={results} />
)}</div>
  );
}

export default App;
