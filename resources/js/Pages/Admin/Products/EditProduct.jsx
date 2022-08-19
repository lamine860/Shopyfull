import React, { useEffect, useState } from "react";
import Admin from "@/Layouts/Admin";
import { useForm } from "@inertiajs/inertia-react";
import Button from "@/Components/Button";
import FormGroup from "@/Components/Form/FormGroup";

export default function EditProduct({ auth, product }) {
  const categories = [
    "Phone",
    "Ordinateur",
    "Vetements",
    "Véhicule",
    "Accessoires",
    "Chaussures",
  ];
  const brand = ["NIKE", "ADIDAS", "APPLE", "SAMSUNG", "HUAWAI", "TCNO"];
  const { data, setData, post, processing, errors } = useForm({
    name: product.name,
    price: product.price,
    category: product.category,
    brand: product.brand,
    description: product.description,
    quantity: product.quantity,
  });
  const uniqArr = (value, index, self) => {
    return self.indexOf(value) === index;
  };
  const [cloudinaryWidget, setCloudinaryWidget] = useState(null);
  const [cloudinaryObject, setCloudinaryObject] = useState(null);
  const [images, setImages] = useState(
    product.images.map((i) => i.url).filter(uniqArr)
  );
  const handleImageChange = () => {
    cloudinaryWidget.open();
  };
  const loadCloudinaryScript = () => {
    const scriptEl = document.createElement("script");
    scriptEl.src = "https://upload-widget.cloudinary.com/global/all.js";
    scriptEl.addEventListener("load", (e) => {
      setCloudinaryObject(cloudinary);
    });
    document.body.appendChild(scriptEl);
  };
  useEffect(() => {
    loadCloudinaryScript();
    if (cloudinaryObject) {
      const cloudinaryWidget = cloudinaryObject.createUploadWidget(
        {
          cloudName: "welya",
          uploadPreset: "qm70owdh",
        },
        (error, result) => {
          if (!error && result && result.event === "success") {
            setImages((i) => [...i, result.info.secure_url]);
          }
        }
      );
      setCloudinaryWidget(cloudinaryWidget);
    }
  }, [cloudinaryObject]);

  const handleDeleteImage = (url) => {
    setImages((i) => i.filter((i) => i != url));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = route("products.update", product);
    post(url, {
      data: data,
      preserveState: true,
      onBefore: ({ data }) => {
        data.images = images;
        data._method = "PUT";
      },
    });
  };

  return (
    <Admin auth={auth} header={`Mise à jour du produit ${product.name}`}>
      <form onSubmit={handleSubmit} className="py-8 w-full">
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <FormGroup error={errors.name}>
            <FormGroup.Label>Nom:</FormGroup.Label>
            <FormGroup.Control
              name="name"
              value={data.name}
              handleChange={setData}
              error={errors.name}
            />
          </FormGroup>
          <FormGroup error={errors.price}>
            <FormGroup.Label>Prix:</FormGroup.Label>
            <FormGroup.Control
              type="number"
              name="price"
              value={data.price}
              handleChange={setData}
              error={errors.price}
            />
          </FormGroup>
        </div>
        <div className="flex flex-col md:flex-row gap-4">
          <FormGroup>
            <FormGroup.Label>Category:</FormGroup.Label>
            <FormGroup.Select
              name="category"
              value={data.category}
              handleChange={setData}
              options={categories}
            />
          </FormGroup>
          <FormGroup>
            <FormGroup.Label>Marque:</FormGroup.Label>
            <FormGroup.Select
              name="brand"
              value={data.brand}
              handleChange={setData}
              options={brand}
            />
          </FormGroup>
        </div>
        <div className="flex flex-col  gap-4 w-full">
          <FormGroup error={errors.name}>
            <FormGroup.Label>Quantité:</FormGroup.Label>
            <FormGroup.Control
              name="quantity"
              type="number"
              value={data.quantity}
              handleChange={setData}
              error={errors.quantity}
            />
          </FormGroup>
        </div>
        {cloudinaryWidget && (
          <div className="flex flex-col md:flex-row gap-4 flex-1">
            <FormGroup error={errors.images}>
              <FormGroup.Label>Images:</FormGroup.Label>
              <FormGroup.Image
                name="images"
                value={data.images}
                handleChange={handleImageChange}
              />
            </FormGroup>
            <div className="preview-images flex  items-center justify-center gap-2 flex-2 my-4">
              {images.map((url) => {
                return (
                  <div key={url} className="relative group">
                    <img
                      src={url}
                      className="w-32 h-32 shadow-lg rounded-lg "
                    />
                    <svg
                      onClick={() => handleDeleteImage(url)}
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 absolute -top-2 text-red-700 -left-2 cursor-pointer hidden group-hover:block"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <div className="flex flex-col md:flex-row gap-4">
          <FormGroup error={errors.description}>
            <FormGroup.Label>Description:</FormGroup.Label>
            <FormGroup.Textarea
              name="description"
              value={data.description}
              handleChange={setData}
            />
          </FormGroup>
        </div>

        <Button on>Mettre à jour</Button>
      </form>
    </Admin>
  );
}
