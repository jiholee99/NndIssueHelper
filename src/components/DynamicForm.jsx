import React, { useMemo, useState, useRef, useEffect } from "react";

function CustomSelect({ id, value, options, onChange, placeholder, required, label }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  // Set default to first option if value is empty
  useEffect(() => {
    if ((value === undefined || value === "" || value === null) && options && options.length > 0) {
      onChange(options[0].value);
    }
    // Only run on mount or when options change
    // eslint-disable-next-line
  }, [options]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selected = options.find(opt => opt.value === value);

  return (
    <div className="relative" ref={ref}>
      <label htmlFor={id} className="block text-sm font-medium">{label}</label>
      <button
        type="button"
        id={id}
        className="mt-1 w-full rounded-lg border px-3 py-2 text-left bg-white"
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        required={required}
      >
        {selected ? selected.label : <span className="text-gray-400">{placeholder || "Select an option"}</span>}
      </button>
      {open && (
        <ul
          className="absolute z-10 mt-1 w-full bg-white border rounded-lg shadow-lg max-h-60 overflow-auto"
          tabIndex={-1}
          role="listbox"
        >
          {options.map(opt => (
            <li
              key={opt.value}
              role="option"
              aria-selected={value === opt.value}
              className={`px-4 py-2 cursor-pointer hover:bg-indigo-100 ${value === opt.value ? "bg-indigo-50 font-semibold" : ""}`}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export function DynamicForm({ schema, onSubmit, initialValues, variant = "solid" }) {
  // Helper to get current datetime-local string (YYYY-MM-DDTHH:mm)
  const getNowString = () => {
    const now = new Date();
    const pad = n => n.toString().padStart(2, '0');
    return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}`;
  };

  const startingValues = useMemo(() => {
    const base = {};
    schema.fields.forEach(f => {
      if (f.type === "datetime") {
        base[f.id] = initialValues?.[f.id] ?? f.defaultValue ?? getNowString();
      } else {
        base[f.id] = initialValues?.[f.id] ?? f.defaultValue ?? (f.type === "checkbox" ? false : "");
      }
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

  const inputStyle = "mt-1 w-full rounded-lg border px-3 py-2";

  return (
    <div className="w-full lg:w-2/3 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
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
                  className={inputStyle}
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
                  className={inputStyle}
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
              <CustomSelect
                id={f.id}
                value={values[f.id]}
                options={f.options}
                onChange={val => handleChange(f.id, val)}
                placeholder={f.placeholder}
                required={f.required}
                label={f.label}
              />
            )}

            {f.type === "checkbox" && (
              <div className="flex items-center">
                <input
                  id={f.id}
                  type="checkbox"
                  className={inputStyle}
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
                  className={inputStyle}
                  value={values[f.id]}
                  onChange={e => handleChange(f.id, e.target.value)}
                />
              </>
            )}
          </div>
        ))}

        <div className="col-span-full mt-2 flex justify-center">
          <button type="submit" className={buttonStyle}>{schema.submitLabel || "Submit"}</button>
        </div>
      </form>
    </div>
  );
}
