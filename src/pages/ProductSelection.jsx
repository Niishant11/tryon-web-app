import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTryOn } from "../hooks/useTryOn";
import { PRODUCTS } from "../data/products";
import Navbar from "../components/layout/Navbar";
import StepBar from "../components/layout/StepBar";
 
export function ProductSelectionPage() {
  const navigate = useNavigate();
  const { selectedProducts, setSelectedProducts } = useTryOn();
  const [filter, setFilter] = useState("all");
 
  const categories = ["all", ...new Set(PRODUCTS.map(p => p.category))];
 
  const visible = filter === "all"
    ? PRODUCTS
    : PRODUCTS.filter(p => p.category === filter);
 
  const toggle = (product) => {
    setSelectedProducts(prev =>
      prev.find(p => p.id === product.id)
        ? prev.filter(p => p.id !== product.id)
        : [...prev, product]
    );
  };
 
  const isSelected = (id) => selectedProducts.some(p => p.id === id);
 
  return (
    <>
      
      <div className="container">
        <StepBar current={1} />
        <div className="selection-layout">
 
          {/* Products col */}
          <div>
            <div style={{ marginBottom: "var(--space-6)" }}>
              <h1 className="display-sm" style={{ marginBottom: "var(--space-2)" }}>Choose your look</h1>
              <p className="caption">Select one or more products to try on.</p>
            </div>
 
            {/* Filter tabs */}
            <div style={{ display: "flex", gap: "var(--space-2)", flexWrap: "wrap", marginBottom: "var(--space-6)" }}>
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className="btn btn--sm"
                  style={{
                    background: filter === cat ? "var(--c-ink)" : "var(--c-surface)",
                    color: filter === cat ? "#fff" : "var(--c-text-muted)",
                    border: `1.5px solid ${filter === cat ? "var(--c-ink)" : "var(--c-border)"}`,
                    borderRadius: "var(--r-full)",
                    textTransform: "capitalize",
                    letterSpacing: ".04em",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
 
            {/* Grid */}
            <div className="product-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
              {visible.map((product, i) => (
                <div
                  key={product.id}
                  className={`product-card animate-fade-up ${isSelected(product.id) ? "selected" : ""}`}
                  style={{ animationDelay: `${i * 40}ms` }}
                  onClick={() => toggle(product)}
                >
                  <img className="product-card__img" src={product.image} alt={product.name} loading="lazy" />
                  <div className="product-card__body">
                    <div className="product-card__category">{product.category}</div>
                    <div className="product-card__name">{product.name}</div>
                    <div className="product-card__price">₹{product.price.toLocaleString("en-IN")}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
 
          {/* Sidebar */}
          <div className="selection-sidebar animate-fade-up delay-2">
            <div className="selection-summary">
              <div className="selection-summary__header">
                <span className="subheading">Your selection</span>
                <span className="badge badge--gold">{selectedProducts.length} items</span>
              </div>
 
              <div className="selection-summary__items">
                {selectedProducts.length === 0 ? (
                  <p className="caption" style={{ textAlign: "center", padding: "var(--space-4) 0" }}>
                    No products selected yet
                  </p>
                ) : (
                  selectedProducts.map(p => (
                    <div key={p.id} className="selected-item">
                      <img className="selected-item__img" src={p.image} alt={p.name} />
                      <div>
                        <div style={{ fontSize: "var(--text-sm)", fontWeight: 500 }}>{p.name}</div>
                        <div style={{ fontSize: "var(--text-xs)", color: "var(--c-text-faint)", textTransform: "capitalize" }}>{p.category}</div>
                      </div>
                      <button className="selected-item__remove" onClick={(e) => { e.stopPropagation(); toggle(p); }}>✕</button>
                    </div>
                  ))
                )}
              </div>
 
              <div className="selection-summary__footer">
                <button
                  className="btn btn--primary btn--full"
                  disabled={selectedProducts.length === 0}
                  onClick={() => navigate("/upload")}
                >
                  Upload photo →
                </button>
              </div>
            </div>
          </div>
 
        </div>
      </div>
    </>
  );
}

export default ProductSelectionPage;
