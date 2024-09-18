"use client";
import { useState } from "react";
import Image from "next/image";
import {
  Truck,
  RotateCcw,
  Share2,
  Facebook,
  Twitter,
  Linkedin,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Custom Star component
const Star = ({ filled }: { filled: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-5 h-5"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export default function ProductPage() {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("Black");
  const [selectedSize, setSelectedSize] = useState("M");
  const [activeImage, setActiveImage] = useState(0);

  const product = {
    name: "Premium Ergonomic Office Chair",
    price: 299.99,
    rating: 4.5,
    reviewCount: 128,
    description:
      "Experience unparalleled comfort with our Premium Ergonomic Office Chair. Designed for long hours of work, this chair offers superior lumbar support, adjustable armrests, and a breathable mesh back. Perfect for home offices and professional settings alike.",
    features: [
      "Ergonomic design for optimal posture",
      "Adjustable lumbar support",
      "Breathable mesh back",
      "360-degree swivel",
      "Quiet rolling casters",
      "Weight capacity: 300 lbs",
    ],
    specifications: {
      Material: "High-quality mesh and premium foam padding",
      Dimensions: '26"W x 26"D x 38-42"H',
      Weight: "35 lbs",
      Warranty: "5 years limited warranty",
    },
  };

  const relatedProducts = [
    {
      name: "Ergonomic Footrest",
      price: 49.99,
      image:
        "https://spacemy.com.my/cdn/shop/products/footrest_productpage_small_0acb0062-fe8f-4d80-b01d-8737e5753e38_1.png?v=1659961164",
    },
    {
      name: "Desk Lamp with Wireless Charging",
      price: 79.99,
      image:
        "https://www.ikea.com/us/en/images/products/nymane-work-lamp-with-wireless-charging-anthracite__0993561_pe820590_s5.jpg",
    },
    {
      name: "Adjustable Standing Desk",
      price: 399.99,
      image:
        "https://i5.walmartimages.com/seo/KOWO-K305-Electric-Height-Adjustable-Standing-Desk-with-Drawer-Grey-Oak-Black_941e23e2-887d-4f5d-a582-18bce7ce5581.d2d99f4eedc350c6e83699bd26ac6ca2.jpeg?odnHeight=768&odnWidth=768&odnBg=FFFFFF",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square">
            <Image
              src="https://uoffice.com.sg/wp-content/uploads/2023/10/U11-Angle-View.png"
              alt="Premium Ergonomic Office Chair"
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <div className="flex items-center space-x-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} filled={i < Math.floor(product.rating)} />
              ))}
            </div>
            <span className="text-sm text-gray-500">
              ({product.reviewCount} reviews)
            </span>
          </div>
          <p className="text-2xl font-bold">${product.price.toFixed(2)}</p>
          <p className="text-gray-600">{product.description}</p>s
          {/* Quantity and Add to Cart */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center border rounded-md">
              <button
                className="px-3 py-1 border-r"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
              >
                -
              </button>
              <span className="px-4 py-1">{quantity}</span>
              <button
                className="px-3 py-1 border-l"
                onClick={() => setQuantity(quantity + 1)}
              >
                +
              </button>
            </div>
            <Button size="lg" className="flex-grow">
              Add to Cart
            </Button>
          </div>
          {/* Shipping and Returns */}
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <Truck className="w-5 h-5 mr-2" />
              Free Shipping
            </div>
            <div className="flex items-center">
              <RotateCcw className="w-5 h-5 mr-2" />
              30-Day Returns
            </div>
          </div>
          {/* Social Sharing */}
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-500">Share:</span>
            <Button variant="outline" size="icon">
              <Facebook className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Twitter className="w-4 h-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Linkedin className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Product Information Tabs */}
      <Tabs defaultValue="features" className="mt-12">
        <TabsList>
          <TabsTrigger value="features">Features</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="features">
          <Card>
            <CardContent className="pt-6">
              <ul className="list-disc pl-5 space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="specifications">
          <Card>
            <CardContent className="pt-6">
              <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="border-t border-gray-200 pt-4">
                    <dt className="font-medium text-gray-900">{key}</dt>
                    <dd className="mt-2 text-sm text-gray-500">{value}</dd>
                  </div>
                ))}
              </dl>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="reviews">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="border-b pb-4">
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, j) => (
                          <Star key={j} filled={j < 4} />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-gray-500">
                        John Doe
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      This chair is amazing! It's comfortable for long work
                      sessions and has great lumbar support.
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Related Products */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {relatedProducts.map((product, index) => (
            <Card key={index}>
              <CardContent className="p-4">
                <div className="relative aspect-square mb-4">
                  <Image
                    src={product.image}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-lg"
                  />
                </div>
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-gray-600">${product.price.toFixed(2)}</p>
                <Button className="w-full mt-4">View Product</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
