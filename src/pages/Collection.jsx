import { useState, useMemo } from "react";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/ProductAPI";
import productTypes from "../config/Product-Types";

const Collection = () => {
  const [filters, setFilters] = useState({
    type: [],
    category: [],
    subCategory: [],
  });

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["products", filters],
    queryFn: ({ signal }) =>
      fetchProducts({
        signal,
        type: filters.type,
        category: filters.category,
        subCategory: filters.subCategory,
      }),
    staleTime: 0,
    gcTime: 10 * 60 * 1000,
  });

  const selectedTypes = filters.type;

  const availableCategories = useMemo(() => {
    const categories = new Set();
    selectedTypes.forEach((typeKey) => {
      const typeData = productTypes[typeKey];
      const categoryField = typeData?.fields.find((f) => f.name === "category");
      categoryField?.options.forEach((opt) => categories.add(opt));
    });
    return Array.from(categories);
  }, [selectedTypes]);

  const availableSubCategories = useMemo(() => {
    const subCategories = new Set();
    selectedTypes.forEach((typeKey) => {
      const typeData = productTypes[typeKey];
      const subCategoryField = typeData?.fields.find(
        (f) => f.name === "subCategory"
      );
      subCategoryField?.options.forEach((opt) => subCategories.add(opt));
    });
    return Array.from(subCategories);
  }, [selectedTypes]);

  const handleCheckboxChange = (key, value) => {
    setFilters((prev) => {
      const currentValues = prev[key];
      const updatedValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];

      // If type filter updated, reset category and subCategory if no types selected
      if (key === "type" && updatedValues.length === 0) {
        return { ...prev, [key]: updatedValues, category: [], subCategory: [] };
      }

      // If category cleared, also clear subCategory
      if (key === "category" && updatedValues.length === 0) {
        return { ...prev, [key]: updatedValues, subCategory: [] };
      }

      return { ...prev, [key]: updatedValues };
    });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      <aside className="min-w-60">
        <FilterSection
          title="Product Type"
          options={Object.entries(productTypes)
            .filter(([key]) => key !== "")
            .map(([key, val]) => ({ label: val.label, value: key }))}
          selected={filters.type}
          onChange={(val) => handleCheckboxChange("type", val)}
        />

        {availableCategories.length > 0 && (
          <FilterSection
            title="Category"
            options={availableCategories.map((c) => ({ label: c, value: c }))}
            selected={filters.category}
            onChange={(val) => handleCheckboxChange("category", val)}
          />
        )}

        {availableSubCategories.length > 0 && (
          <FilterSection
            title="Sub Category"
            options={availableSubCategories.map((s) => ({
              label: s,
              value: s,
            }))}
            selected={filters.subCategory}
            onChange={(val) => handleCheckboxChange("subCategory", val)}
          />
        )}
      </aside>

      <main className="flex-1">
        <div className="flex justify-center text-base sm:text-2xl mb-4">
          <Title text1="ALL" text2="COLLECTIONS" />
        </div>

        {isPending ? (
          <p className="text-center mt-10">Loading Products...</p>
        ) : isError ? (
          <p className="text-center mt-10 text-red-500">
            Error: {error.message}
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
            {data?.length > 0 ? (
              data.map((product) => (
                <ProductItem
                  key={product._id}
                  id={product._id}
                  name={product.name}
                  price={product.price}
                  image={product.images}
                />
              ))
            ) : (
              <p className="col-span-full text-center">No products found.</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

const FilterSection = ({ title, options, selected, onChange }) => {
  return (
    <div className="border border-gray-300 pl-5 py-3 my-5 sm:block">
      <p className="mb-3 text-sm font-medium">{title.toUpperCase()}</p>
      <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
        {options.map((opt) => (
          <label
            key={opt.value}
            className="flex items-center gap-2 cursor-pointer"
          >
            <input
              type="checkbox"
              value={opt.value}
              checked={selected.includes(opt.value)}
              onChange={() => onChange(opt.value)}
            />
            {opt.label}
          </label>
        ))}
      </div>
    </div>
  );
};

export default Collection;
