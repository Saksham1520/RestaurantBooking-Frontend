import RestaurantCard from "./components/RestaurantCard";
import resturant1 from "../Images/resturant1.jpeg"
export default function Home() {
  const restaurants = [
    {
      id: 1,
      name: "The Gourmet Spot",
      description: "Experience fine dining with exquisite cuisines.",
      image: resturant1,
    },
    {
      id: 2,
      name: "Family Feast",
      description: "Perfect place for family get-togethers.",
      image: resturant1,
    },
    {
      id: 3,
      name: "Quick Bites",
      description: "Enjoy fast and delicious snacks.",
      image: resturant1,
    },
    {
      id: 4,
      name: "Pandit Dhaba",
      description: "Perfect place for family get-togethers.",
      image: resturant1,
    },
  ];

  return (
    <div className=" mt-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {restaurants.map((rest) => (
        <RestaurantCard key={rest.id} restItem={rest} />
      ))}
    </div>
  );
}
