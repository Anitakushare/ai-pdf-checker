export default function ResultTable({ results }) {
  return (
   
    <div className="w-5xl flex justify-center">
       {/***Result Table */}
    <table className="border bg-stone-900">
      <thead>
        <tr className="bg-gray-200">
          <th className="p-2 border border-gray-500 text-rose-900">Rule</th>
          <th className="p-2 border border-gray-500 text-rose-900">Status</th>
          <th className="p-2 border border-gray-500 text-rose-900">Evidence</th>
          <th className="p-2 border border-gray-500 text-rose-900">Reasoning</th>
          <th className="p-2 border border-gray-500 text-rose-900">Confidence</th>
        </tr>
      </thead>

      <tbody>
        {results.map((r, i) => {
          const rule = r.rule || "N/A";
          const status = r.status ? r.status.toUpperCase() : "UNKNOWN";
          const evidence = r.evidence || "—";
          const reasoning = r.reasoning || "—";
          const confidence = r.confidence ?? 0; // safe for numbers

          return (
            <tr key={i} className="border border-gray-300">
              <td className="p-2 border text-gray-300">{rule}</td>

              <td
                className={`p-2 font-bold text-gray-300  ${
                  status === "PASS" ? "text-green-600" : "text-red-600"
                }`}
              >
                {status}
              </td>

              <td className="p-2 border text-gray-300 ">{evidence}</td>
              <td className="p-2 border text-gray-300 ">{reasoning}</td>
              <td className="p-2 border text-gray-300 ">{confidence}%</td>
            </tr>
          );
        })}
      </tbody>
    </table>
    </div>
  );
}
