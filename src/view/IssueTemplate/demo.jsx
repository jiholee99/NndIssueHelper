import React, { useMemo, useState } from "react";

export function DynamicForm({ schema, onSubmit, initialValues, variant = "solid" }) {
  const startingValues = useMemo(() => {
    const base = {};
    schema.fields.forEach(f => {
      base[f.id] = initialValues?.[f.id] ?? f.defaultValue ?? (f.type === "checkbox" ? false : "");
    });
    return base;
  }, [schema.fields, initialValues]);

  const [values, setValues] = useState(startingValues);

  const handleChange = (id, val) => {
    setValues(prev => ({ ...prev, [id]: val }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(values);
  };

  const gridCols = schema.columns === 2 ? "md:grid-cols-2" : "";
  const buttonBase =
    "inline-flex items-center justify-center rounded-2xl px-4 py-2 text-sm font-semibold shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500";
  const buttonStyle =
    variant === "outline"
      ? `${buttonBase} border border-indigo-300 text-indigo-700 hover:bg-indigo-50`
      : `${buttonBase} bg-indigo-600 text-white hover:bg-indigo-700`;

  return (
    <div className="w-full rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
      {schema.title && <h2 className="mb-1 text-xl font-semibold">{schema.title}</h2>}
      {schema.description && <p className="mb-6 text-sm text-gray-600">{schema.description}</p>}

      <form onSubmit={handleSubmit} className={`grid grid-cols-1 gap-4 ${gridCols}`}>
        {schema.fields.map(f => (
          <div key={f.id} className="col-span-1">
            {f.type === "text" && (
              <>
                <label htmlFor={f.id} className="block text-sm font-medium">{f.label}</label>
                <input
                  id={f.id}
                  type="text"
                  className="mt-1 w-full rounded-2xl border px-3 py-2"
                  value={values[f.id]}
                  onChange={e => handleChange(f.id, e.target.value)}
                  placeholder={f.placeholder}
                  required={f.required}
                />
              </>
            )}

            {f.type === "textarea" && (
              <>
                <label htmlFor={f.id} className="block text-sm font-medium">{f.label}</label>
                <textarea
                  id={f.id}
                  rows={3}
                  className="mt-1 w-full rounded-2xl border px-3 py-2 resize-y"
                  value={values[f.id]}
                  onChange={e => handleChange(f.id, e.target.value)}
                  placeholder={f.placeholder}
                  required={f.required}
                  style={{ overflow: 'hidden' }}
                  onInput={e => {
                    e.target.style.height = 'auto';
                    e.target.style.height = `${e.target.scrollHeight}px`;
                  }}
                />
              </>
            )}

            {f.type === "select" && (
              <>
                <label htmlFor={f.id} className="block text-sm font-medium">{f.label}</label>
                <select
                  id={f.id}
                  className="mt-1 w-full rounded-2xl border px-3 py-2"
                  value={values[f.id]}
                  onChange={e => handleChange(f.id, e.target.value)}
                  required={f.required}
                >
                  <option value="" disabled>{f.placeholder || "Select an option"}</option>
                  {f.options?.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </>
            )}

            {f.type === "checkbox" && (
              <div className="flex items-center">
                <input
                  id={f.id}
                  type="checkbox"
                  className="h-5 w-5 text-indigo-600"
                  checked={values[f.id]}
                  onChange={e => handleChange(f.id, e.target.checked)}
                />
                <label htmlFor={f.id} className="ml-2 text-sm font-medium">{f.label}</label>
              </div>
            )}

            {f.type === "datetime" && (
              <>
                <label htmlFor={f.id} className="block text-sm font-medium">{f.label}</label>
                <input
                  id={f.id}
                  type="datetime-local"
                  className="mt-1 w-full rounded-2xl border px-3 py-2"
                  value={values[f.id]}
                  onChange={e => handleChange(f.id, e.target.value)}
                />
              </>
            )}
          </div>
        ))}

        <div className="col-span-full mt-2 flex justify-end">
          <button type="submit" className={buttonStyle}>{schema.submitLabel || "Submit"}</button>
        </div>
      </form>
    </div>
  );
}
