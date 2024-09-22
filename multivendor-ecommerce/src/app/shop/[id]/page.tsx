"use client";
import { useEffect, useState } from "react";
import {
  Star,
  Heart,
  Share2,
  Truck,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Plus,
  Minus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { useProducts } from "@/store/products";
import { useCart } from "@/store/cart";
import Product from "@/app/_components/product";
import { useAuth } from "@clerk/nextjs";
import { useReviews } from "@/store/reviews";

export default function ProductPage({ params }: { params: { id: string } }) {
  const { products, fetchProducts } = useProducts();
  const { addToCart } = useCart();

  const product = products.find((p) => p.id === parseInt(params.id));

  const [quantity, setQuantity] = useState(1);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: "",
    productId: product?.id,
  });

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const { reviews, addReview, fetchReviews } = useReviews();

  const { userId } = useAuth();
  useEffect(() => {
    fetchProducts();
    fetchReviews(Number(params?.id));
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg bg-gray-100">
            <img
              src={product?.image || ""}
              alt="Product"
              className="object-cover w-full h-full"
            />
          </div>
          {/* <div className="flex space-x-4">
            {thumbnails.map((thumb, index) => (
              <button
                key={index}
                className="aspect-square w-20 overflow-hidden rounded-md bg-gray-100"
                onClick={() => setMainImage(thumb)}
              >
                <img
                  src={thumb}
                  alt={`Thumbnail ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              </button>
            ))}
          </div> */}
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">
              {product?.title || "Product Name"}
            </h1>
            <div className="flex items-center space-x-2 mt-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary" />
                ))}
              </div>
              <span className="text-sm text-gray-500">
                ({reviews.length} reviews)
              </span>
            </div>
          </div>

          <div className="text-3xl font-bold">
            ${product?.price.toFixed(2) || 99.99}
          </div>

          <p className="text-gray-600">
            {product?.desc || "Product Description"}
          </p>

          {/* Color Selection */}
          {/* <div>
            <h3 className="text-sm font-medium text-gray-900">Color</h3>
            <RadioGroup defaultValue="blue" className="mt-2">
              <div className="flex items-center space-x-3">
                <RadioGroupItem
                  value="blue"
                  id="blue"
                  className="bg-blue-500"
                />
                <Label htmlFor="blue">Blue</Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem
                  value="green"
                  id="green"
                  className="bg-green-500"
                />
                <Label htmlFor="green">Green</Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem
                  value="pink"
                  id="pink"
                  className="bg-pink-500"
                />
                <Label htmlFor="pink">Pink</Label>
              </div>
            </RadioGroup>
          </div> */}

          {/* Size Selection */}
          {/* <div>
            <h3 className="text-sm font-medium text-gray-900">Size</h3>
            <RadioGroup defaultValue="500ml" className="mt-2">
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="500ml" id="500ml" />
                <Label htmlFor="500ml">500ml</Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="750ml" id="750ml" />
                <Label htmlFor="750ml">750ml</Label>
              </div>
              <div className="flex items-center space-x-3">
                <RadioGroupItem value="1000ml" id="1000ml" />
                <Label htmlFor="1000ml">1000ml</Label>
              </div>
            </RadioGroup>
          </div> */}

          {/* Quantity */}
          <div className="flex items-center space-x-4">
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="text-xl font-semibold">{quantity}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setQuantity(quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>

          {/* Add to Cart and Wishlist */}
          <div className="flex space-x-4">
            <Button
              className="flex-1"
              onClick={() => addToCart(product, quantity)}
            >
              Add to Cart
            </Button>
            <Button variant="outline" size="icon">
              <Heart className="h-4 w-4" />
            </Button>
          </div>

          {/* Shipping and Returns */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm">
              <Truck className="h-4 w-4" />
              <span>Free shipping on orders over $100</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <RotateCcw className="h-4 w-4" />
              <span>Free 30-day returns</span>
            </div>
          </div>

          {/* Social Sharing */}
          <div className="flex space-x-4">
            <Button variant="outline" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </div>

      {/* Product Information Tabs */}
      <Tabs defaultValue="description" className="mt-12">
        <TabsList>
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="mt-4">
          <p>{product?.desc || "Product Description"}</p>
        </TabsContent>
        <TabsContent value="specifications" className="mt-4">
          <table className="w-full">
            <tbody>
              <tr>
                <td className="font-semibold pr-4">Material</td>
                <td>18/8 Stainless Steel</td>
              </tr>
              <tr>
                <td className="font-semibold pr-4">Capacity</td>
                <td>500ml / 750ml / 1000ml</td>
              </tr>
              <tr>
                <td className="font-semibold pr-4">Weight</td>
                <td>350g (500ml) / 450g (750ml) / 550g (1000ml)</td>
              </tr>
              <tr>
                <td className="font-semibold pr-4">Dimensions</td>
                <td>7.5 x 7.5 x 26 cm (500ml)</td>
              </tr>
              <tr>
                <td className="font-semibold pr-4">Cold Retention</td>
                <td>Up to 24 hours</td>
              </tr>
              <tr>
                <td className="font-semibold pr-4">Hot Retention</td>
                <td>Up to 12 hours</td>
              </tr>
            </tbody>
          </table>
        </TabsContent>
        <TabsContent value="reviews" className="mt-4">
          <div className="space-y-6">
            {reviews.map((review) => (
              <Card key={review.id} className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-semibold">{review.user.name}</h4>
                    <div className="flex mt-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? "fill-primary"
                              : "fill-muted stroke-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <Badge variant="outline">Verified Purchase</Badge>
                </div>
                <p className="mt-2 text-sm text-gray-600">{review.comment}</p>
              </Card>
            ))}
          </div>

          {/* Add Review Form */}
          <Card className="mt-8 p-4">
            <h3 className="text-lg font-semibold mb-4">Add Your Review</h3>
            <form
              onSubmit={(e) => {
                addReview(e, newReview);
                setNewReview({
                  rating: 5,
                  comment: "",
                  productId: product?.id,
                });
              }}
              className="space-y-4"
            >
              <div>
                <Label htmlFor="rating">Rating</Label>
                <RadioGroup
                  id="rating"
                  value={newReview.rating.toString()}
                  onValueChange={(value: any) =>
                    setNewReview({ ...newReview, rating: parseInt(value) })
                  }
                  className="flex space-x-2"
                >
                  {[1, 2, 3, 4, 5].map((value) => (
                    <div key={value} className="flex items-center">
                      <RadioGroupItem
                        value={value.toString()}
                        id={`rating-${value}`}
                      />
                      <Label htmlFor={`rating-${value}`} className="ml-2">
                        {value}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              <div>
                <Label htmlFor="comment">Your Review</Label>
                <Textarea
                  id="comment"
                  value={newReview.comment}
                  onChange={(e) =>
                    setNewReview({ ...newReview, comment: e.target.value })
                  }
                  required
                />
              </div>
              <Button
                disabled={userId ? false : true}
                type="submit"
                className=""
              >
                {userId ? "Submit Review" : "Login to submit review"}
              </Button>
            </form>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Expandable Sections */}
      <div className="mt-12 space-y-4">
        {["Shipping", "Returns", "Product Care"].map((section) => (
          <div key={section} className="border rounded-lg">
            <button
              className="flex justify-between items-center w-full p-4 text-left"
              onClick={() => toggleSection(section)}
            >
              <span className="font-semibold">{section}</span>
              {expandedSection === section ? (
                <ChevronUp className="h-5 w-5" />
              ) : (
                <ChevronDown className="h-5 w-5" />
              )}
            </button>
            {expandedSection === section && (
              <div className="p-4 pt-0">
                <p>
                  {section === "Shipping" &&
                    "We offer free standard shipping on all orders over $100. For orders under $100, a flat rate of $5 applies."}
                  {section === "Returns" &&
                    "We accept returns within 30 days of purchase. Items must be unused and in original packaging."}
                  {section === "Product Care" &&
                    "To maintain your water bottle, hand wash with warm soapy water and air dry. Do not use in dishwasher or microwave."}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Related Products */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">You May Also Like</h2>
        <div className="grid grid-cols-2 md: grid-cols-4 gap-4">
          {products
            .filter((temp) => temp.id != product?.id)
            .slice(0, 4)
            .map((product, index) => (
              <Product key={product.id} product={product} index={index} />
            ))}
        </div>
      </div>
    </div>
  );
}
