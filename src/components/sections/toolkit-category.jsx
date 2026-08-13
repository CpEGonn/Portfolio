function ToolkitCategory({ category }) {
  const CategoryIcon = category.icon;

  return (
    <section className="bg-surface border-border rounded-3xl border p-4 sm:p-5">
      <div className="flex items-start gap-3 sm:gap-4">
        <div className="bg-card border-border text-primary inline-flex shrink-0 rounded-2xl border p-3">
          <CategoryIcon size={18} />
        </div>
        <div className="min-w-0">
          <h4 className="text-primary text-lg font-semibold tracking-tight">
            {category.title}
          </h4>
          <p className="text-muted mt-1 text-sm leading-6">
            {category.description}
          </p>
        </div>
      </div>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {category.items.map(({ name, icon: ItemIcon, image }) => (
          <div
            key={name}
            className="bg-card border-border text-text flex min-h-12 items-center gap-3 rounded-2xl border px-4 py-3 text-sm leading-5"
          >
            {image ? (
              <img
                src={image}
                alt=""
                aria-hidden="true"
                className="h-4.5 w-4.5 shrink-0 object-contain"
              />
            ) : (
              <ItemIcon size={18} className="text-primary shrink-0" />
            )}
            <span>{name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ToolkitCategory;
